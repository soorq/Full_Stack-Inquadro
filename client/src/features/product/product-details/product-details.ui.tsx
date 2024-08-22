import { ProductClient } from '~&/src/entities/product';
import { Dot } from 'lucide-react';

export const ProductDetails = ({
    product
}: {
    product: ProductClient | null;
}) => {
    if (!product) return null;

    return (
        <div className="bg-secondary px-4 py-2.5 rounded-[10px]">
            <ul className="flex flex-col w-auto h-auto">
                <li className="flex items-center gap-2.5">
                    <Dot className="size-5" />
                    <div className="[&>span]:leading-6 md:[&>span]:text-base [&>span]:text-sm">
                        <span className="text-black/50">артикул: </span>
                        <span>{product.article}</span>
                    </div>
                </li>
                <li className="flex items-center gap-2.5">
                    <Dot className="size-5" />
                    <div className="[&>span]:leading-6 md:[&>span]:text-base [&>span]:text-sm">
                        <span className="text-black/50">категория: </span>
                        <span>{product.category}</span>
                    </div>
                </li>
                <li className="flex items-center gap-2.5">
                    <Dot className="size-5" />
                    <div className="[&>span]:leading-6 md:[&>span]:text-base [&>span]:text-sm">
                        <span className="text-black/50">название: </span>
                        <span>{product.name}</span>
                    </div>
                </li>
                <li className="flex items-center gap-2.5">
                    <Dot className="size-5" />
                    <div className="[&>span]:leading-6 md:[&>span]:text-base [&>span]:text-sm">
                        <span className="text-black/50">наличие: </span>
                        <span>{product.availability}</span>
                    </div>
                </li>
                <li className="flex items-center gap-2.5">
                    <Dot className="size-5" />
                    <div className="[&>span]:leading-6 md:[&>span]:text-base [&>span]:text-sm">
                        <span className="text-black/50">применение: </span>
                        <span>{product.usage}</span>
                    </div>
                </li>
                <li className="flex items-center gap-2.5">
                    <Dot className="size-5" />
                    <div className="[&>span]:leading-6 md:[&>span]:text-base [&>span]:text-sm">
                        <span className="text-black/50">изображение: </span>
                        <span>{product?.images}</span>
                    </div>
                </li>
                <li className="flex items-center gap-2.5">
                    <Dot className="size-5" />
                    <div className="[&>span]:leading-6 md:[&>span]:text-base [&>span]:text-sm">
                        <span className="text-black/50">покрытие: </span>
                        <span>{product.plating}</span>
                    </div>
                </li>
                <li className="flex items-center gap-2.5">
                    <Dot className="size-5" />
                    <div className="[&>span]:leading-6 md:[&>span]:text-base [&>span]:text-sm">
                        <span className="text-black/50">текстура: </span>
                        <span>{product.texture}</span>
                    </div>
                </li>
                <li className="flex items-center gap-2.5">
                    <Dot className="size-5" />
                    <div className="[&>span]:leading-6 md:[&>span]:text-base [&>span]:text-sm">
                        <span className="text-black/50">фактура: </span>
                        <span>{product.invoice}</span>
                    </div>
                </li>
                <li className="flex items-center gap-2.5">
                    <Dot className="size-5" />
                    <div className="[&>span]:leading-6 md:[&>span]:text-base [&>span]:text-sm">
                        <span className="text-black/50">размер: </span>
                        <span>{product.size}</span>
                    </div>
                </li>
                <li className="flex items-center gap-2.5">
                    <Dot className="size-5" />
                    <div className="[&>span]:leading-6 md:[&>span]:text-base [&>span]:text-sm">
                        <span className="text-black/50">оттенок: </span>
                        <span>{product.shade}</span>
                    </div>
                </li>
                <li className="flex items-center gap-2.5">
                    <Dot className="size-5" />
                    <div className="[&>span]:leading-6 md:[&>span]:text-base [&>span]:text-sm">
                        <span className="text-black/50">цена: </span>
                        <span>{product.price}</span>
                    </div>
                </li>
                <li className="flex items-center gap-2.5">
                    <Dot className="size-5" />
                    <div className="[&>span]:leading-6 md:[&>span]:text-base [&>span]:text-sm">
                        <span className="text-black/50">продажа: </span>
                        <span>{product.manufacturing}</span>
                    </div>
                </li>
                <li className="flex items-center gap-2.5">
                    <Dot className="size-5" />
                    <div className="[&>span]:leading-6 md:[&>span]:text-base [&>span]:text-sm">
                        <span className="text-black/50">комплектация: </span>
                        <span>{product.kit}</span>
                    </div>
                </li>
                <li className="flex items-center gap-2.5">
                    <Dot className="size-5" />
                    <div className="[&>span]:leading-6 md:[&>span]:text-base [&>span]:text-sm">
                        <span className="text-black/50">
                            страна изготовления:{' '}
                        </span>
                        <span>{product.country}</span>
                    </div>
                </li>
            </ul>
        </div>
    );
};
