import { Checkbox } from '~&/src/shared/ui/checkbox';
import { Label } from '~&/src/shared/ui/label';

export const FilterUsage = () => {
    return (
        <div className="bg-secondary py-5 px-4 gap-2.5 flex flex-col rounded-xl">
            <div className="flex items-center gap-2.5">
                <Checkbox value="oblicov" id="oblicov" />
                <Label htmlFor="oblicov">облицовочная плитка</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="napol" id="napol" />
                <Label htmlFor="napol">напольная плитка</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="bord" id="bord" />
                <Label htmlFor="bord">бордюр</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="panno" id="panno" />
                <Label htmlFor="panno">панно</Label>
            </div>
        </div>
    );
};
