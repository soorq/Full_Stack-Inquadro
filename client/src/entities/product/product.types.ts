import { z } from 'zod';
import {
    ProductApiSchema,
    ProductClientSchema,
    ProductsApiSchema,
    ProductsSearchSchema
} from './product.contracts';
export type TypeSmallProduct = {
    price: string;
    sell?: string;
    image: string;
    id: string;
    category: string;
    total: string;
    name: string;
    availability: string;
};

export type ProductApi = z.infer<typeof ProductApiSchema>;
export type ProductsApi = z.infer<typeof ProductsApiSchema>;
export type ProductClient = z.infer<typeof ProductClientSchema>;
export type ProductsSearchApi = z.infer<typeof ProductsSearchSchema>;
// export type FilterQuery = z.infer<typeof ProductFilterSchema>;
// export type InfiniteProducts = InfiniteData<ProductsSchemaApi, number>;

type OptionValue = {
    id: number;
    value: string;
};

export type ProductState = {
    product: ProductClient | null;
    size: OptionValue | null;
    usage: OptionValue | null;
    shade: OptionValue | null;
};

export type ProductActions = {
    setProduct: (product: ProductClient) => void;
    setSize: (size: OptionValue) => void;
    setUsage: (usage: OptionValue) => void;
    setShade: (shade: OptionValue) => void;
    reset: () => void;
};
