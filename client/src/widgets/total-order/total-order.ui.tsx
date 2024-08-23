'use client';

import { OrderInfo } from '~&/src/widgets/order-info';
import { Button } from '~&/src/shared/ui/button';
import { Input } from '~&/src/shared/ui/input';
import Link from 'next/link';
import { useCartStore } from '~&/src/entities/cart';

export const TotalOrder = ({
    isFormSubmit = false
}: {
    isFormSubmit?: boolean;
}) => {
    const { getTotalCount } = useCartStore(state => state);

    const totalPriceCart = getTotalCount();

    return (
        <div className="bg-secondary w-full h-auto rounded-[10px] p-4">
            <p className="text-lg leading-5">Итоговая сумма вашего заказа</p>
            <div className="flex flex-col sm:flex-row gap-2.5 max-w-[550px] mt-3 mb-2.5">
                <Input
                    value={totalPriceCart + ' руб.'}
                    disabled
                    className="border-none bg-white h-[50px] shadow-none py-2 px-4 text-base rounded-lg w-full disabled:opacity-100"
                />

                {isFormSubmit ? (
                    <Button className="w-full h-[50px] max-w-[300px] rounded-lg text-lg">
                        Оформить
                    </Button>
                ) : (
                    <Button
                        asChild
                        disabled={+totalPriceCart <= 0}
                        className="w-full h-[50px] max-w-[300px] rounded-lg text-lg"
                    >
                        <Link href={'/order/oformlenie-zakaza'}>
                            Подтвердить
                        </Link>
                    </Button>
                )}
            </div>

            <OrderInfo withBg={false} />
        </div>
    );
};
