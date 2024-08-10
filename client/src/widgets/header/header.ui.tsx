import { SearchInput } from '~&/src/features/search-input';
import { FavoritePerview } from '~&/src/entities/favorite';
import { CartPerview } from '~&/src/entities/cart';
import Image from 'next/image';

export const Header = () => {
    return (
        <header className="w-full h-full">
            <div className="py-2.5 bg-secondary">
                <div className="container flex items-center justify-between">
                    <div className="flex gap-5 items-center">
                        <h4 className="text-sm font-[350]">
                            <span className="mr-0.5 text-muted-foreground">
                                адрес офиса:
                            </span>
                            <span>
                                Московская обл., г. Подольск, ул. Вишнёвая, д.
                                13А, пом. 6
                            </span>
                        </h4>
                        <h4 className="text-sm font-[350]">
                            <span className="mr-0.5 text-muted-foreground">
                                адрес склада:
                            </span>
                            <span>
                                Московская обл., г. Подольск, ул. Вишнёвая, д.
                                11
                            </span>
                        </h4>
                    </div>
                    <p className="font-[350] text-sm">+7 926 918 08 41</p>
                </div>
            </div>
            <div className="py-2.5 container flex justify-between items-center">
                <div className="flex justify-between w-3/4">
                    <div className="relative w-36 h-12">
                        <Image
                            src="/logo/logo.png"
                            alt="Logo"
                            fill
                        />
                    </div>

                    <SearchInput />
                </div>

                <div className="flex gap-2.5">
                    <FavoritePerview />
                    <CartPerview />
                </div>
            </div>
        </header>
    );
};
