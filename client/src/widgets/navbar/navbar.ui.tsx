import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    ListItem
} from '~&/src/shared/ui/navigation-menu';

export const Navbar = () => {
    return (
        <NavigationMenu className="justify-start py-2.5">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <span className="leading-relaxed text-base">меню</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2 p-3.5 w-[270px] grid-cols-1">
                            <ListItem href="/about">о компании</ListItem>
                            <ListItem href="/delievery">
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
};
