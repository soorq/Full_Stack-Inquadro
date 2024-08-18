import { Button } from '~&/src/shared/ui/button';
import { Heart } from 'lucide-react';

export const FavoriteAdd = () => {
    return (
        <Button className="size-12 p-1 group hover:bg-red-100 bg-transparent shadow-none">
            <Heart className="group-hover:fill-red-400 group-hover:stroke-red-400 stroke-black" />
        </Button>
    );
};
