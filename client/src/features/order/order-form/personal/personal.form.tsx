import type { orderTypes } from '~&/src/entities/order';
import type { Control } from 'react-hook-form';
import { Input } from '~&/src/shared/ui/input';
import { InputMask } from '@react-input/mask';
import {
    FormMessage,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '~&/src/shared/ui/form';

export const PersonalForm = ({
    control
}: {
    control: Control<orderTypes.OrderSchemaDto>;
}) => {
    return (
        <div className="bg-secondary p-4 rounded-[10px]">
            <h3 className="text-lg leading-5 mb-2.5 font-medium">Мои данные</h3>

            <div className="grid grid-cols-[425px_1fr_1fr] gap-4">
                <FormField
                    name="name"
                    control={control}
                    render={(
                        { field, fieldState } // Destructure fieldState to get error
                    ) => (
                        <>
                            <FormItem className="col-span-1 space-y-1">
                                <FormLabel className="mb-1.5">Имя</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Александра"
                                    />
                                </FormControl>
                            </FormItem>
                            <div className="col-span-2 self-end mb-3.5">
                                {fieldState.error && (
                                    <FormMessage className="text-red-500">
                                        {fieldState.error.message}
                                    </FormMessage>
                                )}
                            </div>
                        </>
                    )}
                />

                <FormField
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <FormItem className="col-span-1 space-y-1">
                                <FormLabel className="mb-1.5">
                                    Номер сотового телефона
                                </FormLabel>
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
                            <div className="col-span-2"></div>
                        </>
                    )}
                />

                <FormField
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <FormItem className="col-span-1 space-y-1">
                                <FormLabel className="mb-1.5">
                                    Электронная почта
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="youremail@icloud.com"
                                    />
                                </FormControl>
                            </FormItem>
                            <div className="col-span-2 self-end mb-3.5">
                                {fieldState.error && (
                                    <FormMessage className="text-red-500">
                                        {fieldState.error.message}
                                    </FormMessage>
                                )}
                            </div>
                        </>
                    )}
                />
            </div>
        </div>
    );
};
