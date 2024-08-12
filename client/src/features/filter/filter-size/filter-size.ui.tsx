import { ToggleGroup, ToggleGroupItem } from '~&/src/shared/ui/toggle-group';

export const FilterSize = () => {
    return (
        <ToggleGroup
            type="multiple"
            className="flex-wrap bg-secondary py-5 px-4 flex rounded-xl"
        >
            <ToggleGroupItem value="size-21">95х300</ToggleGroupItem>
            <ToggleGroupItem value="size-22">95х300</ToggleGroupItem>
            <ToggleGroupItem value="size-23">95х300</ToggleGroupItem>
            <ToggleGroupItem value="size-24">95х300</ToggleGroupItem>
            <ToggleGroupItem value="size-25">95х300</ToggleGroupItem>
            <ToggleGroupItem value="size-26">95х300</ToggleGroupItem>
            <ToggleGroupItem value="size-28">95х300</ToggleGroupItem>
            <ToggleGroupItem value="size-27">95х300</ToggleGroupItem>
        </ToggleGroup>
    );
};
