import { OrderInfo } from '~&/src/widgets/order-info';
import { Button } from '~&/src/shared/ui/button';
import { Input } from '~&/src/shared/ui/input';
import Link from 'next/link';

export const TotalOrder = ({
    total,
    isFormSubmit = false
}: {
    total: string;
    isFormSubmit?: boolean;
}) => {
    return (
        <div className="bg-secondary w-full h-auto rounded-[10px] p-4">
            <p className="text-lg leading-5">Итоговая сумма вашего заказа</p>
            <div className="flex gap-2.5 max-w-[550px] mt-3 mb-2.5">
                <Input
                    value={total + ' руб.'}
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
