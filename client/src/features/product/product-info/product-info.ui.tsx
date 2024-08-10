import { Banknote, Truck } from 'lucide-react';

export const ProductInfo = () => {
    return (
        <div className="bg-secondary px-4 py-2.5 rounded-xl">
            <div className="mb-0.5 flex items-center gap-2.5">
                <Banknote className="size-5" />
                <span className="text-sm leading-4 text-black/50">
                    минимальная сумма заказа от 10000 руб.
                </span>
            </div>
            <div className="flex items-center gap-2.5">
                <Truck className="size-5" />
                <span className="text-sm leading-4 text-black/50">
                    бесплатная доставка заказа от 20000 руб.
                </span>
            </div>
        </div>
    );
};
