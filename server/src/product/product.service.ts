import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto, ExcelService, UpdateProductDto } from '@app/shared';
import { YCloudService } from '../y-cloud/y-cloud.service';
import { ProductRepository } from './product.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { transliterate } from 'transliteration';
import { Brackets, Repository } from 'typeorm';
import { EProduct } from '@app/entities';
import { Cache } from 'cache-manager';
import {
    FilterOperator,
    paginate,
    PaginateConfig,
    Paginated,
    PaginateQuery
} from 'nestjs-paginate';
import * as unzipper from 'unzipper';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ProductService implements ProductRepository {
    private readonly tempDir = path.join(process.cwd(), `documents/temp`);

    constructor(
        @InjectRepository(EProduct) private readonly db: Repository<EProduct>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly YCloud: YCloudService,
        private excel: ExcelService
    ) {}

    public async create(dto: CreateProductDto) {
        const existingProduct = await this.findByArticul(dto.article);
        if (existingProduct) {
            throw new HttpException(
                'Такой товар уже существует',
                HttpStatus.CONFLICT
            );
        }
        const slug = this.generateSlug(dto.name, dto.article);
        const product = this.db.create({
            ...dto,
            slug,
            images: [],
            textureType: null
        });
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

        const cachedProducts = await this.getCachedResult<EProduct[]>(cacheKey);

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
        const cachedProduct = await this.getCachedResult<EProduct>(cacheKey);

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

        const mergeImages = () => {
            const imagesGroupedById = productsWithSameName.reduce(
                (acc, p) => {
                    if (!p.images || p.images.length === 0) return acc;
                    const productId = Number(p.id);
                    let entry = acc.find(item => item.id === productId);
                    if (!entry) {
                        entry = { id: productId, links: [] };
                        acc.push(entry);
                    }
                    entry.links.push(...p.images);
                    return acc;
                },
                [] as { id: number; links: string[] }[]
            );

            imagesGroupedById.forEach(entry => {
                entry.links = Array.from(new Set(entry.links));
            });

            return imagesGroupedById;
        };

        const mergeField = (field: string) => {
            if (field === 'images') {
                return mergeImages();
            }

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
            images: mergeField('images'),
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

    public findByFilter(query: PaginateQuery): Promise<Paginated<EProduct>> {
        const config: PaginateConfig<EProduct> = {
            filterableColumns: {
                category: [FilterOperator.IN, FilterOperator.CONTAINS],
                usage: [FilterOperator.IN, FilterOperator.CONTAINS],
                plating: [FilterOperator.IN, FilterOperator.CONTAINS],
                invoice: [FilterOperator.IN, FilterOperator.CONTAINS],
                texture: [FilterOperator.IN, FilterOperator.CONTAINS],
                size: [FilterOperator.IN, FilterOperator.CONTAINS],
                shade: [FilterOperator.IN, FilterOperator.CONTAINS],
                availability: [FilterOperator.IN, FilterOperator.CONTAINS],
                price: [FilterOperator.GTE, FilterOperator.LTE],
                createdAt: [FilterOperator.GTE, FilterOperator.LTE],
                updatedAt: [FilterOperator.GTE, FilterOperator.LTE]
            },
            searchableColumns: [
                'category',
                'usage',
                'plating',
                'invoice',
                'texture',
                'size',
                'shade',
                'availability'
            ],
            sortableColumns: [
                'category',
                'usage',
                'plating',
                'invoice',
                'texture',
                'size',
                'shade',
                'availability',
                'price',
                'createdAt',
                'updatedAt'
            ]
        };

        return paginate(query, this.db, config);
    }

    public getCategories = async () => {
        const products = await this.findAll();

        return {
            name: this.formatToFilter(products.map(product => product.name)),
            availability: this.formatToFilter(
                products.map(product => product.availability)
            ),
            usage: this.formatToFilter(products.map(product => product.usage)),
            plating: this.formatToFilter(
                products.map(product => product.plating)
            ),
            texture: this.formatToFilter(
                products.map(product => product.texture)
            ),
            invoice: this.formatToFilter(
                products.map(product => product.invoice)
            ),
            size: this.formatToFilter(products.map(product => product.size)),
            shade: this.formatToFilter(products.map(product => product.shade)),
            country: this.formatToFilter(
                products.map(product => product.country)
            ),
            manufacturing: this.formatToFilter(
                products.map(product => product.manufacturing)
            )
        };
    };

    private formatToFilter(
        values: string[]
    ): { label: string; value: string }[] {
        const uniqueValues = [...new Set(values)]; // Удаляем дубликаты
        return uniqueValues.map(value => ({
            label: value,
            value: value
        }));
    }

    async parseLinksByArticules(): Promise<{
        updated: number;
        notFound: number;
        notUpdatedArticles: string[];
    }> {
        const articules = await this.db.find({ select: ['article', 'id'] });

        let updatedCount = 0;
        let notFoundCount = 0;
        const notUpdatedArticles: string[] = [];

        for (const { article, id } of articules) {
            const images = await this.YCloud.getItem(article);

            if (images.length > 0) {
                await this.db.update(id, { images });
                updatedCount++;
            } else {
                notFoundCount++;
                notUpdatedArticles.push(article);
            }
        }

        return {
            updated: updatedCount,
            notFound: notFoundCount,
            notUpdatedArticles
        };
    }

    private cleanupTempDirectory(dir: string) {
        if (fs.existsSync(dir)) {
            fs.rmdirSync(dir);
            console.log(`Удалена временная директория: ${dir}`);
        }
    }

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

    private generateSlug(name: string, article: string): string {
        const transliteratedName = transliterate(name)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const transliteratedArticle = transliterate(article)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        return `${transliteratedName}-${transliteratedArticle}`;
    }
}
