'use client';

import { ProductApi, useProductStore } from '~&/src/entities/product';
import { OrderInfo } from '~&/src/widgets/order-info';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
    ProductOptionsSkeleton,
    ProductOperationSkeleton,
    ProductDetailsSkeleton
} from '~&/src/features/product';
import { ProductSliderSkeleton } from '~&/src/features/product/product-slider';

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

export const ProductLarge = ({
    slides,
    product
}: {
    slides: string[];
    product: ProductApi;
}) => {
    const { setProductApi, product_client, setProductClient } = useProductStore(
        state => state
    );

    useEffect(() => {
        setProductClient(product);
        setProductApi(product);
    }, [product, setProductApi, setProductClient]);

    return (
        <main className="lg:flex-row flex flex-col lg:justify-between container lg:gap-5 mb-10 lg:mb-0">
            <ProductSlider slides={slides} />
            <div className="flex flex-col gap-1.5 w-full">
                <ProductOptions product={product_client} />
                <ProductOperation />
                <OrderInfo />
                <ProductDetails product={product_client} />
            </div>
        </main>
    );
};
