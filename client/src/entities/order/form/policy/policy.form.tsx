import { RadioGroup, RadioGroupItem } from '~&/src/shared/ui/radio-group';
import type { orderT } from '~&/src/shared/api/order';
import { Control } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '~&/src/shared/ui/form';
import Link from 'next/link';

function PolicyForm({ control }: { control: Control<orderT.OrderForm> }) {
    return (
        <div className="bg-secondary p-4 rounded-[10px]">
            <FormField
                name="isPolicy"
                control={control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <RadioGroup
                                onValueChange={val =>
                                    field.onChange(val === 'true')
                                }
                                defaultValue={field.value ? 'true' : ''}
                            >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl className="shrink-0">
                                        <RadioGroupItem
                                            disabled={field.disabled}
                                            withIndicator
                                            value="true"
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal md:w-6/12 lg:w-9/12 leading-4 text-base cursor-pointer">
                                        я ознакомлен(-на) и полностью
                                        согласен(-на){' '}
                                        <Link
                                            href={'/delivery'}
                                            className="text-blue-500 underline hover:text-blue-400"
                                        >
                                            с условиями доставки товара
                                        </Link>
                                        ,{' '}
                                        <Link
                                            href="/offert"
                                            className="text-blue-500 underline hover:text-blue-400"
                                        >
                                            с условиями публичной оферты
                                        </Link>
                                        , <br />
                                        <Link
                                            href="/personal"
                                            className="text-blue-500 underline hover:text-blue-400"
                                        >
                                            с условиями обработки персональных
                                            данных
                                        </Link>
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

export { PolicyForm };
