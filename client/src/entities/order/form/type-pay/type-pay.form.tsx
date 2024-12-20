import { RadioGroup, RadioGroupItem } from '~&/src/shared/ui/radio-group';
import type { orderT } from '~&/src/shared/api/order';
import { Control } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '~&/src/shared/ui/form';

function TypePayForm({ control }: { control: Control<orderT.OrderForm> }) {
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
                                                withIndicator
                                                value="денежными средствами при получении"
                                                disabled={field.disabled}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer">
                                            денежными средствами при получении
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl className="shrink-0">
                                            <RadioGroupItem
                                                withIndicator
                                                value="платёжным поручением от компании"
                                                disabled={field.disabled}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer">
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
}

export { TypePayForm };
