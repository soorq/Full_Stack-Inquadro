import { Button } from '~&/src/shared/ui/button';
import Link from 'next/link';

export const HelperInfo = () => {
    return (
        <section className="my-10 bg-secondary md:hidden rounded-[10px] w-full h-full">
            <div className="py-9 px-2.5 w-full h-full">
                <p className="text-sm text-black/50 mb-1.5">
                    Продолжить выбирать
                    <br />
                    качественные, красивые,
                    <br />
                    премиальные и иные плитки,
                    <br />
                    чтобы воссоздать у себя дома то,
                    <br />
                    что действительно хочешь
                    <br />и давно об этом мечтаешь
                </p>
                <Button asChild className="px-5 h-12">
                    <Link href="/catalog">В каталог магазина</Link>
                </Button>
            </div>
        </section>
    );
};
