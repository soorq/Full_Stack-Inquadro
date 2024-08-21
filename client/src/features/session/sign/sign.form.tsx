import { Form, FormControl, FormField, FormItem } from '~&/src/shared/ui/form';
import { useSignMutation, useVerifyMutation } from './sign.mutation';
import type { CodeFormValues, EmailFormValues } from './sign.types';
import { authContractsDto } from '~&/src/shared/api/auth';
import { useForm, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~&/src/shared/ui/button';
import { cn } from '~&/src/shared/lib/tw-merge';
import { Input } from '~&/src/shared/ui/input';
import toast from 'react-hot-toast';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from '~&/src/shared/ui/input-otp';
import { useSessionStore } from '~&/src/shared/session';

export const SignForm = () => {
    const { step, setStep } = useSessionStore.getState();
    const { mutate: verifyUser } = useVerifyMutation({
        onSuccess() {
            toast.success('Успешно!');
        },
        onError(error) {
            toast.error(`${error}`);
        }
    });

    const { mutate: signUser } = useSignMutation({
        onSuccess() {
            toast.success('Отправили вам код на почту!');
        },
        onError(error) {
            toast.error(`${error}`);
        }
    });

    const form = useForm<EmailFormValues | CodeFormValues>({
        resolver: zodResolver(
            step === 'email'
                ? authContractsDto.SignUserDtoSchema
                : authContractsDto.VerifyUserDtoSchema
        ),
        mode: 'onTouched',
        defaultValues: { email: '', code: '' }
    });

    const onSubmitEmail = async (data: EmailFormValues) => {
        try {
            signUser({ email: data.email });
            setStep('code');
        } catch (e) {
            toast.error('Что-то пошло не так или не верная почта');
        }
    };

    const onSubmitCode = async (data: CodeFormValues) => {
        try {
            verifyUser({ ...data });
            setStep('');
        } catch (e) {
            toast.error('Что-то пошло не так');
        }
    };

    const onSubmit = (data: any) => {
        if (step === 'email') {
            return onSubmitEmail(data);
        } else {
            return onSubmitCode(data);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(
                    'gap-x-5',
                    step === 'code'
                        ? 'flex '
                        : 'grid grid-cols-[425px,300px,1.2fr]'
                )}
            >
                {step === 'email' ? (
                    <EmailStep
                        control={form.control as Control<EmailFormValues>}
                    />
                ) : (
                    <CodeStep
                        control={form.control as Control<CodeFormValues>}
                    />
                )}
                <Button type="submit" className="h-[50px] max-w-[300px] w-full">
                    {step === 'email' ? 'Подтвердить почту' : 'Подтвердить'}
                </Button>
            </form>
        </Form>
    );
};

const EmailStep = ({ control }: { control: Control<EmailFormValues> }) => (
    <FormField
        name="email"
        control={control}
        render={({ field }) => (
            <FormItem>
                <FormControl>
                    <Input {...field} />
                </FormControl>
            </FormItem>
        )}
    />
);

const CodeStep = ({ control }: { control: Control<CodeFormValues> }) => (
    <FormField
        name="code"
        control={control}
        render={({ field }) => (
            <FormItem>
                <FormControl>
                    <InputOTP maxLength={4} className="w-fit" {...field}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                    </InputOTP>
                </FormControl>
            </FormItem>
        )}
    />
);
