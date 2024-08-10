import { Button } from '~&/src/shared/ui/button';

const sizes = ['250x250', '418x418', '52x500', '250x500', '500x250'];

export const ProductOptions = () => {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="bg-secondary p-4 items-center rounded-xl">
                <div className="flex justify-between items-center">
                    <p className="text-base text-black/50 leading-5">
                        Керамическая плитка
                    </p>
                    <p className="text-base text-black/50 leading-5">
                        в наличии
                    </p>
                </div>
                <h1 className="font-medium text-xl">Ливадия</h1>
            </div>
            <div className="bg-secondary p-4 items-center rounded-xl">
                <h2 className="text-2xl">575 рублей за шт.</h2>
            </div>
            <div className="bg-secondary p-4 flex items-center gap-1 rounded-xl">
                {sizes.map(size => (
                    <Button
                        key={size}
                        className="h-9 rounded-xl"
                        variant="secondary"
                    >
                        {size}
                    </Button>
                ))}
            </div>
            <div className="bg-secondary p-4 flex items-center gap-1 rounded-xl">
                <Button className="h-9 rounded-xl" variant="default">
                    панно
                </Button>
            </div>
            <div className="bg-secondary p-4 flex items-center gap-1 rounded-xl">
                <Button className="h-9 rounded-xl" variant="default">
                    салатовый
                </Button>
            </div>
        </div>
    );
};
