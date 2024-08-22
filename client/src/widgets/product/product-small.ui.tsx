import { FavoriteWidget } from '~&/src/features/favorite-widget';
import { ProductClient } from '~&/src/entities/product';
import { Button } from '~&/src/shared/ui/button';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const ProductSmall = forwardRef<
    HTMLDivElement,
    { product: ProductClient; withFav?: boolean }
>(({ product, withFav = false }, ref) => {
    return (
        <div className="w-full h-full" ref={ref}>
            <div className="relative h-svh max-h-[200px] xs:max-h-[230px] sm:max-h-[250px] md:max-h-[290px] lg:max-h-[340px] w-full overflow-hidden rounded-t-xl group/small">
                <Image
                    fill
                    src="/product/main.png"
                    alt="small-product-preview"
                    className="transition-transform duration-700 group-hover/small:scale-105"
                />
                <div className="absolute inset-0 flex justify-center items-center transition-transform duration-300 transform translate-y-full group-hover/small:translate-y-0">
                    <Button
                        asChild
                        className="h-10 md:h-12 px-5 text-sm sm:text-base text-white shadow-none"
                    >
                        <Link href={`/product/${product.slug}`}>
                            Посмотреть
                        </Link>
                    </Button>
                </div>
                {withFav && (
                    <FavoriteWidget
                        className="absolute top-2.5 right-2.5 size-10"
                        product={product}
                        qty={1}
                    />
                )}
            </div>

            <div className="bg-secondary p-3 sm:pb-3 pb-2 pt-1.5 md:pt-1 rounded-b-[10px] relative">
                <Link href={`/product/${product.slug}`}>
                    <div className="flex justify-between items-center mb-0.5 sm:mb-0">
                        <span className="text-sm leading-5 md:leading-relaxed text-black/50 sm:text-black sm:text-base md:text-lg">
                            {Math.floor((product && +product?.price) || 0)}{' '}
                            рублей за {+product?.kit === 1 ? 'шт.' : 'м²'}
                        </span>
                    </div>
                    <p className="text-sm hidden sm:block text-black/50">
                        {product.category}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <h3 className="text-sm sm:text-base md:text-lg leading-4">
                            {product.name}
                        </h3>
                        <p className="text-xs leading-4 sm:text-sm flex gap-0.5 md:gap-0 md:block text-black/50">
                            {product.kit} шт.
                            <span className="block sm:hidden">
                                в одной упаковке
                            </span>
                        </p>
                    </div>
                    <span className="absolute -top-5 md:-top-6 left-3 px-1.5 md:px-2 py-0.5 md:py-1 text-xs md:text-sm rounded-t-md bg-secondary text-black/50">
                        {product.availability}
                    </span>
                </Link>
            </div>
        </div>
    );
});

ProductSmall.displayName = 'ProductSmall';
