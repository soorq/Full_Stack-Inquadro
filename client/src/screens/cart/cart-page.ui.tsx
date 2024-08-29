import { HelperInfo } from '~&/src/widgets/helper-info';
import { CartPreview } from '~&/src/entities/cart';
import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '~&/src/shared/ui/breadcrumb';
import Link from 'next/link';
import { HintOrder } from '~&/src/widgets/hint-order';

export const CartPage = () => {
    return (
        <>
            <Header />
            <main className="container w-full mb-10">
                <Breadcrumb className="mb-3">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Главная</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Корзина</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <CartPreview isIcon={false} />
                <HelperInfo />
            </main>
            <HintOrder />
            <Footer />
        </>
    );
};
