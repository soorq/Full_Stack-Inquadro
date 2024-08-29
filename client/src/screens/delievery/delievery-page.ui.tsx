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

export const DelieveryPay = () => {
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
                            <BreadcrumbPage>Доставка и оплата</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <section className="w-full h-full my-14">
                    <h1 className="text-3xl font-bold uppercase mb-8">
                        Доставка и оплата
                    </h1>
                    <h3 className="text-xl font-bold mb-5">Доставка</h3>
                    <p className="text-base leading-5">
                        Мы стремимся сделать процесс доставки быстрым и удобным
                        для вас. Наш интернет-магазин предлагает несколько
                        вариантов доставки:
                    </p>
                    <ul className="list-disc list-outside mb-8 ml-5 leading-5 text-base space-y-2">
                        <li>
                            Курьерская доставка: Наши курьеры доставят ваш заказ
                            прямо к двери. Сроки доставки зависят от вашего
                            местоположения и выбранного способа доставки, но
                            обычно составляют от 1 до 3 рабочих дней.
                        </li>
                        <li>
                            Самовывоз: Вы можете самостоятельно забрать ваш
                            заказ из нашего пункта выдачи. Это удобный способ,
                            если вы хотите получить свой товар в кратчайшие
                            сроки. Адреса пунктов выдачи вы можете найти на
                            странице &#39;Контакты&#39;.
                        </li>
                        <li>
                            Почтовая доставка: Если вы находитесь в другом
                            регионе, мы отправим ваш заказ через почтовую
                            службу. Время доставки может варьироваться в
                            зависимости от удаленности вашего региона.
                        </li>
                    </ul>
                    <h3 className="text-xl font-bold mb-5">
                        Стоимость доставки
                    </h3>
                    <ul className="list-disc list-outside mb-8 ml-5 leading-5 text-base space-y-2">
                        <li>
                            Курьерская доставка по городу: 300 руб. Бесплатно
                            при заказе от 5000 руб.
                        </li>
                        <li>Самовывоз: Бесплатно.</li>
                        <li>
                            Почтовая доставка: Рассчитывается индивидуально в
                            зависимости от региона и веса посылки.
                        </li>
                    </ul>
                    <h3 className="text-xl font-bold mb-5">Оплата</h3>
                    <p className="text-base leading-5">
                        Мы предлагаем несколько удобных способов оплаты:
                    </p>
                    <ul className="list-disc list-outside mb-8 ml-5 leading-5 text-base space-y-2">
                        <li>
                            Онлайн-оплата: Вы можете оплатить заказ онлайн с
                            помощью банковской карты. Все транзакции защищены и
                            безопасны.
                        </li>
                        <li>
                            Оплата при получении: Вы можете оплатить заказ
                            наличными или картой при получении товара. Эта опция
                            доступна для курьерской доставки и самовывоза.
                        </li>
                        <li>
                            Банковский перевод: Для юридических лиц и крупных
                            заказов мы предоставляем возможность оплаты по
                            безналичному расчету.
                        </li>
                    </ul>
                    <h3 className="text-xl mb-5 font-bold">Возврат и обмен</h3>
                    <p className="textbase leading-5">
                        Если вам не подошел товар, вы можете вернуть или
                        обменять его в течение 14 дней с момента получения. Для
                        этого свяжитесь с нашей службой поддержки, и мы поможем
                        вам организовать возврат или обмен.
                    </p>
                </section>
            </main>
            <Footer />
        </>
    );
};
