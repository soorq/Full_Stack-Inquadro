import { Button } from '~&/src/shared/ui/button';
import { Minus, Plus } from 'lucide-react';

export const CartDel = () => {
    return (
        <div className="">
            <div className="flex gap-1.5">
                <Button size="icon" disabled className="rounded-lg w-12 h-12">
                    <Minus />
                </Button>
                <div className="h-12 w-12 flex justify-center items-center bg-secondary rounded-lg">
                    <span>1</span>
                </div>
                <Button size="icon" className="rounded-lg h-12 w-12">
                    <Plus />
                </Button>
            </div>

            <Button>В корзине</Button>
        </div>
    );
};