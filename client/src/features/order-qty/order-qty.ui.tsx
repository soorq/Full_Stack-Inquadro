import type { OrderSpecifyQtyProps } from './order-qty.types';
import { Button } from '~&/src/shared/ui/button';
import { Input } from '~&/src/shared/ui/input';
import { Minus, Plus } from 'lucide-react';

export const OrderSpecifyQty = ({
    qty,
    context,
    onQtyChange,
    totalCost,
    totalTileArea,
    isInCart,
    ...actions
}: OrderSpecifyQtyProps) => (
    <div className="pt-2.5 w-full h-full">
        <div className="flex gap-1.5 items-center mb-2 shrink-0">
            <InfoBlock value={+totalCost.toFixed(2)} unit="руб." />
            <InfoBlock value={+totalTileArea.toFixed(3)} unit="м²" />
        </div>

        <div className="flex gap-1.5 w-full h-auto">
            {isInCart && (
                <div className="flex gap-1.5">
                    <Button
                        onClick={() => onQtyChange(qty - 1)}
                        disabled={qty <= 1}
                        className="size-[50px]"
                    >
                        <Minus />
                    </Button>
                    <Input
                        className="size-[50px] px-1 text-center text-lg bg-secondary"
                        onChange={e => onQtyChange(Number(e.target.value))}
                        value={qty}
                        max={99}
                        min={1}
                    />
                    <Button
                        onClick={() => onQtyChange(qty + 1)}
                        disabled={qty >= 99}
                        className="size-[50px]"
                    >
                        <Plus />
                    </Button>
                </div>
            )}

            {context === 'favorites' && 'onAddToCart' in actions && (
                <Button
                    onClick={actions.onAddToCart}
                    className="w-full h-[50px]"
                >
                    {isInCart ? 'В корзину' : 'Добавить в корзину'}
                </Button>
            )}

            {context === 'cart' && 'onProceedToOrder' in actions && (
                <Button
                    onClick={actions.onProceedToOrder}
                    className="w-full h-[50px]"
                >
                    Оформить заказ
                </Button>
            )}
        </div>
    </div>
);

const InfoBlock = ({ value, unit }: { value: number; unit: string }) => (
    <div className="h-12 px-2.5 py-1.5 flex items-center gap-1 bg-secondary rounded-[10px]">
        <p className="text-lg">{value}</p>
        <p className="text-lg text-black/50">{unit}</p>
    </div>
);
