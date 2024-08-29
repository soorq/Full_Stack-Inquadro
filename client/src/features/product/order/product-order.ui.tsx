import { Minus, Plus, ShoppingCart } from '@phosphor-icons/react/dist/ssr';
import { FavoriteWidget } from '~&/src/features/favorite-widget';
import type { ProductOrderProps } from './product-order.types';
import { NOT_IMAGE } from '~&/src/shared/contants/gateway';
import { Button } from '~&/src/shared/ui/button';
import { cn } from '~&/src/shared/lib/tw-merge';
import { Badge } from '~&/src/shared/ui/badge';
import { Input } from '~&/src/shared/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const properties = ['size', 'shade', 'usage'] as const;

export const ProductOrder = ({
    totalTileArea,
    onQtyChange,
    className,
    totalCost,
    isInCart,
    product,
    context,
    qty,
    ...other
}: ProductOrderProps) => (
    <div
        className={cn(
            'flex gap-2.5 sm:gap-5 w-full md:w-2/3 lg:w-full h-auto px-0 sm:p-4',
            className
        )}
    >
        <div className="relative w-full shrink-0 h-auto md:h-svh max-w-[130px] xs:max-w-[150px] md:max-w-[170px] md:max-h-[230px]">
            <Image
                className={cn("rounded-[10px] object-cover", product?.images ? 'border border-secondary shadow-lg shadow-secondary' : '')}
                blurDataURL={product.images?.[0] || NOT_IMAGE}
                sizes="(max-width: 170px) 100vw, 170px"
                src={product.images?.[0] || NOT_IMAGE}
                alt={product.name}
                loading='lazy'
                fill
            />

            <div className="absolute top-1.5 right-1.5">
                <FavoriteWidget product={product} qty={qty} />
            </div>

            <div className="absolute bottom-1.5 flex flex-col gap-1 left-1.5">
                <Badge variant="mobile">{product.kit} шт.</Badge>
                <Badge variant="mobile" className="sm:hidden">
                    {product.availability}
                </Badge>
            </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
            <div className="bg-secondary p-2.5 rounded-[10px]">
                <div className="flex justify-between">
                    <p className="text-xs sm:text-sm text-black/50">
                        {product.category}
                    </p>
                    <p className="text-sm text-black/50 hidden md:block">
                        {product.availability}
                    </p>
                </div>
                <h4 className="text-sm md:text-xl">{product.name}</h4>
            </div>

            <div className="flex flex-wrap gap-0.5 sm:gap-1.5">
                {properties.map(prop => (
                    <Badge key={prop} variant="order">
                        {product[prop]}
                    </Badge>
                ))}
            </div>

            <div className="w-full h-full">
                <div className="flex gap-1.5 items-center mb-2 shrink-0">
                    <InfoBlock value={+totalCost.toFixed(2)} unit="руб." />
                    <InfoBlock value={+totalTileArea.toFixed(3)} unit="м²" />
                </div>

                <div className="flex md:flex-row flex-col gap-1.5 w-full h-auto">
                    {(context === 'confirm' || isInCart) && (
                        <div className="flex gap-2.5">
                            <div className="flex gap-1.5">
                                <Button
                                    onClick={() => onQtyChange(qty - 1)}
                                    disabled={qty <= 1}
                                    className="size-10 sm:size-[50px] "
                                >
                                    <Minus weight="regular" />
                                </Button>
                                <Input
                                    className="size-10 sm:size-[50px] px-1 text-center text-base sm:text-lg bg-secondary"
                                    onChange={e =>
                                        onQtyChange(Number(e.target.value))
                                    }
                                    value={qty}
                                    max={99}
                                    min={1}
                                />
                                <Button
                                    onClick={() => onQtyChange(qty + 1)}
                                    disabled={qty >= 99}
                                    className="size-10 sm:size-[50px]"
                                >
                                    <Plus weight="regular" />
                                </Button>
                            </div>
                            {context === 'favorites' &&
                                'onAddToCart' in other && (
                                    <Button
                                        onClick={other.onAddToCart}
                                        className="w-full md:hidden h-10 sm:h-[50px]"
                                    >
                                        {isInCart ? (
                                            <ShoppingCart className="size-5" />
                                        ) : (
                                            'Добавить в корзину'
                                        )}
                                    </Button>
                                )}

                            {context === 'cart' && 'href' in other && (
                                <Button
                                    className="w-full md:hidden h-10 sm:h-[50px]"
                                    asChild
                                >
                                    <Link href={other.href}>
                                        <ShoppingCart />
                                    </Link>
                                </Button>
                            )}
                        </div>
                    )}

                    {context === 'favorites' && 'onAddToCart' in other && (
                        <Button
                            onClick={other.onAddToCart}
                            className="w-full h-10 hidden md:block sm:h-[50px]"
                        >
                            {isInCart ? 'В корзину' : 'Добавить в корзину'}
                        </Button>
                    )}

                    {context === 'cart' && 'href' in other && (
                        <Button
                            className="w-full h-10 hidden md:flex sm:h-[50px]"
                            asChild
                        >
                            <Link href={other.href}>Оформить заказ</Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const InfoBlock = ({ value, unit }: { value: number; unit: string }) => (
    <div className="h-10 sm:h-12 px-2.5 py-1.5 flex items-center gap-1 bg-secondary rounded-[10px]">
        <p className="text-sm sm:text-base md:text-lg">{value}</p>
        <p className="text-sm sm:text-base md:text-lg text-black/50">{unit}</p>
    </div>
);
