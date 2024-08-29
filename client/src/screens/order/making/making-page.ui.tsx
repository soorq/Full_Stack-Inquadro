import { Footer } from '~&/src/widgets/footer';
import { Header } from '~&/src/widgets/header';
import dynamic from 'next/dynamic';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '~&/src/shared/ui/breadcrumb';

const SignBlock = dynamic(() =>
    import('~&/src/features/session').then(cn => cn.SignBlock)
);

const OrderMakingForm = dynamic(() =>
    import('~&/src/entities/order').then(cn => cn.OrderMakingForm)
);

export const OrderMakingPage = () => {
    return (
        <>
            <Header />
            <main className="w-full mt-5 container overflow-hidden">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Оформление заказа</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <section className="space-y-1.5 mt-5 mb-10">
                    <SignBlock />
                    <OrderMakingForm />
                </section>
            </main>
            <Footer />
        </>
    );
};
