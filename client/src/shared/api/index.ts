import axios, { AxiosError } from 'axios';
import { z } from 'zod';

export const API = axios.create({
    baseURL: 'http://localhost:1010/api'
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
