'use client';

import { ProductSmall } from '~&/src/widgets/product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Heart } from 'lucide-react';

const smallData = {
    image: '/product/main.png',
    sell: '15%',
    price: '1050',
    id: '534534',
    name: 'Avalanche',
    availability: 'В наличие',
    category: 'Керамическая плитка',
    total: '28 шт'
};

export const RecentProducts = () => {
    return (
        <div className="container mb-20">
            <div className="flex items-center gap-1 mb-5">
                <h3 className="text-lg">
                    Просмотренное, которое можно отложить в
                </h3>
                <Heart className="size-10 bg-black/10 fill-white stroke-white p-2 rounded-[10px]" />
            </div>
            <Swiper
                breakpoints={{ '1200px': { slidesPerView: 4 } }}
                spaceBetween={20}
            >
                <SwiperSlide>
                    <ProductSmall product={smallData} />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductSmall product={smallData} />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductSmall product={smallData} />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductSmall product={smallData} />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductSmall product={smallData} />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductSmall product={smallData} />
                </SwiperSlide>
                <SwiperSlide>
                    <ProductSmall product={smallData} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};
