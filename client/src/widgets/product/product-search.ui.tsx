import type { ProductClient } from '~&/src/entities/product';
import { Button } from '~&/src/shared/ui/button';
import { Badge } from '~&/src/shared/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const ProductSearch = ({
    product,
    onClick
}: {
    product: ProductClient;
    onClick: () => void;
}) => {
    return (
        <div className="flex gap-5 p-4 w-full h-auto">
            <div className="relative shrink-0 w-full h-svh max-w-[170px] max-h-[230px]">
                <Image
                    src="/product/main.png"
                    className="rounded-[10px]"
                    alt={product.name}
                    fill
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
            <div className="bg-secondary p-2.5 rounded-[10px]">
                    <div className="flex justify-between [&>p]:text-sm [&>p]:text-black/50 [&>p]:leading-4">
                        <p>{product.category}</p>
                        <p>{product.availability}</p>
                    </div>
                    <h4 className="text-xl leading-5">{product.name}</h4>
                </div>
                <div className="flex justify-between items-center bg-secondary p-2.5 rounded-[10px]">
                    <p className="text-lg leading-5">
                        {product.price} рублей за м²
                    </p>
                    {product?.slug && (
                        <p className="text-lg leading-5">{product.slug}</p>
                    )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary">{product.texture}</Badge>
                    <Badge variant="secondary">{product.usage}</Badge>
                    <Badge variant="secondary">
                        {product.plating} покрытие
                    </Badge>
                    <Badge variant="secondary">сверху: {product.invoice}</Badge>
                </div>
                <Button
                    asChild
                    className="h-[50px] w-full text-lg leading-4 font-normal"
                >
                    <Link
                        onClick={onClick}
                        href={`/product/${product.article}`}
                    >
                        Посмотреть
                    </Link>
                </Button>
            </div>
        </div>
    );
};
