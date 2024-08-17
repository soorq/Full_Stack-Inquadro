import { CreateProductDto, UpdateProductDto } from '@app/shared';
import { EProduct } from '@app/entities';

export type TypeMessage = {
    status: number;
    message: string;
};

export abstract class ProductRepository {
    abstract create(dto: CreateProductDto): Promise<EProduct>;
    abstract findOne(id: string): Promise<EProduct>;
    abstract findByArticul(article: string): Promise<EProduct>;
    abstract findAll(): Promise<EProduct[]>;
    abstract findByFilter(
        filter: Record<string, string | number | undefined>
    ): Promise<{ data: EProduct[], nextId: number, previousId: number }>;
    abstract update(id: string, dto: UpdateProductDto): Promise<EProduct>;
    abstract delete(id: string): Promise<TypeMessage>;
    abstract searchProduct(query: string): Promise<EProduct[] | EProduct>;
}
