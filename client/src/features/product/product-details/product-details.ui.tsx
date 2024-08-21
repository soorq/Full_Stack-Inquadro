import { ProductClient } from '~&/src/entities/product';

export const ProductDetails = ({
    product
}: {
    product: ProductClient | null;
}) => {
    if (!product) return null;

    return (
        <div className="bg-secondary px-4 py-2.5 rounded-[10px]">
            <ul className="flex flex-col w-auto h-auto">
                <li className="[&>span]:text-base [&>span]:leading-6">
                    <span className="text-black/50">артикул: </span>
                    <span>{product.article}</span>
                </li>
                <li className="[&>span]:text-base [&>span]:leading-6">
                    <span className="text-black/50">категория: </span>
                    <span>{product.category}</span>
                </li>
                <li className="[&>span]:text-base [&>span]:leading-6">
                    <span className="text-black/50">название: </span>
                    <span>{product.name}</span>
                </li>
                <li className="[&>span]:text-base [&>span]:leading-6">
                    <span className="text-black/50">наличие: </span>
                    <span>{product.availability}</span>
                </li>
                <li className="[&>span]:text-base [&>span]:leading-6">
                    <span className="text-black/50">применение: </span>
                    <span>{product.usage}</span>
                </li>
                <li className="[&>span]:text-base [&>span]:leading-6">
                    <span className="text-black/50">изображение: </span>
                    <span>{product?.images}</span>
                </li>
                <li className="[&>span]:text-base [&>span]:leading-6">
                    <span className="text-black/50">покрытие: </span>
                    <span>{product.plating}</span>
                </li>
                <li className="[&>span]:text-base [&>span]:leading-6">
                    <span className="text-black/50">текстура: </span>
                    <span>{product.texture}</span>
                </li>
                <li className="[&>span]:text-base [&>span]:leading-6">
                    <span className="text-black/50">фактура: </span>
                    <span>{product.invoice}</span>
                </li>
                <li className="[&>span]:text-base [&>span]:leading-6">
                    <span className="text-black/50">размер: </span>
                    <span>{product.size}</span>
                </li>
                <li className="[&>span]:text-base [&>span]:leading-6">
                    <span className="text-black/50">оттенок: </span>
                    <span>{product.shade}</span>
                </li>
                <li className="[&>span]:text-base [&>span]:leading-6">
                    <span className="text-black/50">цена: </span>
                    <span>{product.price}</span>
                </li>
                <li className="[&>span]:text-base [&>span]:leading-6">
                    <span className="text-black/50">продажа: </span>
                    <span>{product.manufacturing}</span>
                </li>
                <li className="[&>span]:text-base [&>span]:leading-6">
                    <span className="text-black/50">комплектация: </span>
                    <span>{product.kit}</span>
                </li>
                <li className="[&>span]:text-base [&>span]:leading-6">
                    <span className="text-black/50">страна изготовления: </span>
                    <span>{product.country}</span>
                </li>
            </ul>
        </div>
    );
};
