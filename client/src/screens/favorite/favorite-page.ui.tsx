import { FavoritePreview } from '~&/src/entities/favorite';
import { HelperInfo } from '~&/src/widgets/helper-info';
import { HintOrder } from '~&/src/widgets/hint-order';
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
            <main className="container w-full mb-6">
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
                <HelperInfo />
            </main>
            <HintOrder />
            <Footer />
        </>
    );
};
