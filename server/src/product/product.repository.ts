import { CreateProductDto, UpdateProductDto } from '@app/shared';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { EProduct } from '@app/entities';

export type TypeMessage = {
    status: number;
    message: string;
};

export abstract class ProductRepository {
    abstract create(dto: CreateProductDto): Promise<EProduct>;
    abstract update(id: string, dto: UpdateProductDto): Promise<EProduct>;
    abstract delete(id: string): Promise<TypeMessage>;
    abstract findOne(id: string): Promise<EProduct>;
    abstract findByArticul(article: string): Promise<EProduct>;
    abstract findAll(): Promise<EProduct[]>;
    abstract findByFilter(query: PaginateQuery): Promise<Paginated<EProduct>>;
    abstract searchProduct(query: string): Promise<EProduct[] | EProduct>;
    abstract getCategories(): Promise<any>;
    abstract parseLinksByArticules(): Promise<any>;
}
