'use server';

import { ProductService } from '~&/src/shared/api/product';
import { ProductApi } from '~&/src/entities/product';

export async function getProduct(slug: string): Promise<ProductApi> {
    const res = await ProductService.productQuery(slug);
    return res.data;
}
