'use client';

import type { Swiper as SwiperCore } from 'swiper/types';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import React from 'react';

import 'swiper/css/navigation';
import 'swiper/css';

export const ProductSlider = ({ slides }: { slides: string[] }) => {
    const [thumbs, setThumbs] = React.useState<SwiperCore | null>(null);

    return (
        <div className="flex w-full max-w-[705px] max-h-[710px] h-auto gap-2.5 shrink-0">
            <Swiper
                className="h-full max-w-[170px] w-full"
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
                className="w-full h-full ml-2.5 max-w-[525px]"
                modules={[Thumbs, Navigation]}
                navigation
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
