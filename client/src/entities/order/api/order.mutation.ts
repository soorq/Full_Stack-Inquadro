import type { OrderSchemaCreateDto } from './order.types';
import { OrderService } from './order.api';
import {
    type DefaultError,
    useMutation,
    type UseMutationOptions
} from '@tanstack/react-query';

export function useOrderMutation(
    options?: Pick<
        UseMutationOptions<
            Awaited<ReturnType<typeof OrderService.orderCreate>>,
            DefaultError,
            OrderSchemaCreateDto,
            unknown
        >,
        'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
    >
) {
    const {
        mutationKey = [],
        onMutate,
        onSuccess,
        onError,
        onSettled
    } = options || {};
    return useMutation({
        mutationKey: ['order', 'order-create', ...mutationKey],
        mutationFn: async (dto: OrderSchemaCreateDto) =>
            OrderService.orderCreate(dto),
        onMutate,
        onSuccess,
        onError,
        onSettled
    });
}
