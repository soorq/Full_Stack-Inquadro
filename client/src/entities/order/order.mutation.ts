import { OrderService, type orderT } from '~&/src/shared/api/order';
import toast from 'react-hot-toast';
import {
    type DefaultError,
    useMutation,
    type UseMutationOptions
} from '@tanstack/react-query';

export function useOrderMutation(
    options?: Pick<
        UseMutationOptions<
            Awaited<ReturnType<typeof OrderService.create>>,
            DefaultError,
            orderT.OrderCreateDto,
            unknown
        >,
        'mutationKey' | 'onMutate' | 'onSuccess' | 'onSettled'
    >
) {
    const { mutationKey = [], onMutate, onSuccess, onSettled } = options || {};
    return useMutation({
        mutationKey: ['order', 'order-create', ...mutationKey],
        mutationFn: dto => OrderService.create(dto),
        onMutate,
        onSuccess,
        onError: e => {
            toast.error(e.message);
        },
        onSettled
    });
}
