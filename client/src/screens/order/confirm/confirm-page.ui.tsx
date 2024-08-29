import { ConfirmProducts } from '~&/src/widgets/confirm-products';
import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';
import dynamic from 'next/dynamic';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '~&/src/shared/ui/breadcrumb';

const PromoCode = dynamic(() =>
    import('~&/src/features/promo-code').then(p => p.PromoCode)
);

const TotalOrder = dynamic(() =>
    import('~&/src/widgets/total-order').then(p => p.TotalOrder)
);

export const OrderConfirmPage = () => {
    return (
        <>
            <Header />

            <main className="container mt-5 mb-10 w-full min-h-[65svh]">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                Подтверждение заказа
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <section className="my-10">
                    <ConfirmProducts />
                    <PromoCode />
                    <TotalOrder />
                </section>
            </main>
            <Footer />
        </>
    );
};
