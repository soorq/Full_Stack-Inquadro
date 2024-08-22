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
        <header className="w-full">
            <div className="py-2.5 bg-secondary hidden lg:block">
                <div className="container flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <h4 className="text-sm font-normal">
                            <span className="text-muted-foreground mr-0.5">
                                адрес офиса:
                            </span>
                            Московская обл., г. Подольск, ул. Вишнёвая, д. 13А,
                            пом. 6
                        </h4>
                        <h4 className="text-sm font-normal">
                            <span className="text-muted-foreground mr-0.5">
                                адрес склада:
                            </span>
                            Московская обл., г. Подольск, ул. Вишнёвая, д. 11
                        </h4>
                    </div>
                    <p className="text-sm font-normal">+7 926 918 08 41</p>
                </div>
            </div>

            <div className="container flex items-center gap-8 py-2.5">
                <div className="max-w-[270px] w-full h-auto">
                    <div className="relative w-36 h-12 shrink-0">
                        <Image src="/logo/logo.png" alt="logo.inquadro" fill />
                    </div>
                </div>

                <div
                    className="
                w-full grid gap-5
                sm:grid-cols-[repeat(2,minmax(170px,1fr))]
                lg:grid-cols-[repeat(3,minmax(170px,1fr))]
                xl:grid-cols-[repeat(3,minmax(280px,1fr))]
                2xl:grid-cols-[repeat(3,minmax(290px,1fr))]
                "
                >
                    <SearchInput className="col-span-2" />

                    <div className="hidden lg:flex gap-2.5 justify-end">
                        <FavoritePreview />
                        <CartPreview />
                    </div>
                </div>
            </div>
        </header>
    );
};
