'use client';

import { ProductSmallSkeleton } from '~&/src/features/product/small';
import { useRecentViewStore } from './recent-product.model';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';
import { Heart } from '@phosphor-icons/react';
import { Autoplay } from 'swiper/modules';
import dynamic from 'next/dynamic';
import 'swiper/css';

const ProductSmall = dynamic(
    () => import('~&/src/features/product/small').then(cn => cn.ProductSmall),
    {
        loading: () => <ProductSmallSkeleton />,
        ssr: false
    }
);

export const RecentProducts = () => {
    const { recentlyViewed: products } = useRecentViewStore(state => state);

    const breakers = {
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            370: {
                slidesPerView: 1.5
            },
            420: {
                slidesPerView: 2
            },
            550: {
                slidesPerView: 2.5
            },
            768: {
                slidesPerView: 3.5
            },
            1024: {
                slidesPerView: 4
            }
        }
    } satisfies Pick<SwiperOptions, 'breakpoints'>;

    if (!products || products.length === 0) return null;

    return (
        <section className="w-full h-full mb-10">
            <div className="flex items-center gap-1 mb-5">
                <h3 className="text-lg">
                    Просмотренное, которое можно отложить в
                </h3>
                <Heart
                    weight="fill"
                    className="size-10 bg-black/10 fill-white stroke-white p-2 rounded-[10px]"
                />
            </div>
            <Swiper
                {...breakers}
                modules={[Autoplay]}
                spaceBetween={20}
                autoplay={{
                    delay: 4500
                }}
                loop={products.length >= 4}
            >
                {products.map((product, index) => {
                    return (
                        <SwiperSlide
                            key={`recent-product-${index}-${product?.slug}`}
                        >
                            <ProductSmall
                                product={product}
                                withFav
                                className="max-h-[300px]"
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
};
