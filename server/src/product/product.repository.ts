import { EProduct } from '@app/entities';

export type TypeMessage = {
    status: number;
    message: string;
};

export type TypeFilterOptions = {
    heelo: string;
};

export abstract class ProductRepository {
    abstract create(dto): Promise<EProduct>;
    abstract findOne(id: string): Promise<EProduct>;
    abstract findByArticul(article: string): Promise<EProduct>;
    abstract findAll(): Promise<EProduct[]>;
    abstract findByFilter(filter: TypeFilterOptions): Promise<EProduct[]>;
    abstract update(id: string): Promise<EProduct>;
    abstract delete(id: string): Promise<TypeMessage>;
}
