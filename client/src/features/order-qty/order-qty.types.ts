interface BaseContextProps {
    qty: number;
    onQtyChange: (newQty: number) => void;
    totalCost: number;
    totalTileArea: number;
}

export interface CartContextProps extends BaseContextProps {
    context: 'cart';
    href: string;
}

export interface FavoritesContextProps extends BaseContextProps {
    context: 'favorites';
    onAddToCart: () => void;
}

export interface ConfirmContextProps extends BaseContextProps {
    context: 'confirm';
}

export type OrderSpecifyQtyProps = (
    | FavoritesContextProps
    | ConfirmContextProps
    | CartContextProps
) & { isInCart?: boolean };
