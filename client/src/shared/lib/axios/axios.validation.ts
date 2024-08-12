import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ZodIssue } from 'zod';

export class AxiosValidationError<T = unknown> extends AxiosError {
    static readonly ERR_BAD_VALIDATION = 'ERR_BAD_VALIDATION';

    constructor(
        config?: InternalAxiosRequestConfig,
        request?: any,
        response?: AxiosResponse<T>,
        public readonly issues?: ZodIssue[]
    ) {
        super(
            'The provided data does not meet the required criteria.',
            AxiosValidationError.ERR_BAD_VALIDATION,
            config,
            request,
            response
        );
    }
}
