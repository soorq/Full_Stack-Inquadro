'use client';

import { type SubmitHandler, useForm } from 'react-hook-form';
import { orderC, orderT } from '~&/src/shared/api/order';
import { useSessionStore } from '~&/src/shared/session';
import { TotalOrder } from '~&/src/widgets/total-order';
import { CardOrder } from '~&/src/widgets/card-order';
import { zodResolver } from '@hookform/resolvers/zod';
import { Conffeti } from '~&/src/shared/ui/conffeti';
import { useOrderMutation } from './order.mutation';
import { useCartStore } from '~&/src/entities/cart';
import { Form } from '~&/src/shared/ui/form';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

import {
    AddressForm,
    PersonalForm,
    PolicyForm,
    TypeDelieveryForm,
    TypePayForm
} from './form';

export const OrderMakingForm = () => {
    const [isDisabling, setIsDisabling] = useState(false);
    const session = useSessionStore(state => state.session);
    const { clearCart, getCartSummary, products } = useCartStore(
        state => state
    );

    const {
        mutate: createOrder,
        isSuccess,
        data,
        status
    } = useOrderMutation({
        onSuccess: () => {
            setIsDisabling(true);
            toast.success('Успешно создан заказ!');
            clearCart();
        }
    });

    useEffect(() => {
        if (products.length === 0 && !isDisabling) {
            redirect('/catalog');
        }
    }, [products, isDisabling]);

    const form = useForm<orderT.OrderForm>({
        resolver: zodResolver(orderC.OrderFormSchema),
        reValidateMode: 'onChange',
        mode: 'onTouched',
        disabled: isDisabling,
        defaultValues: {
            shipping_method: 'самовывоз',
            payment_method: 'наличка',
            isPolicy: false
        }
    });

    useEffect(() => {
        if (form && session) {
            form.reset({
                name: session.name ?? undefined,
                phone: session.phone ?? undefined,
                email: session.email ?? undefined
            });
        }
    }, [form, session]);

    const onSubmit: SubmitHandler<orderT.OrderForm> = async data => {
        const { isPolicy, ...dto } = data;
        if (isPolicy) {
            const { price, products, quantity, sqmetrs } = getCartSummary();
            createOrder({
                ...dto,
                price: Math.floor(price),
                area: Math.floor(sqmetrs),
                name: dto.name ?? '',
                email: dto.email ?? '',
                products,
                quantity: Math.floor(quantity),
                phone: dto?.phone?.replaceAll(' ', '') || ''
            });
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-1.5"
            >
                <PersonalForm form={form} />
                <AddressForm control={form.control} setValue={form.setValue} />
                <TypeDelieveryForm control={form.control} />
                <TypePayForm control={form.control} />
                {!isDisabling ? (
                    <>
                        <PolicyForm control={form.control} />
                        <TotalOrder
                            isFormSubmit
                            isDisable={!form.getValues('isPolicy') || isSuccess}
                        />
                    </>
                ) : (
                    <div className="md:w-1/2 w-full">
                        <CardOrder
                            order_id={data?.data.order_id || ''}
                            quantity={data?.data.quantity || 0}
                            sqmetrs={data?.data.area || 0}
                            total={data?.data.price || 0}
                        />
                    </div>
                )}
            </form>

            <Conffeti isComplete={status === 'success'} />
        </Form>
    );
};
