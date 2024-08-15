import { useCachedRegions, useFindRegionLabel } from './address.lib';
import type { Control, UseFormSetValue } from 'react-hook-form';
import type { orderTypes } from '~&/src/entities/order';
import { REGIONS } from '~&/src/shared/contants/cities';
import { cn } from '~&/src/shared/lib/tw-merge';
import { Input } from '~&/src/shared/ui/input';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import {
    FormControl,
    FormMessage,
    FormField,
    FormItem,
    FormLabel
} from '~&/src/shared/ui/form';
import {
    Command,
    CommandInput,
    CommandList,
    CommandGroup,
    CommandEmpty
} from '~&/src/shared/ui/command';

export const AddressForm = ({
    control,
    setValue
}: {
    control: Control<orderTypes.OrderSchemaDto>;
    setValue: UseFormSetValue<orderTypes.OrderSchemaDto>;
}) => {
    const [isListVisible, setListVisible] = useState(false);
    const CACHED_REGIONS = useCachedRegions(setValue);
    const search = useRef(null);
    const find = useFindRegionLabel(REGIONS);

    useClickAway(search, () => {
        setListVisible(false);
    });

    return (
        <div className="bg-secondary p-4 rounded-xl">
            <h3 className="text-lg leading-5 mb-2.5 font-medium">
                Выбрать адрес доставки
            </h3>

            <div className="space-y-2">
                <FormField
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => {
                        return (
                            <FormItem className="space-y-1">
                                <FormLabel className="mb-1.5">
                                    Населенный пункт
                                </FormLabel>
                                <FormControl className="grid grid-cols-[425px,1fr,1fr] gap-4">
                                    <Command
                                        className="grid grid-cols-[425px,1fr] gap-4"
                                        ref={search}
                                    >
                                        <CommandInput
                                            onClick={() => setListVisible(true)}
                                            placeholder="Москва, Московская область"
                                            onValueChange={field.onChange}
                                            className="col-span-1 w-full"
                                            value={find(field.value)}
                                            disabled={field.disabled}
                                        />
                                        <div className="col-span-1 relative w-full transition-all h-0">
                                            <CommandList
                                                className={cn(
                                                    'absolute w-full ease-in-out transition-opacity delay-500 custom-scroll',
                                                    isListVisible
                                                        ? 'h-svh py-1'
                                                        : 'h-0 py-0'
                                                )}
                                            >
                                                <CommandEmpty>
                                                    Ничего не найдено.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {CACHED_REGIONS}
                                                </CommandGroup>
                                            </CommandList>
                                        </div>
                                    </Command>
                                </FormControl>
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    name="address"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormItem className="space-y-1">
                            <FormLabel className="mb-1.5">
                                Улица и дом
                            </FormLabel>
                            <div className="grid grid-cols-[425px,1fr,1fr] gap-4 items-center">
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Кремлевская площадь, 1"
                                    />
                                </FormControl>
                                {fieldState.error && (
                                    <FormMessage className="text-red-500">
                                        {fieldState.error.message}
                                    </FormMessage>
                                )}
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    name="entrance"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormItem className="space-y-1">
                            <FormLabel className="mb-1.5">
                                Подъезд{' '}
                                <span className="text-black/50 text-sm">
                                    (если отсутствует, пропустите строку)
                                </span>
                            </FormLabel>
                            <div className="grid grid-cols-[425px,1fr,1fr] gap-4 items-center">
                                <FormControl>
                                    <Input {...field} placeholder="1" />
                                </FormControl>
                                {fieldState.error && (
                                    <FormMessage className="text-red-500">
                                        {fieldState.error.message}
                                    </FormMessage>
                                )}
                            </div>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};
