'use client';

import { Copy } from '@phosphor-icons/react/dist/ssr';
import { Button } from '~&/src/shared/ui/button';
import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import toast from 'react-hot-toast';
import Image from 'next/image';

export const CardOrder = ({
    order_id,
    quantity,
    sqmetrs,
    total
}: {
    order_id: string;
    total: number;
    quantity: number;
    sqmetrs: number;
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [contactVisible, setContactVisible] = useState(false);

    const handleCopyClick = async () => {
        const cardElement = cardRef.current;
        const buttonElement = buttonRef.current;

        if (cardElement && buttonElement) {
            setLoading(true);

            try {
                buttonElement.style.display = 'none';
                const dataUrl = await toPng(cardElement);
                const response = await fetch(dataUrl);
                const blob = await response.blob();
                const clipboardItem = new ClipboardItem({ 'image/png': blob });
                await navigator.clipboard.write([clipboardItem]);
                toast.success('Успешно скопирована картинка');
                setContactVisible(true);
            } catch (error) {
                console.error('Ошибка при копировании:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div
            ref={cardRef}
            className="rounded-[10px] overflow-hidden relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-white/50 after:z-0 w-full h-full"
        >
            <div className="p-4 w-full h-full relative z-10">
                <div className="flex mb-2 justify-between">
                    <div className="">
                        <p className="text-base text-black/80">
                            Номер вашего заказа
                        </p>
                        <p className="text-lg font-bold leading-5">
                            {order_id}
                        </p>
                    </div>
                    <div className="h-9 max-w-[130px] w-full relative md:block hidden object-contain">
                        <Image
                            src="/logo/logo.png"
                            alt="Логотип. Керамическая плитка. Керамогранитная плитка. Бассейная плитка"
                            fill
                        />
                    </div>
                </div>
                <div className="w-full h-full mb-5 md:mb-2">
                    <h3 className="text-base text-black/80">
                        Итоговая сумма вашего заказа
                    </h3>
                    <p className="text-lg font-bold leading-5">{total} руб.</p>
                </div>
                <div className="flex justify-between items-end">
                    <div className="gap-x-4 hidden md:flex">
                        <p className="flex gap-1.5 items-center">
                            <span className="text-base font-bold">
                                {quantity}
                            </span>
                            <span className="text-sm">
                                {quantity > 1 ? 'упаковок' : 'упаковка'}
                            </span>
                        </p>

                        <p className="flex gap-1.5 items-center">
                            <span className="text-base font-bold">
                                {sqmetrs}
                            </span>
                            <span className="text-sm">квадратных метров</span>
                        </p>
                    </div>
                    {contactVisible ? (
                        <div className="text-black/90 text-sm">
                            <p className="md:text-right text-left">
                                +7 800 800 10 10
                            </p>
                            <p>ежедневно с 10:00 до 20:00</p>
                        </div>
                    ) : (
                        <Button
                            ref={buttonRef}
                            className="gap-2.5 text-sm px-4 sm:px-2 font-normal"
                            onClick={handleCopyClick}
                            disabled={loading}
                        >
                            скопировать
                            <Copy />
                        </Button>
                    )}
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="relative w-full h-full">
                    <Image
                        sizes="(max-width: 620px) 100vw, 620px"
                        alt="Задний фон заказа. Заказ."
                        blurDataURL={'/order.png'}
                        className="object-cover"
                        src={'/order.png'}
                        placeholder="blur"
                        rel="preload"
                        fill
                    />
                </div>
            </div>
        </div>
    );
};
