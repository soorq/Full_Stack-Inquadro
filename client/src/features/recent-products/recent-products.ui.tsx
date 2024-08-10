'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductPreview } from '~&/src/entities/product';
import { Heart } from 'lucide-react';

export const RecentProducts = () => {
    return (
        <div className="container mb-20">
            <div className="flex items-center gap-1 mb-5">
                <h3 className="text-lg">
                    Просмотренное, которое можно отложить в
                </h3>
                <Heart className="size-10 bg-black/10 fill-white stroke-white p-2 rounded-xl" />
            </div>
            <Swiper slidesPerView={4} spaceBetween={20}>
                <SwiperSlide>
                    <ProductPreview variant="sm" />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductPreview variant="sm" />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductPreview variant="sm" />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductPreview variant="sm" />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductPreview variant="sm" />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductPreview variant="sm" />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductPreview variant="sm" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};
