import { z } from 'zod';

export const UserDtoSchema = z.object({
    address: z.union([z.string(), z.null()]),
    phone: z.union([z.string(), z.null()]),
    city: z.union([z.string(), z.null()]),
    name: z.union([z.string(), z.null()]),
    isVerifed: z.boolean(),
    updatedAt: z.string(),
    createdAt: z.string(),
    email: z.string(),
    id: z.string()
});

export const ResponseEmailStatus = z.object({ status: z.string() });

export const SignUserDtoSchema = z.object({
    email: z
        .string({
            message:
                'Oops! The email address you entered is invalid. Please double-check and make sure it follows the format: example@domain.com'
        })
        .nonempty()
});

export const VerifyUserDtoSchema = z.object({
    email: z
        .string({
            message:
                'Oops! The email address you entered is invalid. Please double-check and make sure it follows the format: example@domain.com'
        })
        .nonempty(),
    code: z
        .string()
        .min(4, {
            message:
                'Your password must be at least 4 characters long. Please try again.'
        })
        .nonempty()
});
