import type { TypeSmallProduct } from '~&/src/entities/product';
import { ProductSearchDto } from '~&/src/shared/api/api.types';
import { Button } from '~&/src/shared/ui/button';
import { Badge } from '~&/src/shared/ui/badge';
import {
    ProductDetails,
    ProductInfo,
    ProductOptions,
    ProductSlider
} from '~&/src/features/product';
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
                            className="bg-secondary/50 shadow-none text-white h-12 px-5 py-2 text-base rounded-xl"
                        >
                            <Link href={`/product/${product.id}`}>
                                Посмотреть
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-secondary p-2.5 w-full h-auto rounded-b-xl">
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
                            Керамическая плитка
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

export const ProductLarge = ({ slides }: { slides: string[] }) => {
    return (
        <div className="lg:flex-row flex flex-col lg:justify-between container xl:gap-5 mb-10 lg:mb-0">
            <ProductSlider slides={slides} />
            <div className="flex flex-col gap-2.5 w-full">
                <ProductOptions />
                <ProductInfo />
                <ProductDetails />
            </div>
        </div>
    );
};

export const ProductSearch = ({
    product,
    onClick
}: {
    product: ProductSearchDto;
    onClick: () => void;
}) => {
    return (
        <div className="flex gap-5 p-4 w-full h-auto">
            <div className="relative shrink-0 w-full h-svh max-w-[170px] max-h-[230px]">
                <Image
                    src="/product/main.png"
                    className="rounded-xl"
                    alt={product.name}
                    fill
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <div className="bg-secondary p-2.5 rounded-xl">
                    <div className="flex justify-between [&>p]:text-sm [&>p]:text-black/50 [&>p]:leading-4">
                        <p>{product.category}</p>
                        <p>{product.availability}</p>
                    </div>
                    <h4 className="text-xl leading-5">{product.name}</h4>
                </div>
                <div className="flex justify-between items-center bg-secondary p-2.5 rounded-xl">
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

export const ProductOrder = ({ product }: { product?: ProductSearchDto }) => {
    return (
        <div className="flex gap-5 p-4 w-auto h-auto">
            <div className="relative shrink-0 w-full h-svh max-w-[170px] max-h-[230px]">
                <Image
                    src="/product/main.png"
                    className="rounded-xl"
                    alt="name"
                    fill
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <div className="bg-secondary p-2.5 rounded-xl">
                    <div className="flex justify-between [&>p]:text-sm [&>p]:text-black/50 [&>p]:leading-4">
                        <p>Керамическая плитка</p>
                        <p>в наличии</p>
                    </div>
                    <h4 className="text-xl leading-5">Avalanche</h4>
                </div>
                <div className="flex justify-between items-center bg-secondary p-2.5 rounded-xl">
                    <p className="text-lg leading-5">1024 рублей за м²</p>
                    {product?.slug && (
                        <p className="text-lg leading-5">{product.slug}</p>
                    )}
                </div>
                <Button
                    asChild
                    className="h-[50px] w-full text-lg leading-4 font-normal"
                >
                    <Link href={`/product/2313`}>Посмотреть</Link>
                </Button>
            </div>
        </div>
    );
};
