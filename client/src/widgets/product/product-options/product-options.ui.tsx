import type { ProductClient } from '~&/src/entities/product';

export const ProductOptions = ({
    product
}: {
    product: ProductClient | null;
}) => {
    return (
        <div className="w-full flex items-center gap-1.5 flex-col">
            <div className="bg-secondary w-full p-4 rounded-[10px]">
                <div className="flex justify-between items-center">
                    <p className="text-base text-black/50 leading-5">
                        {product?.category}
                    </p>
                    <p className="text-base text-black/50 leading-5">
                        {product?.availability}
                    </p>
                </div>

                <h1 className="font-medium text-xl">{product?.name}</h1>
            </div>

            <div className="bg-secondary p-4 w-full flex justify-between items-center rounded-[10px]">
                <h2 className="text-2xl leading-6">
                    {Math.floor((product && product?.price) || 0)}
                    {' рублей за '}
                    {product?.kit ? (+product.kit === 1 ? 'шт.' : 'м²') : ''}
                </h2>
                {/* ##FIXTURE NEXT THE SALE */}
                {/*<p className="">-70%</p>*/}
            </div>
        </div>
    );
};
