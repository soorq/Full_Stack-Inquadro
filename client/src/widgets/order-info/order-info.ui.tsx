import { Banknote, Truck } from 'lucide-react';
import { cn } from '~&/src/shared/lib/tw-merge';

export const OrderInfo = ({ withBg = true }: { withBg?: boolean }) => {
    return (
        <div
            className={cn(
                withBg ? 'bg-secondary rounded-[10px] px-4 py-2.5' : ''
            )}
        >
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
