import { Checkbox } from '~&/src/shared/ui/checkbox';
import { Label } from '~&/src/shared/ui/label';

export const FilterWimages = () => {
    return (
        <div className="bg-secondary py-5 px-4 flex gap-2.5 flex-col rounded-xl">
            <div className="flex items-center gap-2.5">
                <Checkbox value="decor" id="decor" />
                <Label htmlFor="decor">показывать “с декором”</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="withoutdecor" id="withoutdecor" />
                <Label htmlFor="withoutdecor">не показывать “с декором”</Label>
            </div>
        </div>
    );
};
