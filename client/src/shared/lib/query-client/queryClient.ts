import {
    defaultShouldDehydrateQuery,
    isServer,
    QueryClient
} from '@tanstack/react-query';

export const makeQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
                staleTime: 1000 * 60
            },
            dehydrate: {
                shouldDehydrateQuery: query =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === 'pending'
            }
        }
    });

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}
