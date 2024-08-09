import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '@app/shared';
import { ProductRepository } from './product.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { EProduct } from '@app/entities';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService implements ProductRepository {
    constructor(
        @InjectRepository(EProduct) private readonly db: Repository<EProduct>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    public create = async (dto: CreateProductDto) => {
        const isExisting = await this.findByArticul(dto.article);

        if (isExisting) {
            throw new HttpException(
                'Такой товар уже существует',
                HttpStatus.CONFLICT
            );
        }

        const product = await this.db.create(dto);

        try {
            await this.cacheManager.del('all_products');
            await this.cacheManager.del('products_filter_*'); // Очистка всех кэшированных фильтрованных продуктов

            return await this.db.save(product);
        } catch (error) {
            console.error('Ошибка при сохранении продукта:', error);
            throw new HttpException(
                'Ошибка при сохранении товара в БД',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    };

    public update = async (id: string, dto: UpdateProductDto) => {
        const isExisting = await this.findOne(id);

        if (!isExisting) {
            throw new HttpException(
                'Такого поста не существует',
                HttpStatus.BAD_REQUEST
            );
        }

        await this.db.update(id, dto);

        await this.cacheManager.del(`product_${id}`);
        await this.cacheManager.del('all_products'); // Очистка кэша всех продуктов
        await this.cacheManager.del('products_filter_*'); // Очистка всех кэшированных фильтрованных продуктов

        return this.findOne(id);
    };

    public delete = async (id: string) => {
        const isExisting = await this.findOne(id);

        if (!isExisting) {
            throw new HttpException(
                'Такого товара не существует',
                HttpStatus.CONFLICT
            );
        }

        await this.db.delete(id);

        await this.cacheManager.del(`product_${id}`);
        await this.cacheManager.del('all_products'); // Очистка кэша всех продуктов
        await this.cacheManager.del('products_filter_*'); // Очистка всех кэшированных фильтрованных продуктов

        return { message: 'Успешно удален', status: 200 };
    };

    public findAll = async () => {
        const cacheKey = 'all_products';

        const cachedResult = (await this.cacheManager.get(
            cacheKey
        )) as EProduct[];

        if (cachedResult) {
            return cachedResult;
        }

        const products = await this.db.find();

        await this.cacheManager.set(cacheKey, products, 60 * 5);

        return products;
    };

    public findByFilter = async (
        filter: Record<string, string | number | undefined>
    ) => {
        const validFilter = Object.entries(filter)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, value]) => value !== undefined && value !== '')
            .map(([key, value]) => `${key}-${value}`);

        // Генерируем ключ для кэша
        const cacheKey = `Category_filters:products_filter_${validFilter.sort().join('|')}`;

        const cachedResult = (await this.cacheManager.get(
            cacheKey
        )) as EProduct[];

        if (cachedResult) {
            return cachedResult;
        }

        const { minPrice, maxPrice, limit = 20, offset = 0, ...other } = filter;

        const qb = await this.db
            .createQueryBuilder('f')
            .orderBy('f.createdAt', 'DESC');

        Object.entries(other).forEach(([key, value]) => {
            if (value) {
                qb.andWhere(`f.${key} = :${key}`, { [key]: value });
            }
        });

        if (minPrice) {
            qb.andWhere('f.price >= :minPrice', { minPrice });
        }

        if (maxPrice) {
            qb.andWhere('f.price <= :maxPrice', { maxPrice });
        }

        const result = qb.take(+limit).skip(+offset).getMany();

        await this.cacheManager.set(cacheKey, result, 60 * 5);

        return result;
    };

    public findByArticul = async (article: string) => {
        return this.db.findOne({ where: { article } });
    };

    public findOne = async (id: string) => {
        const cacheKey = `Category_findOne:product_${id}`;

        const cachedResult = (await this.cacheManager.get(
            cacheKey
        )) as EProduct;

        if (cachedResult) {
            return cachedResult;
        }

        const product = await this.db.findOne({ where: { id } });

        await this.cacheManager.set(cacheKey, product, 60 * 5); // Кэшируем на 5 минут

        return product;
    };
}
