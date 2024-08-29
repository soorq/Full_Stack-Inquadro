'use client';

import { ProductApi, useProductStore } from '~&/src/entities/product';
import { useRecentViewStore } from '~&/src/entities/recent-view';
import { OrderInfo } from '~&/src/widgets/order-info';
import { memo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
    ProductOperationSkeleton,
    ProductOptionsSkeleton,
    ProductDetailsSkeleton,
    ProductSliderSkeleton
} from '~&/src/widgets/product';

const ProductOptions = dynamic(
    () => import('~&/src/widgets/product').then(cn => cn.ProductOptions),
    { loading: () => <ProductOptionsSkeleton />, ssr: false }
);

const ProductSlider = dynamic(
    () => import('~&/src/widgets/product').then(cn => cn.ProductSlider),
    { loading: () => <ProductSliderSkeleton /> }
);

const ProductDetails = dynamic(
    () => import('~&/src/widgets/product').then(cn => cn.ProductDetails),
    { loading: () => <ProductDetailsSkeleton />, ssr: false }
);

const ProductOperation = dynamic(
    () => import('~&/src/widgets/product').then(cn => cn.ProductOperation),
    { loading: () => <ProductOperationSkeleton />, ssr: false }
);

export const ProductLarge = memo(({ product }: { product: ProductApi }) => {
    const { addRecentProduct } = useRecentViewStore(state => state);
    const { setProductApi, product_client, setProductClient } = useProductStore(
        state => state
    );

    useEffect(() => {
        setProductClient(product);
        setProductApi(product);
    }, [product, setProductApi, setProductClient]);

    useEffect(() => {
        if (product_client !== null) {
            addRecentProduct(product_client);
        }
    }, [product, product_client]);

    return (
        <section className="lg:flex-row flex flex-col lg:justify-between lg:gap-5 mb-10 lg:mb-0">
            <ProductSlider images={product_client?.images}/>
            <div className="flex flex-col gap-1.5 w-full lg:max-w-[450px] xl:max-w-none">
                <ProductOptions product={product_client} />
                <ProductOperation />
                <OrderInfo />
                <ProductDetails product={product_client} />
            </div>
        </section>
    );
});

ProductLarge.displayName = 'ProductLarge';
