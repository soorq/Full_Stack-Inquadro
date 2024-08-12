import { Checkbox } from '~&/src/shared/ui/checkbox';
import { Label } from '~&/src/shared/ui/label';

export const FilterAvailable = () => {
    return (
        <div className="bg-secondary py-5 px-4 gap-2.5 flex flex-col rounded-xl">
            <div className="flex items-center gap-2.5">
                <Checkbox value="stock" id="stock" />
                <Label htmlFor="stock">в наличии</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="delievery" id="delievery" />
                <Label htmlFor="delievery">под заказ</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="ogran" id="ogran" />
                <Label htmlFor="ogran">ограниченная коллекция</Label>
            </div>
        </div>
    );
};
