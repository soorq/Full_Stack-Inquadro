'use client';

import { ProductApi, useProductStore } from '~&/src/entities/product';
import { useRecentViewStore } from '~&/src/entities/recent-view';
import { OrderInfo } from '~&/src/widgets/order-info';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { memo, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import {
    ProductOperationSkeleton,
    ProductOptionsSkeleton,
    ProductDetailsSkeleton,
    ProductSliderSkeleton
} from '~&/src/widgets/product';

// ################# //

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ################# //

const ProductOptions = dynamic(
    () => import('~&/src/widgets/product').then(cn => cn.ProductOptions),
    { loading: () => <ProductOptionsSkeleton />, ssr: false }
);

// ################# //

const ProductSlider = dynamic(
    () => import('~&/src/widgets/product').then(cn => cn.ProductSlider),
    { loading: () => <ProductSliderSkeleton /> }
);

// ################# //

const ProductDetails = dynamic(
    () => import('~&/src/widgets/product').then(cn => cn.ProductDetails),
    { loading: () => <ProductDetailsSkeleton />, ssr: false }
);

// ################# //

const ProductOperation = dynamic(
    () => import('~&/src/widgets/product').then(cn => cn.ProductOperation),
    { loading: () => <ProductOperationSkeleton />, ssr: false }
);

// ################# //

export const ProductLarge = memo(({ product }: { product: ProductApi }) => {
    const container = useRef(null);
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

    useGSAP(
        () => {
            let mm = gsap.matchMedia();
            const containerElement = container?.current as HTMLElement | null;
            const leftSliderElement = document.getElementById(
                'left-slider'
            ) as HTMLElement | null;

            if (containerElement && leftSliderElement) {
                mm.add('(min-width: 1024px)', () => {
                    gsap.to(leftSliderElement, {
                        position: 'sticky',
                        top: '20px',
                        scrollTrigger: {
                            trigger: leftSliderElement,
                            start: 'top top',
                            end: () => `35%`,
                            scrub: true,
                            pin: false
                        }
                    });
                });
            }
        },
        { scope: container }
    );

    return (
        <section
            className="relative lg:flex-row flex flex-col lg:justify-between lg:gap-5 mb-5"
            ref={container}
        >
            <ProductSlider images={product_client?.images} />
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
