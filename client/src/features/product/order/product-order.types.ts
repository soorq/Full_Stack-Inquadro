import type { ProductClient } from '~&/src/entities/product';

interface BaseContextProps {
    qty: number;
    onQtyChange: (newQty: number) => void;
    totalCost: number;
    totalTileArea: number;
}

interface CartContextProps extends BaseContextProps {
    context: 'cart';
    href: string;
}

interface FavoritesContextProps extends BaseContextProps {
    context: 'favorites';
    onAddToCart: () => void;
}

interface ConfirmContextProps extends BaseContextProps {
    context: 'confirm';
}

export type ProductOrderProps = {
    product: ProductClient;
    isInCart?: boolean;
    className?: string;
} & (CartContextProps | FavoritesContextProps | ConfirmContextProps);
