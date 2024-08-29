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

export const GiftCard = () => {
    return (
        <>
            <Header />
            <main className="container w-full min-h-[55dvh]">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Подарочная карта</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <section className="w-full h-full my-14">
                    <h1 className="text-3xl font-bold uppercase">
                        подарочная карта
                    </h1>
                    <div className="my-8 w-full flex items-end">
                        <p className="text-base md:w-2/3 leading-5">
                            Подарочная карта нашего интернет-магазина — это
                            идеальный подарок для ваших близких, друзей или
                            коллег. С такой картой вы дарите не просто подарок,
                            а возможность выбрать то, что действительно нужно и
                            нравится!
                        </p>
                        <div className="relative h-0 w-2/5 lg:w-1/3 md:block hidden">
                            <div className="bg-gray-200/75 float-end max-w-[245px] max-h-[140px] aspect-video h-svh w-full absolute rounded-[10px] right-0 bottom-0" />
                            <div className="bg-gray-200 max-w-[245px] max-h-[140px] aspect-video h-svh w-full absolute rounded-[10px] -bottom-10 right-14" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-5">
                        Преимущества подарочной карты
                    </h3>
                    <ul className="list-disc list-outside mb-8 ml-5 leading-5 text-base space-y-2">
                        <li>
                            Ввод кода: При оформлении заказа введите код
                            подарочной карты в специальное поле на странице
                            оплаты.
                        </li>
                        <li>
                            Частичное использование: Если сумма покупки меньше
                            номинала карты, оставшийся баланс можно использовать
                            для следующих покупок.
                        </li>
                        <li>
                            Срок действия: Подарочная карта действительна в
                            течение указать срок действия, например, 12 месяцев
                            с момента покупки.
                        </li>
                    </ul>
                    <h3 className="text-xl font-bold mb-5">
                        Как использовать подарочную карту
                    </h3>
                    <ul className="list-disc list-outside mb-8 ml-5 leading-5 text-base space-y-2">
                        <li>
                            Универсальность: Подарочная карта подходит для
                            любого случая — будь то день рождения, юбилей,
                            праздник или просто знак внимания.
                        </li>
                        <li>
                            Свобода выбора: Обладатель карты сможет
                            самостоятельно выбрать любой товар из нашего
                            ассортимента, соответствующий номиналу карты.
                        </li>
                        <li>
                            Простота использования: Карту можно использовать как
                            в нашем интернет-магазине, так и в офлайн-точках
                            продаж (если таковые имеются).
                        </li>
                    </ul>
                    <h3 className="text-xl font-bold mb-5">
                        Условия использования
                    </h3>
                    <ul className="list-disc list-outside mb-8 ml-5 leading-5 text-base space-y-2">
                        <li>
                            Подарочная карта не подлежит возврату и обмену на
                            денежные средства.
                        </li>
                        <li>
                            Если стоимость товара превышает номинал карты, вы
                            можете доплатить разницу любым доступным способом
                            оплаты.
                        </li>
                        <li>
                            Подарочную карту можно использовать только для
                            покупки товаров и услуг в нашем магазине.
                        </li>
                    </ul>
                </section>
            </main>
            <Footer />
        </>
    );
};
