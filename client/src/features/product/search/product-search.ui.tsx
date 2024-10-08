import type { ProductClient } from '~&/src/entities/product';
import { NOT_IMAGE } from '~&/src/shared/contants/gateway';
import { Button } from '~&/src/shared/ui/button';
import { Badge } from '~&/src/shared/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { cn } from '~&/src/shared/lib/tw-merge';

export const ProductSearch = ({
    product,
    onClick
}: {
    product: ProductClient;
    onClick: () => void;
}) => {
    return (
        <div className="flex gap-5 px-4 py-2 sm:p-4 w-full h-auto">
            <div className="relative shrink-0 w-full max-w-[135px] h-auto sm:max-w-[170px]">
                <Image
                    className={cn(
                        'rounded-[10px] object-cover',
                        product?.images
                            ? 'border border-secondary shadow-lg shadow-secondary'
                            : ''
                    )}
                    blurDataURL={product.images?.[0] || NOT_IMAGE}
                    sizes="(max-width: 170px) 100vw, 170px"
                    src={product.images?.[0] || NOT_IMAGE}
                    alt={product.name}
                    loading="lazy"
                    fill
                />

                <div className="absolute sm:hidden flex flex-col gap-1 bottom-1.5 left-1.5 text-xs">
                    <Badge variant="mobile">{product.kit} шт.</Badge>
                    <Badge variant="mobile">{product.availability}</Badge>
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <div className="bg-secondary p-2.5 rounded-[10px]">
                    <div className="flex justify-between [&>p]:text-xs sm:[&>p]:text-sm [&>p]:text-black/50 [&>p]:leading-4">
                        <p>{product.category}</p>
                        <p className="hidden sm:block">
                            {product.availability}
                        </p>
                    </div>
                    <h4 className="text-base sm:text-lg md:text-xl leading-5">
                        {product.name}
                    </h4>
                </div>
                <div className="flex justify-between items-center bg-secondary p-2.5 rounded-[10px]">
                    <p className="text-sm sm:text-lg leading-5">
                        {Math.floor((product && +product?.price) || 0)}
                        {' рублей за '}
                        {product?.kit
                            ? +product.kit === 1
                                ? 'шт.'
                                : 'м²'
                            : ''}
                    </p>
                </div>
                <div className="flex-wrap gap-1.5 hidden sm:flex">
                    <Badge variant="secondary">{product.texture}</Badge>
                    <Badge variant="secondary">{product.usage}</Badge>
                    <Badge variant="secondary">
                        {product.plating} покрытие
                    </Badge>
                    <Badge variant="secondary">{product.invoice}</Badge>
                </div>
                <Button
                    asChild
                    className="sm:h-[50px] w-full text-sm sm:text-lg leading-4 py-1.5 h-10 sm:py-2 font-normal"
                >
                    <Link onClick={onClick} href={`/product/${product.slug}`}>
                        Посмотреть
                    </Link>
                </Button>
            </div>
        </div>
    );
};
