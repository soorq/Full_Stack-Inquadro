'use client';

import { NOT_IMAGE } from '~&/src/shared/contants/gateway';
import { filterValidImages } from './product-slider.lib';
import { Swiper as SwiperCore } from 'swiper/types';
import { Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { cn } from '~&/src/shared/lib/tw-merge';
import Image from 'next/image';
import React from 'react';
import 'swiper/css/pagination';
import 'swiper/css';

export const ProductSlider = ({
    images,
    isBordur
}: {
    images: string[] | undefined;
    isBordur: boolean;
}) => {
    const [thumbs, setThumbs] = React.useState<SwiperCore | null>(null);

    const validImages = filterValidImages(images);

    if (validImages.length === 0) {
        validImages.push(NOT_IMAGE);
    }

    const processedImages =
        validImages.length === 1
            ? [validImages[0], validImages[0], validImages[0]]
            : validImages;

    return (
        <div
            className="flex w-auto xl:w-full xl:max-w-[705px] md:w-full lg:max-w-[50%] md:mx-auto md:max-w-[768px] max-h-[500px] lg:max-h-[710px] h-svh gap-2.5 shrink-0 lg:mb-0 mb-2.5"
            id="left-slider"
        >
            {processedImages.length > 1 && (
                <Swiper
                    className="h-full !hidden sm:!block lg:!hidden xl:!block max-w-[170px] w-full"
                    direction="vertical"
                    onSwiper={setThumbs}
                    slidesPerView={3}
                    spaceBetween={10}
                >
                    {processedImages.map((image, index) => (
                        <SwiperSlide key={`thumb-slide-${index}`}>
                            <div className="relative w-full h-full cursor-pointer">
                                <Image
                                    alt={`thumb-product-${index}`}
                                    className={cn(
                                        'rounded-[10px] object-center',
                                        image === NOT_IMAGE
                                            ? 'border object-contain border-secondary'
                                            : '',
                                        index > 0 &&
                                            processedImages.length === 3
                                            ? 'opacity-50'
                                            : '',
                                        isBordur
                                            ? 'object-contain'
                                            : 'object-cover'
                                    )}
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
                className={cn(
                    'w-full h-full ml-2.5 sm:max-w-[450px]',
                    validImages.length > 0 ? 'md:max-w-[525px]' : ''
                )}
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
                {processedImages.map((image, index) => (
                    <SwiperSlide key={`main-slide-${index}`}>
                        <div className="relative w-full h-full">
                            <Image
                                className={cn(
                                    'rounded-[10px] object-center',
                                    image === NOT_IMAGE
                                        ? 'border-secondary border'
                                        : '',
                                    index > 0 && processedImages.length === 3
                                        ? 'opacity-50'
                                        : '',
                                    isBordur ? 'object-contain' : 'object-cover'
                                )}
                                alt={`main-product-${index}`}
                                sizes="(max-width: 525px) 100vw, 525px"
                                blurDataURL={image}
                                placeholder="blur"
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
