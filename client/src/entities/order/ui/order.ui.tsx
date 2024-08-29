'use client';

import { TypeDelieveryForm } from './form/type-delievery';
import { useOrderMutation } from '../api/order.mutation';
import { useSessionStore } from '~&/src/shared/session';
import { TotalOrder } from '~&/src/widgets/total-order';
import { OrderSchema, OrderSchemaDto } from '../index';
import { CardOrder } from '~&/src/widgets/card-order';
import { zodResolver } from '@hookform/resolvers/zod';
import { Conffeti } from '~&/src/shared/ui/conffeti';
import { useCartStore } from '~&/src/entities/cart';
import { PersonalForm } from './form/personal';
import { TypePayForm } from './form/type-pay';
import { AddressForm } from './form/address';
import { Form } from '~&/src/shared/ui/form';
import { useEffect, useState } from 'react';
import { PolicyForm } from './form/policy';
import toast from 'react-hot-toast';
import {
    type SubmitErrorHandler,
    type SubmitHandler,
    useForm
} from 'react-hook-form';

export const OrderMakingForm = () => {
    const { clearCart, getCartSummary } = useCartStore(state => state);
    const [isDisabling, setIsDisabling] = useState(false);
    const session = useSessionStore(state => state.session);

    const { mutate: createOrder, data, isSuccess } = useOrderMutation({
        onSuccess: data => {
            clearCart();
        }
    });

    const form = useForm<OrderSchemaDto>({
        resolver: zodResolver(OrderSchema),
        reValidateMode: 'onChange',
        disabled: isDisabling,
        defaultValues: {
            shipping_method: 'yourself',
            payment_method: 'cash',
            isPolicy: false
        }
    });

    useEffect(() => {
        if (form && session) {
            form.reset({
                name: session.name ?? '',
                phone: session.phone ?? '',
                email: session.email ?? ''
            });
        }
    }, [form, session]);

    const onSubmit: SubmitHandler<OrderSchemaDto> = async data => {
        const { isPolicy, ...dto } = data;
        if (isPolicy) {
            const { price, products, quantity } = getCartSummary();
            setIsDisabling(true);
            createOrder({
                ...dto,
                price,
                products,
                quantity,
                phone: dto.phone.replaceAll(' ', '')
            });
        }
    };

    const onError: SubmitErrorHandler<OrderSchemaDto> = async data => {
        toast.error(data.isPolicy?.message || 'Поле ознакомлен - обязательно');
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="space-y-1.5"
            >
                <PersonalForm control={form.control} />
                <AddressForm control={form.control} setValue={form.setValue} />
                <TypeDelieveryForm control={form.control} />
                <TypePayForm control={form.control} />
                {!isDisabling ? (
                    <>
                        <PolicyForm control={form.control} />
                        <TotalOrder isFormSubmit isDisable={isSuccess} />
                    </>
                ) : <div className="md:w-1/2 w-full"><CardOrder order_id='2024_di1' quantity={12} sqmetrs={123} total={134} /></div>}
            </form>

            <Conffeti isComplete={false} />
        </Form>
    );
};
