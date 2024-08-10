import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from '~&/src/shared/ui/popover';
import { Button } from '~&/src/shared/ui/button';
import { ShoppingCart } from 'lucide-react';

export const CartPerview = () => {
    return (
        <div className="flex items-center gap-1">
            <p className="">2</p>
            <Popover modal>
                <PopoverTrigger asChild>
                    <Button size="icon" variant="ghost">
                        <ShoppingCart />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>1</PopoverContent>
            </Popover>
        </div>
    );
};
