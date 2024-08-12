import { Slider } from '~&/src/shared/ui/slider';

export const FilterPrice = () => {
    return (
        <div className="bg-secondary py-5 px-4 gap-2.5 flex flex-col rounded-xl">
            <Slider max={13900} min={0} step={1} minStepsBetweenThumbs={1} />
        </div>
    );
};
