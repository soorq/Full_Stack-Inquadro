import { z } from 'zod';
import {
    ProductsClientSchema,
    ProductsSearchSchema,
    ProductClientSchema,
    ProductsApiSchema,
    ProductApiSchema,
    ProductsSchema
} from './product.contracts';

export type ProductApi = z.infer<typeof ProductApiSchema>;

export type ProductsApi = z.infer<typeof ProductsApiSchema>;

export type ProductClient = z.infer<typeof ProductClientSchema>;

export type ProductsClient = z.infer<typeof ProductsClientSchema>;

export type ProductsSearchApi = z.infer<typeof ProductsSearchSchema>;

export type Products = z.infer<typeof ProductsSchema>;

export type ProductState = {
    product_api: ProductApi | null;
    product_client: ProductClient | null;
    currentId: number | null;
};

export type ProductActions = {
    setProductClient: (product: ProductApi) => void;
    setProductApi: (product: ProductApi) => void;
    setCurrentId: (id: number) => void;
    reset: () => void;
};

export type ProductWithQuantity = ProductClient & {
    quantity: number;
    totalPrice: number;
};

export type DynamicOption = { id: number; value: string };
