'use client';
import { cn } from '~&/src/shared/lib/tw-merge';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    ListItem
} from '~&/src/shared/ui/navigation-menu';

export function Navbar({ className }: { className?: string }) {
    return (
        <NavigationMenu
            className={cn('justify-start', className)}
            delayDuration={5}
        >
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <span className="leading-relaxed text-base">меню</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2 p-3.5 w-[270px] grid-cols-1">
                            <ListItem href="/about">о компании</ListItem>
                            <ListItem href="/delivery">
                                доставка и оплата
                            </ListItem>
                            <ListItem href="/gift-card">
                                подарочная карта
                            </ListItem>
                            <ListItem href="/partner">
                                партнерская программа
                            </ListItem>
                            <ListItem href="/seller">
                                акционная программа
                            </ListItem>
                            <ListItem href="contact">
                                контактная информация
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
