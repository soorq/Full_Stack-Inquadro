import { useCachedRegions, useFindRegionLabel } from './address.lib';
import type { Control, UseFormSetValue } from 'react-hook-form';
import { REGIONS } from '~&/src/shared/contants/cities';
import type { OrderSchemaDto } from '../../../model';
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
    control: Control<OrderSchemaDto>;
    setValue: UseFormSetValue<OrderSchemaDto>;
}) => {
    const [isListVisible, setListVisible] = useState(false);
    const CACHED_REGIONS = useCachedRegions(setValue, setListVisible);
    const search = useRef(null);
    const find = useFindRegionLabel(REGIONS);

    useClickAway(search, () => {
        setListVisible(false);
    });

    return (
        <div className="bg-secondary p-4 rounded-[10px]">
            <h3 className="text-base sm:text-lg leading-5 mb-2.5 font-medium">
                Выбрать адрес доставки
            </h3>

            <div className="space-y-2">
                <FormField
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => {
                        return (
                            <FormItem className="space-y-1">
                                <div className="grid grid-cols-[1fr,1fr] sm:grid-cols-[150px_150px] items-center lg:grid-cols-[212.5px_212.5px]">
                                    <FormLabel className="sm:mb-1.5 text-sm w-full sm:text-base">
                                        Населенный пункт
                                    </FormLabel>
                                    {fieldState.error && (
                                        <FormMessage className="text-xs w-full block text-right text-red-500">
                                            {fieldState.error.message}
                                        </FormMessage>
                                    )}
                                </div>
                                <FormControl className="grid grid-cols-1 sm:grid-cols-[300px_1fr] lg:grid-cols-[425px_1fr_1fr] gap-2 sm:gap-4">
                                    <Command
                                        className="grid grid-cols-1 sm:grid-cols-[300px_1fr] lg:grid-cols-[425px,1fr] gap-2 sm:gap-4"
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
                                        <div className="col-span-1 relative w-full transition-all h-auto sm:h-0">
                                            <CommandList
                                                className={cn(
                                                    'sm:absolute block w-full ease-in-out transition-opacity delay-500 custom-scroll',
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
                        <FormItem className="col-span-3 grid sm:grid-cols-[300px] lg:grid-cols-[420px] space-y-1">
                            <div className="grid grid-cols-[1fr,1fr] sm:grid-cols-[150px_150px] items-center lg:grid-cols-[212.5px_212.5px]">
                                <FormLabel className="sm:mb-1.5 text-sm sm:text-base">
                                    Улица и дом
                                </FormLabel>

                                <FormMessage className="text-xs text-red-500 text-right">
                                    {fieldState.error?.message}
                                </FormMessage>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[300px_1fr] lg:grid-cols-[425px_1fr_1fr] gap-4">
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Кремлевская площадь, 1"
                                    />
                                </FormControl>

                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    name="entrance"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormItem className="space-y-1">
                            <div className="flex sm:block items-center justify-between">
                                <FormLabel className="sm:mb-1.5 text-sm sm:text-base">
                                    Подъезд{' '}
                                    <span className="text-black/50 text-xs md:text-sm">
                                        (если отсутствует, пропустите строку)
                                    </span>
                                </FormLabel>
                                {fieldState.error && (
                                    <FormMessage className="text-xs block sm:hidden text-red-500">
                                        {fieldState.error.message}
                                    </FormMessage>
                                )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-[300px_1fr] lg:grid-cols-[425px_1fr_1fr] gap-4">
                                <FormControl>
                                    <Input {...field} placeholder="1" />
                                </FormControl>
                                {fieldState.error && (
                                    <FormMessage className="text-red-500 hidden sm:block">
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
