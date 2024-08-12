import { Checkbox } from '~&/src/shared/ui/checkbox';
import { Label } from '~&/src/shared/ui/label';

export const FilterTexture = () => {
    return (
        <div className="bg-secondary py-5 px-4 gap-2.5 flex flex-col rounded-xl">
            <div className="flex items-center gap-2.5">
                <Checkbox value="mramor" id="mramor" />
                <Label htmlFor="mramor">под мрамор</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="wood" id="wood" />
                <Label htmlFor="wood">под дерево</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="beton" id="beton" />
                <Label htmlFor="beton">под бетон</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="iron" id="iron" />
                <Label htmlFor="iron">под жезело</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="camen" id="camen" />
                <Label htmlFor="camen">под камень</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="send" id="send" />
                <Label htmlFor="send">под песок</Label>
            </div>
        </div>
    );
};
