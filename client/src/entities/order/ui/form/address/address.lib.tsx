import { REGIONS } from '~&/src/shared/contants/cities';
import { CommandItem } from '~&/src/shared/ui/command';
import type { UseFormSetValue } from 'react-hook-form';
import type { Region } from './address.types';
import { useCallback, useMemo } from 'react';
import { OrderSchemaDto } from '../../../model';

export const useFindRegionLabel = (regions: Region[]) => {
    return useCallback(
        (value: string) => {
            for (const region of regions) {
                const city = region.cities.find(city => city.value === value);
                if (city) {
                    return `${city.name}, ${region.region}`;
                }
            }
            return;
        },
        [regions]
    );
};

export const useCachedRegions = (setValue: UseFormSetValue<OrderSchemaDto>) =>
    useMemo(() => {
        return REGIONS.flatMap((country, i) =>
            country.cities.map(city => {
                const key = `${country.region}-${i}-${city.value}-${city.name}-${Math.random()}`;

                return (
                    <CommandItem
                        key={key}
                        value={city.name}
                        className="cursor-pointer"
                        onSelect={() => setValue('city', city.value)}
                    >
                        {city.name}, {country.region}
                    </CommandItem>
                );
            })
        );
    }, [setValue]);
