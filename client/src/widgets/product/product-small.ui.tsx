import { ProductClient } from '~&/src/entities/product';
import { Button } from '~&/src/shared/ui/button';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const ProductSmall = forwardRef<
    HTMLDivElement,
    { product: ProductClient }
>(({ product }, ref) => {
    return (
        <div className="h-full w-full" ref={ref}>
            <div className="relative max-h-[345px] h-svh w-full group/small overflow-hidden">
                <Image
                    fill
                    src={'/product/main.png'}
                    alt="small-product-preview"
                    className="rounded-t-xl"
                />

                <div className="absolute w-full h-full top-0 left-0 transition-transform duration-150 transform translate-y-full group-hover/small:translate-y-0 bg-secondary/50">
                    <div className="flex justify-center items-center w-full h-full">
                        <Button
                            asChild
                            className="bg-secondary/50 shadow-none text-white h-12 px-5 py-2"
                        >
                            <Link href={`/product/${product.slug}`}>
                                Посмотреть
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="bg-secondary p-2.5 w-full h-auto rounded-b-[10px]">
                <Link href={`/product/${product.slug}`} className="relative">
                    <div className="flex justify-between items-center">
                        <span className="text-lg">
                            {Math.floor((product && +product?.price) || 0)}
                            {' рублей за '}
                            {product?.kit
                                ? +product.kit === 1
                                    ? 'шт.'
                                    : 'м²'
                                : ''}
                        </span>
                        {/*#ADD SELL*/}
                    </div>
                    <div className="w-full h-full">
                        <p className="text-sm text-black/50">
                            {product.category}
                        </p>
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg leading-4">
                                {product.name}
                            </h3>
                            <span className="text-sm text-black/50 leading-4">
                                {product.kit}
                                {' шт.'}
                            </span>
                        </div>
                    </div>

                    <span className="absolute h-5 -top-7 text-sm left-0 rounded-t-md bg-secondary py-1 px-2 block">
                        {product.availability}
                    </span>
                </Link>
            </div>
        </div>
    );
});

ProductSmall.displayName = 'ProductSmall';
