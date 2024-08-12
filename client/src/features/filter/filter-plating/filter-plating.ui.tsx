import { Checkbox } from '~&/src/shared/ui/checkbox';
import { Label } from '~&/src/shared/ui/label';

export const FilterPlating = () => {
    return (
        <div className="bg-secondary py-5 px-4 gap-2.5 flex flex-col rounded-xl">
            <div className="flex items-center gap-2.5">
                <Checkbox value="matovoe" id="matovoe" />
                <Label htmlFor="matovoe">матовое покрытие</Label>
            </div>
            <div className="flex items-center gap-2.5">
                <Checkbox value="glynec" id="glynec" />
                <Label htmlFor="glynec">глянцевое покрытие</Label>
            </div>
        </div>
    );
};
