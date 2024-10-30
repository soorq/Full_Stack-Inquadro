'use server';
import { ProductService } from '~&/src/shared/api/product';

export const getProductBySlug = async (slug: string) => {
    return ProductService.get(slug);
};

export const getProducts = async () => {
    return ProductService.getAll();
};
