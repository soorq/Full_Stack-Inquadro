import { Banknote, Truck } from 'lucide-react';

export const ProductInfo = () => {
    return (
        <div className="bg-secondary px-4 py-2.5 rounded-xl">
            <div className="flex gap-2.5 mb-0.5 items-center">
                <Banknote className="size-5" />
                <span className="text-sm leading-4 text-black/50">
                    минимальная сумма заказа от 10000 руб.
                </span>
            </div>
            <div className="w-full flex gap-2.5 items-center">
                <Truck className="size-5" />
                <span className="text-sm leading-4 text-black/50">
                    бесплатная доставка заказа от 20000 руб.
                </span>
            </div>
        </div>
    );
};
