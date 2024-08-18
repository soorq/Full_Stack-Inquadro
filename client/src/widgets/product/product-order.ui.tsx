import type { ProductClient } from '~&/src/entities/product';
import { SpecifyQty } from '~&/src/features/qty';
import { Button } from '~&/src/shared/ui/button';
import { cn } from '~&/src/shared/lib/tw-merge';
import { Badge } from '~&/src/shared/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const ProductOrder = ({
    isFavorite,
    product,
    isCart
}: {
    product: ProductClient;
    isFavorite?: boolean;
    isCart?: boolean;
}) => {
    return (
        <div
            className={cn(
                'flex gap-5 w-auto h-auto',
                isFavorite || isCart ? 'p-4' : 'mt-6 mb-10 max-w-[580px] w-full'
            )}
        >
            <div className="relative shrink-0 w-full h-svh max-w-[170px] max-h-[230px]">
                <Image
                    src="/product/main.png"
                    className="rounded-[10px]"
                    alt="name"
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
                <div className="flex flex-wrap gap-1.5">
                    <Badge variant="order">{product.size}</Badge>
                    <Badge variant="order">{product.shade}</Badge>
                </div>
                {isFavorite ||
                    (isCart && (
                        <Button
                            asChild
                            className="h-[50px] w-full text-lg leading-4 font-normal"
                        >
                            <Link href={`/order/podtverzhdenie-zakaza`}>
                                {isFavorite
                                    ? 'В коризну'
                                    : isCart
                                      ? 'Оформить'
                                      : ''}
                            </Link>
                        </Button>
                    ))}
            </div>
        </div>
    );
};
