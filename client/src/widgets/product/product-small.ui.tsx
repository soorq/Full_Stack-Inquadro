import type { TypeSmallProduct } from '~&/src/entities/product';
import { Button } from '~&/src/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const ProductSmall = ({ product }: { product: TypeSmallProduct }) => {
    return (
        <div className="h-full w-full">
            <div className="relative max-h-[345px] h-svh w-full group/small overflow-hidden">
                <Image
                    fill
                    src={product.image}
                    alt="small-product-preview"
                    className="rounded-t-xl"
                />

                <div className="absolute w-full h-full top-0 left-0 transition-transform duration-150 transform translate-y-full group-hover/small:translate-y-0 bg-secondary/50">
                    <div className="flex justify-center items-center w-full h-full">
                        <Button
                            asChild
                            className="bg-secondary/50 shadow-none text-white h-12 px-5 py-2"
                        >
                            <Link href={`/product/${product.id}`}>
                                Посмотреть
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="bg-secondary p-2.5 w-full h-auto rounded-b-[10px]">
                <Link href={`/product/${product.id}`} className="relative">
                    <div className="flex justify-between items-center mb-0.5">
                        <span className="text-lg">
                            {product.price} рублей за м²
                        </span>
                        {product.sell ? (
                            <span className="text-lg">{product.sell}</span>
                        ) : null}
                    </div>
                    <div className="w-full h-full">
                        <p className="text-sm text-black/50">
                            {product.category}
                        </p>
                        <div className="flex justify-between">
                            <h3 className="text-lg">{product.name}</h3>
                            <span className="text-sm text-black/50 leading-8">
                                {product.total}
                            </span>
                        </div>
                    </div>

                    <span className="absolute h-5 -top-7 text-sm left-2.5 rounded-t-md bg-secondary py-1 px-2 block">
                        {product.availability}
                    </span>
                </Link>
            </div>
        </div>
    );
};
