interface BaseContextProps {
    qty: number;
    onQtyChange: (newQty: number) => void;
    totalCost: number;
    totalTileArea: number;
}

export interface CartContextProps extends BaseContextProps {
    context: 'cart';
    onProceedToOrder: () => void;
}

export interface FavoritesContextProps extends BaseContextProps {
    context: 'favorites';
    onAddToCart: () => void;
}

export type OrderSpecifyQtyProps = (
    | CartContextProps
    | FavoritesContextProps
) & { isInCart: boolean };
