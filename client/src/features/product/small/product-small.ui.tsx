import { FavoriteWidget } from '~&/src/features/favorite-widget';
import { NOT_IMAGE } from '~&/src/shared/contants/gateway';
import { ProductClient } from '~&/src/entities/product';
import { Button } from '~&/src/shared/ui/button';
import { cn } from '~&/src/shared/lib/tw-merge';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const ProductSmall = React.forwardRef<
    HTMLDivElement,
    { product: ProductClient; withFav?: boolean; className?: string }
>(({ product, withFav = false, className }, ref) => {
    const isBordur = Array.isArray(product?.usage)
        ? product?.usage.some(item => /бордюр/.test(item))
        : /бордюр/.test(product?.usage || '');
    return (
        <div className="w-full h-full col-span-1" ref={ref}>
            <div
                className={cn(
                    'relative h-svh max-h-[200px] xs:max-h-[230px] sm:max-h-[250px] md:max-h-[290px] lg:max-h-[340px] w-full overflow-hidden rounded-t-xl group/small',
                    className
                )}
            >
                <Image
                    className={cn(
                        'object-center transition-transform duration-700 group-hover/small:scale-105',
                        product?.images
                            ? 'border border-secondary shadow-lg shadow-secondary'
                            : '',
                        isBordur ? 'object-contain' : 'object-cover'
                    )}
                    blurDataURL={product.images?.[0] || NOT_IMAGE}
                    sizes="(max-width: 170px) 100vw, 170px"
                    src={product.images?.[0] || NOT_IMAGE}
                    alt={product.name}
                    loading="lazy"
                    fill
                />
                <div className="absolute inset-0 flex justify-center items-center transition-all duration-300 transform scale-0 opacity-0 group-hover/small:scale-90 group-hover/small:opacity-100">
                    <Button
                        className="h-10 md:h-12 px-5 text-sm sm:text-base text-white shadow-none"
                        asChild
                    >
                        <Link href={`/product/${product.slug}`}>
                            Посмотреть
                        </Link>
                    </Button>
                </div>
                {withFav && (
                    <FavoriteWidget
                        className="absolute top-2.5 right-2.5"
                        product={product}
                        qty={1}
                    />
                )}
            </div>

            <div className="bg-secondary p-2.5 pb-3 rounded-b-[10px] relative">
                <Link href={`/product/${product.slug}`}>
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm leading-5 md:leading-5 text-black/50 sm:text-black sm:text-base md:text-lg">
                            {Math.floor((product && +product?.price) || 0)}{' '}
                            рублей за {+product?.kit === 1 ? 'шт.' : 'м²'}
                        </span>
                    </div>
                    <p className="text-sm hidden leading-5 sm:block text-black/50">
                        {product.category}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <h3 className="text-sm sm:text-base md:text-lg !leading-5">
                            {product.name}
                        </h3>
                        <p className="text-xs !leading-5 sm:text-sm flex gap-0.5 md:gap-0 md:block text-black/50">
                            {product.kit} шт.
                            <span className="block sm:hidden">
                                в одной упаковке
                            </span>
                        </p>
                    </div>
                    <span className="absolute !leading-3 -top-3 md:-top-5 left-3 px-1.5 md:px-2 py-0.5 md:py-1 text-xs md:text-sm rounded-t-md bg-secondary text-black/50">
                        {product.availability}
                    </span>
                </Link>
            </div>
        </div>
    );
});

ProductSmall.displayName = 'ProductSmall';
