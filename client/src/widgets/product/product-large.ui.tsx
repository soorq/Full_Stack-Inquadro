'use client';

import { ProductApi, useProductStore } from '~&/src/entities/product';
import { useRecentViewStore } from '~&/src/entities/recent-view';
import { OrderInfo } from '~&/src/widgets/order-info';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
    ProductOperationSkeleton,
    ProductOptionsSkeleton,
    ProductDetailsSkeleton,
    ProductSliderSkeleton
} from '~&/src/features/product';

const ProductOptions = dynamic(
    () => import('~&/src/features/product').then(cn => cn.ProductOptions),
    { ssr: false, loading: () => <ProductOptionsSkeleton /> }
);

const ProductSlider = dynamic(
    () => import('~&/src/features/product').then(cn => cn.ProductSlider),
    { ssr: false, loading: () => <ProductSliderSkeleton /> }
);

const ProductDetails = dynamic(
    () => import('~&/src/features/product').then(cn => cn.ProductDetails),
    { ssr: false, loading: () => <ProductDetailsSkeleton /> }
);

const ProductOperation = dynamic(
    () => import('~&/src/features/product').then(cn => cn.ProductOperation),
    { ssr: false, loading: () => <ProductOperationSkeleton /> }
);

export const ProductLarge = React.memo(
    ({ product }: { product: ProductApi }) => {
        const { setProductApi, product_client, setProductClient } =
            useProductStore(state => state);

        const { addRecentProduct } = useRecentViewStore(state => state);

        useEffect(() => {
            setProductClient(product);
            setProductApi(product);
        }, [product, setProductApi, setProductClient]);

        useEffect(() => {
            if (product_client !== null) {
                addRecentProduct(product_client);
            }
        }, [addRecentProduct]);

        return (
            <main className="lg:flex-row flex flex-col lg:justify-between container lg:gap-5 mb-10 lg:mb-0">
                <ProductSlider />
                <div className="flex flex-col gap-1.5 w-full">
                    <ProductOptions product={product_client} />
                    <ProductOperation />
                    <OrderInfo />
                    <ProductDetails product={product_client} />
                </div>
            </main>
        );
    }
);

ProductLarge.displayName = 'ProductLarge';
