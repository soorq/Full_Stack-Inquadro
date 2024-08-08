import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '@app/shared';
import { EProduct } from '@app/entities';
import { Repository } from 'typeorm';
import {
    ProductRepository,
    TypeFilterOptions,
    TypeMessage
} from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService implements ProductRepository {
    constructor(
        @InjectRepository(EProduct) private readonly db: Repository<EProduct>
    ) {}

    public create = async (dto: CreateProductDto): Promise<EProduct> => {
        const isExisting = await this.findByArticul(dto.article);

        if (isExisting) {
            throw new HttpException(
                'Такой товар уже существует',
                HttpStatus.CONFLICT
            );
        }

        const product = await this.db.create(dto);

        try {
            return await this.db.save(product);
        } catch (error) {
            console.error('Ошибка при сохранении продукта:', error);
            throw new HttpException(
                'Ошибка при сохранении товара в БД',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    };

    public update = async (
        id: string,
        dto: UpdateProductDto
    ): Promise<EProduct> => {
        const isExisting = await this.findOne(id);

        if (!isExisting) {
            throw new HttpException(
                'Такого поста не существует',
                HttpStatus.BAD_REQUEST
            );
        }

        await this.db.update(id, dto);

        return this.findOne(id);
    };

    public delete = async (id: string): Promise<TypeMessage> => {
        const isExisting = await this.findOne(id);

        if (!isExisting) {
            throw new HttpException(
                'Такого товара не существует',
                HttpStatus.CONFLICT
            );
        }

        await this.db.delete(id);

        return { message: 'Успешно удален', status: 200 };
    };

    public findAll = async (): Promise<EProduct[]> => {
        return this.db.find();
    };

    public findByFilter = async (
        filter: TypeFilterOptions
    ): Promise<EProduct[]> => {
        return;
    };

    findByArticul = async (article: string): Promise<EProduct> => {
        return this.db.findOne({ where: { article } });
    };

    public findOne = async (id: string): Promise<EProduct> => {
        return this.db.findOne({ where: { id } });
    };
}
