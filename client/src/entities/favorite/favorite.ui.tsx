import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from '~&/src/shared/ui/popover';
import { Button } from '~&/src/shared/ui/button';
import { Heart } from 'lucide-react';

export const FavoritePerview = () => {
    return (
        <div className="flex items-center gap-1">
            <p className="">2</p>
            <Popover>
                <PopoverTrigger asChild>
                    <Button size="icon" variant="ghost">
                        <Heart />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>1</PopoverContent>
            </Popover>
        </div>
    );
};
