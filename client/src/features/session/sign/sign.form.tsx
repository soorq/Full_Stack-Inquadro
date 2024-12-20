'use client';

import { Form, FormControl, FormField, FormItem } from '~&/src/shared/ui/form';
import { useSignMutation, useVerifyMutation } from './sign.mutation';
import type { CodeFormValues, EmailFormValues } from './sign.types';
import { useSessionStore } from '~&/src/shared/session';
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

function SignForm() {
    const { step, setStep } = useSessionStore.getState();
    const { mutate: verifyUser } = useVerifyMutation();

    const { mutate: signUser } = useSignMutation({});

    const form = useForm<EmailFormValues | CodeFormValues>({
        resolver: zodResolver(
            step === 'email'
                ? authContractsDto.SignUserDtoSchema
                : authContractsDto.VerifyUserDtoSchema
        ),
        criteriaMode: 'firstError',
        mode: 'onChange',
        defaultValues: { email: '', code: '' }
    });

    const onSubmitEmail = async (data: EmailFormValues) => {
        try {
            signUser({ email: data.email });
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
                    'gap-y-2.5 sm:gap-x-5',
                    step === 'code'
                        ? 'flex flex-col sm:flex-row'
                        : 'grid grid-cols-1 sm:grid-cols-[300px_1fr] lg:grid-cols-[425px,300px,1.2fr]'
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
}

const EmailStep = ({ control }: { control: Control<EmailFormValues> }) => (
    <FormField
        name="email"
        control={control}
        render={({ field }) => (
            <FormItem>
                <FormControl>
                    <Input {...field} placeholder="youremail@yourmail.domain" />
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

export { SignForm };
