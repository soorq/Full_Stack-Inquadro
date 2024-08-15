import { RadioGroup, RadioGroupItem } from '~&/src/shared/ui/radio-group';
import type { orderTypes } from '~&/src/entities/order';
import { Control } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '~&/src/shared/ui/form';
import Link from 'next/link';

export const PolicyForm = ({
    control
}: {
    control: Control<orderTypes.OrderSchemaDto>;
}) => {
    return (
        <div className="bg-secondary p-4 rounded-xl">
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
                                            value="true"
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal w-6/12 leading-4 text-base">
                                        я ознакомлен(-на) и полностью
                                        согласен(-на){' '}
                                        <Link
                                            href={'/policy'}
                                            className="text-blue-500 underline hover:text-blue-400"
                                        >
                                            с условиями доставки товара, с
                                            условиями публичной оферты и с
                                            условиями обработки персональных
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
};
