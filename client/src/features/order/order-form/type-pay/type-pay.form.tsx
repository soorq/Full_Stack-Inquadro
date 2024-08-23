import { RadioGroup, RadioGroupItem } from '~&/src/shared/ui/radio-group';
import type { orderTypes } from '~&/src/entities/order';
import { Control } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '~&/src/shared/ui/form';

export const TypePayForm = ({
    control
}: {
    control: Control<orderTypes.OrderSchemaDto>;
}) => {
    return (
        <div className="bg-secondary p-4 rounded-[10px]">
            <h3 className="text-base sm:text-lg leading-5 mb-4 font-medium">
                Выбрать способ оплаты
            </h3>

            <FormField
                name="payment_method"
                control={control}
                render={({ field, fieldState }) => (
                    <>
                        <FormItem className="col-span-1">
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl className="shrink-0">
                                            <RadioGroupItem
                                                value="cash"
                                                disabled={field.disabled}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            денежными средствами при получении
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl className="shrink-0">
                                            <RadioGroupItem
                                                value="payment"
                                                disabled={field.disabled}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            платёжным поручением от компании
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                        <div className="col-span-2 self-center">
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
    );
};
