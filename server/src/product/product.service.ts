import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '@app/shared';
import { ProductRepository } from './product.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { transliterate } from 'transliteration';
import { Brackets, Repository } from 'typeorm';
import { EProduct } from '@app/entities';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService implements ProductRepository {
    constructor(
        @InjectRepository(EProduct) private readonly db: Repository<EProduct>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {}

    public async create(dto: CreateProductDto) {
        const existingProduct = await this.findByArticul(dto.article);

        if (existingProduct) {
            throw new HttpException(
                'Такой товар уже существует',
                HttpStatus.CONFLICT
            );
        }

        const slug = this.generateSlug(dto.name);
        const product = this.db.create({ ...dto, slug });

        try {
            await this.clearCache();
            return await this.db.save(product);
        } catch (error) {
            throw new HttpException(
                'Ошибка при сохранении товара в БД',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    public async update(id: string, dto: UpdateProductDto) {
        const existingProduct = await this.findOne(id);

        if (!existingProduct) {
            throw new HttpException(
                'Такого товара не существует',
                HttpStatus.NOT_FOUND
            );
        }

        await this.db.update(id, dto);
        await this.clearCache(id);

        return this.findOne(id);
    }

    public async delete(id: string) {
        const existingProduct = await this.findOne(id);

        if (!existingProduct) {
            throw new HttpException(
                'Такого товара не существует',
                HttpStatus.BAD_REQUEST
            );
        }

        await this.db.delete(id);
        await this.clearCache(id);

        return { message: 'Успешно удален', status: HttpStatus.OK };
    }

    public async findAll() {
        const cacheKey = 'all_products';
        const cachedProducts =
            await this.cacheManager.get<EProduct[]>(cacheKey);

        if (cachedProducts) {
            return cachedProducts;
        }

        const products = await this.db.find();
        await this.cacheManager.set(cacheKey, products, 60 * 50 * 60);

        return products;
    }

    public async findByArticul(article: string) {
        return this.db.findOne({ where: { article } });
    }

    public async findOne(id: string) {
        const cacheKey = `Category_findOne:product_${id}`;
        const cachedProduct = await this.cacheManager.get<EProduct>(cacheKey);

        if (cachedProduct) {
            return cachedProduct;
        }

        const product = await this.db.findOne({ where: { id } });
        await this.cacheManager.set(cacheKey, product, 60 * 50 * 60);

        return product;
    }

    public async findAndMergeBySlug(slug: string) {
        const product = await this.db.findOne({ where: { slug } });

        if (!product) {
            throw new Error(`Продукт с id "${slug}" не найден`);
        }

        const { name } = product;
        const productsWithSameName = await this.db.find({ where: { name } });

        const mergeField = (field: string) => {
            const uniqueValues = Array.from(
                new Set(productsWithSameName.map(p => p[field]))
            );
            return uniqueValues.length > 1
                ? productsWithSameName.map(p => ({ id: p.id, value: p[field] }))
                : uniqueValues[0];
        };

        return {
            name,
            category: mergeField('category'),
            availability: mergeField('availability'),
            usage: mergeField('usage'),
            image: mergeField('image'),
            plating: mergeField('plating'),
            texture: mergeField('texture'),
            invoice: mergeField('invoice'),
            size: mergeField('size'),
            country: mergeField('country'),
            price: mergeField('price'),
            manufacturing: mergeField('manufacturing'),
            kit: mergeField('kit'),
            shade: mergeField('shade'),
            article: mergeField('article'),
            slug: mergeField('slug')
        };
    }

    public async searchProduct(query: string) {
        if (!query) {
            return [];
        }

        return this.db
            .createQueryBuilder('product')
            .where(
                new Brackets(qb => {
                    qb.where('product.name ILIKE :query', {
                        query: `%${query}%`
                    })
                        .orWhere('product.article ILIKE :query', {
                            query: `%${query}%`
                        })
                        .orWhere('product.kit ILIKE :query', {
                            query: `%${query}%`
                        })
                        .orWhere('product.shade ILIKE :query', {
                            query: `%${query}%`
                        })
                        .orWhere('product.category ILIKE :query', {
                            query: `%${query}%`
                        })
                        .orWhere('product.country ILIKE :query', {
                            query: `%${query}%`
                        })
                        .orWhere('product.invoice ILIKE :query', {
                            query: `%${query}%`
                        })
                        .orWhere('product.manufacturing ILIKE :query', {
                            query: `%${query}%`
                        })
                        .orWhere('product.texture ILIKE :query', {
                            query: `%${query}%`
                        })
                        .orWhere('product.usage ILIKE :query', {
                            query: `%${query}%`
                        });
                })
            )
            .getMany();
    }

    public findByFilter = async (
        filter: Record<string, string | number | undefined>
    ): Promise<{ data: EProduct[]; nextId: number; previousId: number }> => {
        const cacheKey = this.generateCacheKey(filter);

        const cachedResult = await this.getCachedResult(cacheKey);
        if (cachedResult) {
            return cachedResult as {
                data: EProduct[];
                nextId: number;
                previousId: number;
            };
        }

        const {
            minPrice,
            maxPrice,
            limit = 20,
            offset = 0,
            otherFilters
        } = this.prepareFilters(filter);

        const parsedLimit =
            typeof limit === 'string' ? parseInt(limit, 10) : limit;
        const parsedOffset =
            typeof offset === 'string' ? parseInt(offset, 10) : offset;

        const { result, totalCount } = await this.executeQuery({
            minPrice,
            maxPrice,
            limit,
            offset,
            otherFilters
        });

        const nextId = this.calculateNextId(
            parsedOffset,
            result.length,
            totalCount
        );
        const previousId = this.calculatePreviousId(parsedOffset, parsedLimit);

        const resultWithCursor = { data: result, nextId, previousId };
        await this.cacheManager.set(cacheKey, resultWithCursor, 60 * 5);

        return resultWithCursor;
    };

    private async getCachedResult<T>(cacheKey: string): Promise<T | undefined> {
        return (await this.cacheManager.get(cacheKey)) as T | undefined;
    }

    private async clearCache(id?: string) {
        await this.cacheManager.del('all_products');
        await this.cacheManager.del('products_filter_*');
        if (id) {
            await this.cacheManager.del(`product_${id}`);
        }
    }

    private generateCacheKey(
        filter: Record<string, string | number | undefined>
    ): string {
        const validFilter = Object.entries(filter)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, value]) => value !== undefined && value !== '')
            .map(([key, value]) => `${key}-${value}`);
        return `Category_filters:products_filter_${validFilter.sort().join('|')}`;
    }

    private prepareFilters(
        filter: Record<string, string | number | undefined>
    ) {
        return {
            minPrice: filter.minPrice,
            maxPrice: filter.maxPrice,
            limit:
                typeof filter.limit === 'number'
                    ? filter.limit
                    : parseInt(filter.limit as string, 10),
            offset:
                typeof filter.offset === 'number'
                    ? filter.offset
                    : parseInt(filter.offset as string, 10),
            otherFilters: Object.entries(filter).reduce(
                (acc, [key, value]) => {
                    if (
                        !['minPrice', 'maxPrice', 'limit', 'offset'].includes(
                            key
                        ) &&
                        value
                    ) {
                        acc[key] = value;
                    }
                    return acc;
                },
                {} as Record<string, string | number>
            )
        };
    }

    private async executeQuery({
        minPrice,
        maxPrice,
        limit,
        offset,
        otherFilters
    }: {
        minPrice?: string | number;
        maxPrice?: string | number;
        limit: number;
        offset: number;
        otherFilters: Record<string, string | number>;
    }) {
        const qb = this.db
            .createQueryBuilder('f')
            .orderBy('f.createdAt', 'DESC');

        Object.entries(otherFilters).forEach(([key, value]) => {
            qb.andWhere(`f.${key} = :${key}`, { [key]: value });
        });

        if (minPrice) {
            qb.andWhere('f.price >= :minPrice', { minPrice });
        }

        if (maxPrice) {
            qb.andWhere('f.price <= :maxPrice', { maxPrice });
        }

        qb.take(limit);
        qb.skip(offset);

        const totalCount = await qb.getCount();
        const result = await qb.getMany();

        return { result, totalCount };
    }

    private calculateNextId(
        offset: number,
        resultLength: number,
        totalCount: number
    ): number {
        return offset + resultLength < totalCount ? offset + resultLength : 0;
    }

    private calculatePreviousId(offset: number, limit: number): number {
        return offset > 0 ? Math.max(0, offset - limit) : 0;
    }

    private generateSlug(name: string): string {
        const transliteratedName = transliterate(name)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const uniqueId = uuidv4();
        return `${transliteratedName}-${uniqueId}`;
    }
}
