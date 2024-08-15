'use client';

import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '~&/src/shared/ui/form';
import { type InferedSchema, schema } from './promo-code.contract';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~&/src/shared/ui/button';
import { Input } from '~&/src/shared/ui/input';
import toast from 'react-hot-toast';

export const PromoCodeForm = () => {
    const form = useForm<InferedSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            promo: ''
        }
    });

    const onSubmit: SubmitHandler<InferedSchema> = data => {
        return toast.error('Такого промокода не существует!');
    };

    const onError = (errors: FieldValues) => {
        return toast.error('Some error');
    };

    return (
        <Form {...form}>
            <form
                className="max-w-[550px] flex gap-2.5 items-center"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    name="promo"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="inquadra10"
                                    className="border-none bg-white h-[50px] shadow-none py-2 px-4 text-base rounded-lg w-full"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full h-[50px] max-w-[300px] rounded-lg text-base font-normal"
                    disabled={
                        !form.formState.isValid || form.formState.isSubmitting
                    }
                >
                    Применить
                </Button>
            </form>
        </Form>
    );
};
