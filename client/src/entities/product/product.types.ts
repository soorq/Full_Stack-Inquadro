import { InfiniteData } from '@tanstack/react-query';
import { z } from 'zod';
import {
    ProductFilterSchema,
    ProductSchema,
    ProductsSchema
} from './product.contract';

export type variants = 'sm' | 'lg';
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

export type Product = z.infer<typeof ProductSchema>;
export type Products = z.infer<typeof ProductsSchema>;
export type FilterQuery = z.infer<typeof ProductFilterSchema>;
export type InfiniteProducts = InfiniteData<Products, number>;
