import type {
    ProductSearchDto,
    ProductsSearchDto
} from '~&/src/shared/api/api.types';

export type TypeActionsStore = {
    addFn: (product: ProductSearchDto) => void;
    delFn: (id: string) => void;
};

export type TypeStatesStore = {
    quantity: number;
    products: ProductsSearchDto;
};
