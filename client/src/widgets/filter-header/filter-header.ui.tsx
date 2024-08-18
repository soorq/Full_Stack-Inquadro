'use client';
import { Button } from '~&/src/shared/ui/button';
import { X } from 'lucide-react';
import {
    SelectContent,
    SelectTrigger,
    SelectGroup,
    SelectValue,
    SelectItem,
    Select
} from '~&/src/shared/ui/select';
import { useFiltersStore } from '~&/src/entities/filter';

export const FilterHeader = () => {
    const { hasActiveFilters, resetFilters } = useFiltersStore(state => state);

    const isActiveFilter = hasActiveFilters();

    return (
        <section className="grid grid-cols-[270px,1fr] gap-x-8 container py-5">
            <div className="w-1/4">1</div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(165px,295px))] gap-x-5 grid-rows-1">
                <div className="col-span-1 col-start-1">
                    {isActiveFilter && (
                        <Button
                            className="gap-2 h-10 leading-5 font-[350]"
                            onClick={() => resetFilters()}
                        >
                            <span>сбросить фильтр</span>
                            <X className="size-5 stroke-1 self-center" />
                        </Button>
                    )}
                </div>
                <div className="col-span-1 col-start-3 place-self-end w-full">
                    <Select>
                        <SelectTrigger className="self-end w-[182px] gap-2.5">
                            <SelectValue placeholder="сортировать по" />
                        </SelectTrigger>
                        <SelectContent className="bg-primary text-white w-[--radix-popover-trigger-width] font-[350] border-none">
                            <SelectGroup>
                                <SelectItem value="available">
                                    по доступным
                                </SelectItem>
                                <SelectItem value="premium">
                                    по премиальным
                                </SelectItem>
                                <SelectItem value="new">по новым</SelectItem>
                                <SelectItem value="populyarity">
                                    по популярным
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </section>
    );
};
