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

const ProductOrder = dynamic(() =>
    import('~&/src/widgets/product').then(p => p.ProductOrder)
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

                <ConfirmProducts />

                <section className="flex gap-1.5 flex-col my-10">
                    <PromoCode />
                    <TotalOrder />
                </section>
            </main>

            <Footer />
        </>
    );
};
