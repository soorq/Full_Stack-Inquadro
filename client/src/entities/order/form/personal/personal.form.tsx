import type { orderT } from '~&/src/shared/api/order';
import type { FormProps } from 'react-hook-form';
import { Input } from '~&/src/shared/ui/input';
import { InputMask } from '@react-input/mask';
import {
    FormMessage,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '~&/src/shared/ui/form';

function PersonalForm({ form }: { form: FormProps<orderT.OrderForm> }) {
    return (
        <div className="bg-secondary p-4 rounded-[10px]">
            <h3 className="text-base sm:text-lg leading-5 mb-2.5 font-medium">
                Мои данные
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-[300px_1fr] lg:grid-cols-[425px_1fr_1fr] gap-4">
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <FormItem className="col-span-3 grid sm:grid-cols-[300px] lg:grid-cols-[420px] space-y-1">
                            <div className="grid grid-cols-[1fr,1fr] sm:grid-cols-[150px_150px] items-center lg:grid-cols-[212.5px_212.5px]">
                                <FormLabel className="sm:mb-1.5 text-sm sm:text-base">
                                    Имя
                                </FormLabel>
                                <FormMessage className="text-xs text-red-500 text-right">
                                    {fieldState.error?.message}
                                </FormMessage>
                            </div>
                            <FormControl>
                                <Input {...field} placeholder="Александра" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <FormItem className="col-span-3 grid sm:grid-cols-[300px] lg:grid-cols-[420px] space-y-1">
                            <div className="grid grid-cols-[1fr,1fr] sm:grid-cols-[150px_150px] items-center lg:grid-cols-[212.5px_212.5px]">
                                <FormLabel className="sm:mb-1.5 text-sm sm:text-base">
                                    Номер телефона
                                </FormLabel>
                                <FormMessage className="text-xs text-red-500 text-right">
                                    {fieldState.error?.message}
                                </FormMessage>
                            </div>
                            <FormControl>
                                <InputMask
                                    className="flex h-[50px] items-center w-full rounded-[10px] bg-white px-4 py-1 text-base transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="+7 999 999 99 99"
                                    replacement={{ _: /\d/ }}
                                    mask="+7 ___ ___ __ __"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <FormItem className="col-span-3 grid sm:grid-cols-[300px] lg:grid-cols-[420px] space-y-1">
                            <div className="grid grid-cols-[1fr,1fr] sm:grid-cols-[150px_150px] items-center lg:grid-cols-[212.5px_212.5px]">
                                <FormLabel className="sm:mb-1.5 text-sm sm:text-base">
                                    Электронная почта
                                </FormLabel>
                                <FormMessage className="text-xs text-red-500 text-right">
                                    {fieldState.error?.message}
                                </FormMessage>
                            </div>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="email@icloud.com"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}

export { PersonalForm };
