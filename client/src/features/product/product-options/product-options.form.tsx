'use client';
import { Form, FormItem, FormField, FormControl } from '~&/src/shared/ui/form';
import { ToggleGroup, ToggleGroupItem } from '~&/src/shared/ui/toggle-group';
import { createSchema } from './product-options.contract';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FavoriteAdd } from '~&/src/features/favorite';
import { zodResolver } from '@hookform/resolvers/zod';
import { CartAdd } from '~&/src/features/cart';
import { z } from 'zod';
import toast from 'react-hot-toast';

const sizes = [
    {
        label: '250x250',
        value: 'size-210'
    },
    {
        label: '418x418',
        value: 'size-418'
    },
    {
        label: '50x500',
        value: 'size-50'
    },
    {
        label: '250x500',
        value: 'size-250'
    },
    {
        label: '500x250',
        value: 'size-500'
    }
];

const usage = [
    {
        value: 'pano',
        label: 'панно'
    },
    {
        value: 'decor',
        label: 'декор'
    },
    {
        value: 'bord',
        label: 'бордюр'
    }
];

const shades = [
    {
        value: 'salat',
        label: 'Салатовый'
    },
    {
        value: 'white',
        label: 'Белый'
    }
];

export const ProductOptionsForm = () => {
    const schema = createSchema({ usage, shades, sizes });

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = data => {
        console.log(data, 'data from form');
    };

    const onError = (errors: FieldValues) => {
        Object.values(errors).forEach((error: any) => {
            toast.error(error?.message || 'Произошла ошибка');
        });
    };

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onTouched',
        defaultValues: {
            size: '',
            shade: '',
            usage: ''
        }
    });

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
                                    onValueChange={value =>
                                        field.onChange(value)
                                    }
                                    value={field.value}
                                >
                                    {sizes.map(btn => (
                                        <ToggleGroupItem
                                            value={btn.value}
                                            key={btn.value}
                                            aria-label={`Кнопка размеров - ${btn.label}`}
                                        >
                                            {btn.label}
                                        </ToggleGroupItem>
                                    ))}
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
                                    onValueChange={value =>
                                        field.onChange(value)
                                    }
                                    value={field.value}
                                >
                                    {usage.map(usag => (
                                        <ToggleGroupItem
                                            value={usag.value}
                                            key={usag.value}
                                            aria-label={`Кнопка размеров - ${usag.label}`}
                                        >
                                            {usag.label}
                                        </ToggleGroupItem>
                                    ))}
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
                                    onValueChange={value =>
                                        field.onChange(value)
                                    }
                                    value={field.value}
                                >
                                    {shades.map(shade => (
                                        <ToggleGroupItem
                                            value={shade.value}
                                            key={shade.value}
                                            aria-label={`Кнопка размеров - ${shade.label}`}
                                        >
                                            {shade.label}
                                        </ToggleGroupItem>
                                    ))}
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
                                id: '',
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
