import { Button } from '~&/src/shared/ui/button';
import { ProductOptionsForm } from '~&/src/features/product/product-options/product-options.form';

const sizes = [
    {
        label: '250x250',
        tooltip: 'размеры облицовочной плитки продажа коробками'
    },
    {
        label: '418x418',
        tooltip: 'размеры напольной плитки продажа коробками'
    },
    {
        label: '50x500',
        tooltip: 'размеры бордюрной плитки продажа коробками'
    },
    {
        label: '250x500',
        tooltip: 'размеры декоративной плитки продажа коробками'
    },
    {
        label: '500x250',
        tooltip: 'размеры панно продажа поштучно'
    }
];

export const ProductOptions = () => {
    return (
        <div className="w-full flex items-center gap-1.5 flex-col">
            <div className="bg-secondary w-full p-4 rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="text-base text-black/50 leading-5">
                        Керамическая плитка
                    </p>
                    <p className="text-base text-black/50 leading-5">
                        в наличии
                    </p>
                </div>

                <h1 className="font-medium text-xl">Ливадия</h1>
            </div>

            <div className="bg-secondary p-4 w-full flex justify-between items-center rounded-xl">
                <h2 className="text-2xl">575 рублей за шт.</h2>
                <p className="">-70%</p>
            </div>

            <div className="md:flex-col flex gap-1.5 w-full">
                <ProductOptionsForm />
            </div>
        </div>
    );
};
