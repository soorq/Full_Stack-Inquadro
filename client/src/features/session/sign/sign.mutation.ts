import { AuthService, authTypesDto } from '~&/src/shared/api/auth';
import { useSessionStore } from '~&/src/shared/session';
import toast from 'react-hot-toast';
import {
    DefaultError,
    UseMutationOptions,
    useMutation
} from '@tanstack/react-query';

export function useSignMutation(
    options?: Pick<
        UseMutationOptions<
            Awaited<ReturnType<typeof AuthService.signUserMutation>>,
            DefaultError,
            authTypesDto.SignUserDto,
            unknown
        >,
        'mutationKey' | 'onMutate' | 'onSettled'
    >
) {
    const { setStep } = useSessionStore.getState();

    const { mutationKey = [], onMutate, onSettled } = options || {};
    return useMutation({
        mutationKey: ['session', 'sign-user', ...mutationKey],
        mutationFn: async (dto: authTypesDto.SignUserDto) =>
            AuthService.signUserMutation({ dto }),
        onMutate,
        onSuccess() {
            toast.success('Отправили вам код на почту!');
            setStep('code');
        },
        onError(error) {
            toast.error(`${error}`);
            setStep('email');
        },
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
        'mutationKey' | 'onMutate' | 'onSettled'
    >
) {
    const { setStep } = useSessionStore.getState();

    const { mutationKey = [], onMutate, onSettled } = options || {};
    return useMutation({
        mutationKey: ['session', 'verify-user', ...mutationKey],
        mutationFn: async (dto: authTypesDto.VerifyUserDto) =>
            AuthService.verifyCode({ dto }),
        onSuccess: async (response, variables, context) => {
            const user = response.data;
            const { setSession } = useSessionStore.getState();
            setSession({ ...user });

            return toast.success('Успешно!');
        },
        onMutate,
        onError: error => {
            toast.error(`${error}`);
            setStep('email');
        },
        onSettled
    });
}
