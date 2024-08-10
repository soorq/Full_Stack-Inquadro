import { ProductPreview } from '~&/src/entities/product';
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
import { RecentProducts } from '~&/src/features/recent-products/recent-products.ui';
import { Footer } from '~&/src/widgets/footer';

export const RootPageUi = () => {
    return (
        <>
            <Header />
            <Breadcrumb className="py-7 container">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="каталог">Каталог</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="каталог">Керамическая плитка</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbPage>Ливадия</BreadcrumbPage>
                </BreadcrumbList>
            </Breadcrumb>
            <ProductPreview variant="lg" />
            <RecentProducts />
            <Footer />
        </>
    );
};
