'use client';

import { useSessionStore } from '~&/src/shared/session';
import { Button } from '~&/src/shared/ui/button';
import { useState, useEffect } from 'react';
import { SignForm } from './sign.form';

export const SignBlock = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isAuth, setIsAuth] = useState(true);
    const [show, setShow] = useState(false);
    const { session, step } = useSessionStore();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || (session && step === '')) {
        return null;
    }

    const getParagraphText = () => {
        if (show) {
            return isAuth
                ? 'Авторизация по электронному адресу'
                : 'Регистрация по электронному адресу';
        } else {
            return isAuth ? 'Вы не зарегистрированы?' : 'Вы зарегистрированы?';
        }
    };

    return (
        <div className="w-full h-full p-4 bg-secondary rounded-[10px]">
            <p className="text-lg mb-4 leading-4">{getParagraphText()}</p>

            {show ? (
                <SignForm />
            ) : (
                <Button
                    className="max-w-[200px] w-full h-[50px]"
                    onClick={() => setShow(true)}
                >
                    {isAuth ? 'Войти' : 'Зарегистрироваться'}
                </Button>
            )}

            <div className="text-sm flex items-center gap-1 mt-1.5">
                <p className="text-black/50">
                    {isAuth
                        ? 'если вы не зарегистрированы, то'
                        : 'если вы зарегистрированы, то'}
                </p>
                <Button
                    variant="link"
                    onClick={() => setIsAuth(prev => !prev)}
                    className="p-0 h-auto text-blue-500 text-sm"
                >
                    нажмите здесь
                </Button>
            </div>
        </div>
    );
};
