import { FavoritePreview } from '~&/src/entities/favorite';
import { Footer } from '~&/src/widgets/footer';
import { Header } from '~&/src/widgets/header';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '~&/src/shared/ui/breadcrumb';
import Link from 'next/link';

export const FavoritePage = () => {
    return (
        <>
            <Header />
            <main className="container w-full">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Главная</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Избранное</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <FavoritePreview isIcon={false} />
            </main>
            <Footer />
        </>
    );
};
