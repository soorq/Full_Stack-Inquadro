import axios, { AxiosError } from 'axios';
import { z } from 'zod';

const $api = process.env.NEXT_PUBLIC_API_URL;

export const API = axios.create({
    baseURL: $api,
    withCredentials: true
});

export function handleGenericError(error: AxiosError) {
    const validation = GenericErrorSchema.safeParse(error.response?.data);

    if (validation.success) {
        return new AxiosError(
            formatValidationErrors(validation.data),
            error.code,
            error.config,
            error.request,
            error.response
        );
    }

    return error;
}

const GenericErrorSchema = z.object({
    errors: z.record(z.string(), z.array(z.string()))
});

type GenericError = z.infer<typeof GenericErrorSchema>;

function formatValidationErrors(data: GenericError): string {
    return Object.entries(data.errors)
        .map(([field, messages]) =>
            messages.map(message => `${field}: ${message}`).join('\n')
        )
        .join('\n');
}
