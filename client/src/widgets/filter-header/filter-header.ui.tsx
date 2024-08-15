import { Button } from '~&/src/shared/ui/button';
import { X } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '~&/src/shared/ui/select';
import { SelectGroup } from '@radix-ui/react-select';

export const FilterHeader = () => {
    return (
        <section className="flex justify-between gap-8 container py-5">
            <div className="w-1/4">1</div>
            <div className="grid grid-cols-[repeat(3,295px)] gap-x-5 grid-rows-1">
                <div className="col-span-1 col-start-1">
                    <Button className="gap-2 h-10 leading-5 rounded-xl font-[350]">
                        <span>сбросить фильтр</span>
                        <X className="size-5 stroke-1 self-center" />
                    </Button>
                </div>
                <div className="col-span-1 col-start-3 flex justify-end w-full">
                    <Select>
                        <SelectTrigger className="self-end w-[182px] gap-2.5">
                            <SelectValue placeholder="сортировать по" />
                        </SelectTrigger>
                        <SelectContent className="bg-primary text-white w-[--radix-popover-trigger-width] font-[350] border-none rounded-xl">
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
