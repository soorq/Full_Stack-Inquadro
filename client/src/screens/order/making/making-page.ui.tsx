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
    import('~&/src/features/order').then(cn => cn.OrderMakingForm)
);

export const OrderMakingPage = () => {
    return (
        <>
            <Header />
            <main className="w-full mt-5 relative overflow-hidden">
                <Breadcrumb className="container">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>Каталог</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                Подтверждение заказа
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Оформление заказа</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <section className="container space-y-1.5 mt-5 mb-10">
                    <SignBlock />
                    <OrderMakingForm />
                </section>
            </main>
            <Footer />
        </>
    );
};
