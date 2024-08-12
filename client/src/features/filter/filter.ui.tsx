import { FilterAvailable } from './filter-available';
import { FilterCategory } from './filter-category';
import { FilterWimages } from './filter-wimages';
import { FilterPlating } from './filter-plating';
import { FilterInvoice } from './filter-invoice';
import { FilterTexture } from './filter-texture';
import { FilterShade } from './filter-shade';
import { FilterPrice } from './filter-price';
import { FilterUsage } from './filter-usage';
import { FilterSize } from './filter-size';

export const Filter = () => {
    return (
        <aside className="flex-col flex w-1/4 gap-1.5">
            <FilterCategory />
            <FilterUsage />
            <FilterAvailable />
            <FilterPlating />
            <FilterInvoice />
            <FilterSize />
            <FilterTexture />
            <FilterShade />
            <FilterWimages />
            <FilterPrice />
        </aside>
    );
};
