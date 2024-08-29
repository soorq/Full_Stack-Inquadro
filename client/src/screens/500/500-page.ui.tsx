import { ERROR_IMAGE } from '~&/src/shared/contants/gateway';
import { Button } from '~&/src/shared/ui/button';
import { Footer } from '~&/src/widgets/footer';
import { Header } from '~&/src/widgets/header';
import Image from 'next/image';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '~&/src/shared/ui/breadcrumb';

export const ErrorPage = () => {
    return (
        <>
            <Header />
            <main className="min-h-[55dvh] h-full w-full container">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Страница не найдена</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <section className="h-full w-full my-14">
                    <div className="flex w-full h-full">
                        <div className="h-full w-full xl:w-9/12">
                            <h1 className="text-3xl text-black font-bold uppercase">
                                Ошибка в настройках
                                <br />
                                сайта
                            </h1>
                            <p className="text-base text-black/50 mt-4 mb-5">
                                Возможно, вы перешли по ссылке, в которой была
                                допущена ошибка, или ресурс был удален.
                                Попробуйте перейти на главную страницу
                            </p>
                            <Button asChild>
                                <Link className="h-[50px] sm:px-7" href="/">
                                    Перейти на главную
                                </Link>
                            </Button>
                        </div>
                        <div className="w-full h-auto hidden md:block">
                            <div className="relative max-w-[520px] mx-auto w-full max-h-[310px] h-auto aspect-square">
                                <Image
                                    sizes="(max-width: 486px) 100vw, 486px"
                                    alt="404 page. Inquadra"
                                    blurDataURL={ERROR_IMAGE}
                                    className="!-top-1/4"
                                    placeholder='blur'
                                    loading='eager'
                                    src={ERROR_IMAGE}
                                    rel='preload'
                                    fill
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};
