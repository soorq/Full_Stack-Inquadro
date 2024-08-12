'use client';

import type { Swiper as SwiperCore } from 'swiper/types';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import React from 'react';

import 'swiper/css/pagination';
import 'swiper/css';

export const ProductSlider = ({ slides }: { slides: string[] }) => {
    const [thumbs, setThumbs] = React.useState<SwiperCore | null>(null);

    return (
        <div className="flex w-auto xl:w-full xl:max-w-[705px] lg:max-w-fit lg:mx-auto md:mx-auto md:max-w-[768px] max-h-[500px] lg:max-h-[710px] h-svh gap-2.5 shrink-0 lg:mb-0 mb-10">
            <Swiper
                className="h-full !hidden md:!block max-w-[170px] w-full"
                direction="vertical"
                onSwiper={setThumbs}
                slidesPerView={3}
                spaceBetween={10}
            >
                {slides.map((image, index) => (
                    <SwiperSlide key={`thumb-slide-${index}`}>
                        <div className="relative w-full h-full cursor-pointer">
                            <Image
                                alt={`thumb-product-${index}`}
                                className="rounded-lg"
                                src={image}
                                fill
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
                className="w-full h-full ml-2.5 md:max-w-[525px] max-w-max"
                spaceBetween={20}
                modules={[Thumbs, Pagination]}
                pagination={{
                    type: 'bullets',
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active'
                }}
                loop
            >
                {slides.map((image, index) => (
                    <SwiperSlide key={`main-slide-${index}`}>
                        <div className="relative w-full h-full">
                            <Image
                                alt={`main-product-${index}`}
                                className="rounded-lg"
                                src={image}
                                fill
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
