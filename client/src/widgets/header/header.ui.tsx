import { SearchInputSkeleton } from '~&/src/features/search-input';
import { FavoritePreview } from '~&/src/entities/favorite';
import { CartPreview } from '~&/src/entities/cart';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const SearchInput = dynamic(
    () => import('~&/src/features/search-input').then(cn => cn.SearchInput),
    { loading: () => <SearchInputSkeleton /> }
);

export const Header = () => {
    return (
        <header className="w-full h-full">
            <div className="py-2.5 hidden lg:block bg-secondary">
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
            <div className="py-2.5 container w-full flex justify-between items-center">
                <div className="flex justify-between w-full md:w-3/4 gap-5 lg:gap-0">
                    <div className="relative w-36 h-12 shrink-0">
                        <Image src="/logo/logo.png" alt="logo.inquadro" fill />
                    </div>

                    <SearchInput />
                </div>

                <div className="hidden gap-2.5 md:flex">
                    <FavoritePreview />
                    <CartPreview />
                </div>
            </div>
        </header>
    );
};
