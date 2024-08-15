'use client';

import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import LConfetti from 'react-confetti';

export const Conffeti = ({ isComplete }: { isComplete: boolean }) => {
    const [play, setPlay] = useState(isComplete);
    const [mounted, setMounted] = useState(false);
    const { width, height } = useWindowSize();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isComplete && !play) {
            // Запускаем только если play еще не true
            setPlay(true);
        }
    }, [isComplete, play]);

    if (!mounted) {
        return null;
    }

    return (
        <LConfetti
            height={height * 2}
            width={width * 1.5}
            style={{ pointerEvents: 'none', inset: '0' }}
            numberOfPieces={play ? 2500 : 0}
            recycle={false}
            gravity={0.2}
            onConfettiComplete={confetti => {
                setPlay(false);
                confetti?.reset();
            }}
            drawShape={ctx => {
                const colors = ['#F5C300', '#FFDAB9', '#00BFFF', '#FF69B4'];
                const randomColor =
                    colors[Math.floor(Math.random() * colors.length)];
                const width = Math.random() * 10 + 10;
                const height = Math.random() * 10 + 10;

                ctx.fillStyle = randomColor;
                ctx.beginPath();

                // Рисуем прямоугольник
                ctx.rect(-width / 2, -height / 2, width, height);
                ctx.closePath();
                ctx.fill();
            }}
        />
    );
};
