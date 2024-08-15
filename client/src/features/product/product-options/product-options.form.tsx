'use client';

import { Form, FormItem, FormField, FormControl } from '~&/src/shared/ui/form';
import { ToggleGroup, ToggleGroupItem } from '~&/src/shared/ui/toggle-group';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { createSchema } from './product-options.contract';
import { FavoriteAdd } from '~&/src/features/favorite';
import { zodResolver } from '@hookform/resolvers/zod';
import { CartAdd } from '~&/src/features/cart';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { ProductApi } from '~&/src/entities/product';
import { getDisplayValue } from '~&/src/entities/product/product.lib';

export const ProductOptionsForm = ({ product }: { product: ProductApi }) => {
    const size = getDisplayValue(product.size);
    const usage = getDisplayValue(product.usage);
    const shade = getDisplayValue(product.shade);
    const schema = createSchema({ usage, shade, size });

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onTouched',
        defaultValues: {
            size: '',
            shade: '',
            usage: ''
        }
    });

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = data => {};

    const onError = (errors: FieldValues) => {
        Object.values(errors).forEach((error: any) => {
            toast.error(error?.message || 'Произошла ошибка');
        });
    };

    if (!product) return null;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="flex flex-col gap-2.5"
            >
                <FormField
                    name="size"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="gap-1 bg-secondary p-4 md:w-full flex w-1/3 md:items-center flex-col md:flex-row rounded-xl">
                            <FormControl>
                                <ToggleGroup
                                    type="single"
                                    onValueChange={value => {
                                        // setSize(value);
                                        return field.onChange(value);
                                    }}
                                    value={field.value}
                                >
                                    {renderToggleItems(product.size)}
                                </ToggleGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    name="usage"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="gap-1 bg-secondary p-4 md:w-full flex w-1/3 md:items-center flex-col md:flex-row rounded-xl">
                            <FormControl>
                                <ToggleGroup
                                    type="single"
                                    onValueChange={value => {
                                        // setSize(value);
                                        return field.onChange(value);
                                    }}
                                    value={field.value}
                                >
                                    {renderToggleItems(product.size)}
                                </ToggleGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="shade"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="gap-1 bg-secondary p-4 md:w-full flex w-1/3 md:items-center flex-col md:flex-row rounded-xl">
                            <FormControl>
                                <ToggleGroup
                                    type="single"
                                    onValueChange={value => {
                                        // setSize(value);
                                        return field.onChange(value);
                                    }}
                                    value={field.value}
                                >
                                    {renderToggleItems(product.size)}
                                </ToggleGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="py-2.5 w-full h-full">
                    <div className="flex gap-1.5 items-center mb-1.5">
                        <div className="h-12 w-fit px-2.5 py-1.5 gap-1 flex items-center bg-secondary rounded-xl">
                            <p className="text-lg">752</p>
                            <p className="text-lg text-black/50">руб.</p>
                        </div>

                        <div className="h-12 w-fit px-2.5 py-1.5 gap-1 flex items-center bg-secondary rounded-xl">
                            <p className="text-lg">0.687</p>
                            <p className="text-lg text-black/50">м²</p>
                        </div>
                    </div>

                    <div className="flex gap-3.5">
                        <CartAdd
                            product={{
                                article: '',
                                usage: '',
                                shade: '',
                                name: '',
                                availability: '',
                                category: '',
                                country: '',
                                createdAt: '',
                                texture: '',
                                image: '',
                                kit: '',
                                size: '',
                                invoice: '',
                                plating: '',
                                price: '',
                                slug: '',
                                manufacturing: '',
                                updatedAt: ''
                            }}
                        />
                        <FavoriteAdd />
                    </div>
                </div>
            </form>
        </Form>
    );
};

const renderToggleItems = (
    items: string | null | { id: number; value: string }[]
) => {
    if (!items) {
        return null;
    }

    if (typeof items === 'string') {
        return (
            <ToggleGroupItem value={items} key={items}>
                {items}
            </ToggleGroupItem>
        );
    }

    return items.map(item => (
        <ToggleGroupItem
            value={item.value}
            key={item.value}
            aria-label={`Кнопка - ${item.value}`}
        >
            {item.value}
        </ToggleGroupItem>
    ));
};
