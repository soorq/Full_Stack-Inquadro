import { OrderService } from '~&/src/shared/api/order';
import { orderTypes } from '~&/src/entities/order';
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
            orderTypes.OrderSchemaCreateDto,
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
        mutationFn: async (dto: orderTypes.OrderSchemaCreateDto) =>
            OrderService.orderCreate(dto),
        onMutate,
        onSuccess,
        onError,
        onSettled
    });
}
