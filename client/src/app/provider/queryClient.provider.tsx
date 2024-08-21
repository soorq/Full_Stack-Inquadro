'use client';

import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '~&/src/shared/lib/query-client';
import type { PropsWithChildren } from 'react';
import { AxiosError } from 'axios';
import {
    Query,
    QueryClientProvider as TanStackQueryClientProvider
} from '@tanstack/react-query';

export function QueryClientProvider({ children }: PropsWithChildren) {
    const queryClient = getQueryClient();

    return (
        <TanStackQueryClientProvider client={queryClient}>
            {/*<ReactQueryStreamedHydration>*/}
            {children}
            {/*</ReactQueryStreamedHydration>*/}
            <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition="bottom-left"
                errorTypes={[
                    {
                        name: 'Error',
                        initializer: errorInitializer(
                            new Error('Error message')
                        )
                    },
                    {
                        name: 'Axios Error',
                        initializer: errorInitializer(
                            new AxiosError('Axios error')
                        )
                    }
                ]}
            />
        </TanStackQueryClientProvider>
    );
}

function errorInitializer(error: Error) {
    return (query: Query) => {
        query.reset();
        return error;
    };
}
