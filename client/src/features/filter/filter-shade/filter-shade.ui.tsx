import { Checkbox } from '~&/src/shared/ui/checkbox';
import { Label } from '~&/src/shared/ui/label';

export const FilterShade = () => {
    return (
        <div className="bg-secondary py-5 px-4 gap-2.5 flex flex-col rounded-xl">
            <div className="flex items-center gap-2.5">
                <Checkbox value="white" id="white" />
                <Label htmlFor="white">бежевый оттенок</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="lightwhite" id="lightwhite" />
                <Label htmlFor="lightwhite">светло-бежевый оттенок</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="whitea" id="whitea" />
                <Label htmlFor="whitea">белый оттенок</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="grafit" id="grafit" />
                <Label htmlFor="grafit">графитовый оттенок</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="lightgrafit" id="lightgrafit" />
                <Label htmlFor="lightgrafit">светло-графитовый оттенок</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="brown" id="brown" />
                <Label htmlFor="brown">коричневый оттенок</Label>
            </div>
        </div>
    );
};
