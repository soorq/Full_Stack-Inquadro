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
            setPlay(true);
        }
    }, [isComplete, play]);

    if (!mounted) {
        return null;
    }

    return (
        <LConfetti
            className="absolute max-w-full w-full overflow-hidden top-0 left-0 right-0 bottom-0"
            height={height * 3.1}
            width={width * 1.5}
            style={{ pointerEvents: 'none', inset: '0' }}
            numberOfPieces={play ? 1500 : 0}
            recycle={false}
            debug
            onConfettiComplete={confetti => {
                setPlay(false);
                confetti?.reset();
            }}
            drawShape={ctx => {
                const colors = [
                    '#ff9999',
                    '#db97ff',
                    '#9ab9ff',
                    '#9affc1',
                    '#fdffa6'
                ];
                const randomColor =
                    colors[Math.floor(Math.random() * colors.length)];
                const width = Math.random() * 10 + 10;
                const height = Math.random() * 10 + 10;

                ctx.fillStyle = randomColor;
                ctx.beginPath();

                ctx.rect(-width / 2, -height / 2, width, height);
                ctx.closePath();
                ctx.fill();
            }}
        />
    );
};
