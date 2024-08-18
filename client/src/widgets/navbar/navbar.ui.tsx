'use client';
import { Button } from '~&/src/shared/ui/button';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '~&/src/shared/lib/tw-merge';

export const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <Button
            className={cn('', open ? 'h-10 w-full' : 'size-10')}
            onClick={() => setOpen(!open)}
        >
            <p className="">меню</p>
            <Menu />
        </Button>
    );
};
