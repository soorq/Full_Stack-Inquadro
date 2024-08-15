import { AuthService, authTypesDto } from '~&/src/shared/api/auth';
import {
    DefaultError,
    UseMutationOptions,
    useMutation
} from '@tanstack/react-query';
import { useSessionStore } from '~&/src/shared/session/session.model';

export function useSignMutation(
    options?: Pick<
        UseMutationOptions<
            Awaited<ReturnType<typeof AuthService.signUserMutation>>,
            DefaultError,
            authTypesDto.SignUserDto,
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
        mutationKey: ['session', 'sign-user', ...mutationKey],
        mutationFn: async (dto: authTypesDto.SignUserDto) =>
            AuthService.signUserMutation({ dto }),
        onMutate,
        onSuccess,
        onError,
        onSettled
    });
}

export function useVerifyMutation(
    options?: Pick<
        UseMutationOptions<
            Awaited<ReturnType<typeof AuthService.verifyCode>>,
            DefaultError,
            authTypesDto.VerifyUserDto,
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
        mutationKey: ['session', 'verify-user', ...mutationKey],
        mutationFn: async (dto: authTypesDto.VerifyUserDto) =>
            AuthService.verifyCode({ dto }),
        onMutate,
        onSuccess: async (response, variables, context) => {
            const user = response.data;
            const { setSession } = useSessionStore.getState();
            setSession({ ...user });
            await onSuccess?.(response, variables, context);
        },

        onError,
        onSettled
    });
}
