'use client';

import { NOT_IMAGE } from '~&/src/shared/contants/gateway';
import { Swiper as SwiperCore } from 'swiper/types';
import { Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { cn } from '~&/src/shared/lib/tw-merge';
import Image from 'next/image';
import React from 'react';
import 'swiper/css/pagination';
import 'swiper/css';

const filterValidImages = (images: string[] | undefined): string[] => {
    const validImageExtensions = ['.jpg', '.jpeg', '.png', '.avif', '.webp'];

    if (!images || images.length === 0) {
        return Array.from({ length: 3 }, () => NOT_IMAGE);
    }

    return images.filter(image =>
        validImageExtensions.some(ext => image.toLowerCase().endsWith(ext))
    );
};

export const ProductSlider = ({ images }: { images: string[] | undefined }) => {
    const [thumbs, setThumbs] = React.useState<SwiperCore | null>(null);

    const validImages = filterValidImages(images);

    if (validImages.length === 0) {
        validImages.push(NOT_IMAGE);
    }

    return (
        <div className="flex w-auto xl:w-full xl:max-w-[705px] lg:w-full lg:max-w-[625px] md:mx-auto md:max-w-[768px] max-h-[500px] lg:max-h-[710px] h-svh gap-2.5 shrink-0 lg:mb-0 mb-2.5">
            {validImages.length > 1 && (
                <Swiper
                    className="h-full !hidden sm:!block max-w-[170px] w-full"
                    direction="vertical"
                    onSwiper={setThumbs}
                    slidesPerView={3}
                    spaceBetween={10}
                >
                    {validImages.map((image, index) => (
                        <SwiperSlide key={`thumb-slide-${index}`}>
                            <div className="relative w-full h-full cursor-pointer">
                                <Image
                                    alt={`thumb-product-${index}`}
                                    className={cn("rounded-lg", image === NOT_IMAGE ? 'border object-contain border-secondary' : '')}
                                    sizes="(max-width: 170px) 100vw, 170px"
                                    blurDataURL={image}
                                    loading="eager"
                                    rel="preload"
                                    src={image}
                                    fill
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            <Swiper
                thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
                className={cn("w-full h-full ml-2.5 sm:max-w-[450px]", validImages.length > 1 ? 'md:max-w-[525px]' : '')}
                spaceBetween={20}
                modules={[Thumbs, Pagination]}
                pagination={{
                    type: 'bullets',
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active'
                }}
                loop={validImages.length > 1}
            >
                {validImages.map((image, index) => (
                    <SwiperSlide key={`main-slide-${index}`}>
                        <div className="relative w-full h-full">
                            <Image
                                className={cn("rounded-lg", image === NOT_IMAGE ? 'object-contain border-secondary border' : '')}
                                alt={`main-product-${index}`}
                                sizes="(max-width: 525px) 100vw, 525px"
                                blurDataURL={image}
                                placeholder='blur'
                                loading="eager"
                                rel="preload"
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
