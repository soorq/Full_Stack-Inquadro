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

export const TypeDelieveryForm = ({
    control
}: {
    control: Control<orderTypes.OrderSchemaDto>;
}) => {
    return (
        <div className="bg-secondary p-4 rounded-[10px]">
            <h3 className="text-base sm:text-lg leading-5 mb-4 font-medium">
                Выбрать способ доставки
            </h3>

            <FormField
                name="shipping_method"
                control={control}
                render={({ field, fieldState }) => (
                    <FormItem>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                            >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl className="shrink-0">
                                        <RadioGroupItem
                                            value="yourself"
                                            disabled={field.disabled}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        самостоятельный вывоз со склада
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl className="shrink-0">
                                        <RadioGroupItem
                                            value="courier"
                                            disabled={field.disabled}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        доставка до вашего адреса нашим
                                        транспортным средством
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>
    );
};
