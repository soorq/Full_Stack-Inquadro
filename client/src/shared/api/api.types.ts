import { z } from 'zod';
import {
    ProductDtoSchema,
    ProductsDtoSchema,
    ProductSearchDtoSchema,
    ProductsFeedParamsDtoSchema,
    ProductsSearchDtoSchema
} from './api.contract';

export type ProductDto = z.infer<typeof ProductDtoSchema>;
export type ProductsDto = z.infer<typeof ProductsDtoSchema>;

export type ProductsParamsQueryDto = z.infer<
    typeof ProductsFeedParamsDtoSchema
>;

export type ProductsSearchDto = z.infer<typeof ProductsSearchDtoSchema>;
export type ProductSearchDto = z.infer<typeof ProductSearchDtoSchema>;
