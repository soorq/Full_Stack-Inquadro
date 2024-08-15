import { ProductOptionsForm } from './product-options.form';
import { ProductApi } from '~&/src/entities/product';
import { getDisplayValue } from '~&/src/entities/product/product.lib';

export const ProductOptions = ({ product }: { product: ProductApi }) => {
    return (
        <div className="w-full flex items-center gap-1.5 flex-col">
            <div className="bg-secondary w-full p-4 rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="text-base text-black/50 leading-5">
                        {getDisplayValue(product.category)}
                    </p>
                    <p className="text-base text-black/50 leading-5">
                        {getDisplayValue(product.availability)}
                    </p>
                </div>

                <h1 className="font-medium text-xl">{product.name}</h1>
            </div>

            <div className="bg-secondary p-4 w-full flex justify-between items-center rounded-xl">
                <h2 className="text-2xl">
                    {getDisplayValue(product.price)} за шт.
                </h2>
                <p className="">-70%</p>
            </div>

            <div className="md:flex-col flex gap-1.5 w-full">
                <ProductOptionsForm product={product} />
            </div>
        </div>
    );
};
