import { RadioGroup, RadioGroupItem } from '~&/src/shared/ui/radio-group';
import type { orderT } from '~&/src/shared/api/order';
import { Control } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '~&/src/shared/ui/form';

function TypeDelieveryForm({
    control
}: {
    control: Control<orderT.OrderForm>;
}) {
    return (
        <div className="bg-secondary p-4 rounded-[10px]">
            <h3 className="text-base sm:text-lg leading-5 mb-4 font-medium">
                Выбрать способ доставки
            </h3>

            <FormField
                name="shipping_method"
                control={control}
                render={({ field }) => (
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
                                            withIndicator
                                            value="самовывоз"
                                            disabled={field.disabled}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                        самостоятельный вывоз со склада
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl className="shrink-0">
                                        <RadioGroupItem
                                            withIndicator
                                            value="курьер"
                                            disabled={field.disabled}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
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
}

export { TypeDelieveryForm };
