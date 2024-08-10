import { CartAdd } from '~&/src/features/cart';
import { FavoriteAdd } from '~&/src/features/favorite';

const sizes = ['250x250', '418x418', '52x500', '250x500', '500x250'];

export const ProductOperation = () => {
    return (
        <div className="py-2.5 w-full h-full">
            <div className="flex gap-1.5 items-center mb-1.5">
                <div className="h-12 w-fit px-2.5 py-1.5 gap-1 flex items-center bg-secondary rounded-xl">
                    <p className="text-lg">752</p>
                    <p className="text-lg text-black/50">руб.</p>
                </div>

                <div className="h-12 w-fit px-2.5 py-1.5 gap-1 flex items-center bg-secondary rounded-xl">
                    <p className="text-lg">0.687</p>
                    <p className="text-lg text-black/50">м²</p>
                </div>
            </div>

            <div className="flex gap-3.5">
                <CartAdd />
                <FavoriteAdd />
            </div>
        </div>
    );
};
