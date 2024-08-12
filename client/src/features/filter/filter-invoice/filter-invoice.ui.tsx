import { Checkbox } from '~&/src/shared/ui/checkbox';
import { Label } from '~&/src/shared/ui/label';

export const FilterInvoice = () => {
    return (
        <div className="bg-secondary py-5 px-4 flex gap-2.5 flex-col rounded-xl">
            <div className="flex items-center gap-2.5">
                <Checkbox value="polirovka" id="polirovka" />
                <Label htmlFor="polirovka">сверху: полировка</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="glazur" id="glazur" />
                <Label htmlFor="glazur">сверху: глазурь</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="relef-easy" id="relef-easy" />
                <Label htmlFor="relef-easy">сверху: легкий рельеф</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="relef" id="relef" />
                <Label htmlFor="relef">сверху: рельеф</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="hard-relef" id="hard-relef" />
                <Label htmlFor="hard-relef">сверху: сильный рельеф</Label>
            </div>
        </div>
    );
};
