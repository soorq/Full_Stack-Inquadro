'use client';

import { type orderTypes, orderContracts } from '~&/src/entities/order';
import { TypeDelieveryForm } from './order-form/type-delievery';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useSessionStore } from '~&/src/shared/session';
import { TotalOrder } from '~&/src/widgets/total-order';
import { zodResolver } from '@hookform/resolvers/zod';
import { Conffeti } from '~&/src/shared/ui/conffeti';
import { PersonalForm } from './order-form/personal';
import { useOrderMutation } from './order.mutation';
import { TypePayForm } from './order-form/type-pay';
import { AddressForm } from './order-form/address';
import { PolicyForm } from './order-form/policy';
import { Form } from '~&/src/shared/ui/form';
import { useEffect, useState } from 'react';

export const OrderMakingForm = () => {
    const [isDisabling, setIsDisabling] = useState(false);
    const session = useSessionStore(state => state.session);

    const { mutate: createOrder } = useOrderMutation({
        onSuccess: data => {}
    });

    const form = useForm<orderTypes.OrderSchemaDto>({
        resolver: zodResolver(orderContracts.OrderSchema),
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

    const onSubmit: SubmitHandler<orderTypes.OrderSchemaDto> = async data => {
        setIsDisabling(true);
        const { isPolicy, ...dto } = data;
        createOrder({ ...dto });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-1.5"
            >
                <PersonalForm control={form.control} />
                <AddressForm control={form.control} setValue={form.setValue} />
                <TypeDelieveryForm control={form.control} />
                <TypePayForm control={form.control} />
                <PolicyForm control={form.control} />
                <TotalOrder isFormSubmit total={'432'} />
            </form>

            <Conffeti isComplete={form.formState.isSubmitSuccessful} />
        </Form>
    );
};
