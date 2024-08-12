import { SearchService } from '~&/src/shared/api/search';
import { queryOptions } from '@tanstack/react-query';

export class SearchQueries {
    protected static keys = {
        searchRoot: ['search'] as const,
        searchByQuery: ['search', 'by-query'] as const
    };

    static searchByQuery(query: string) {
        return queryOptions({
            queryKey: [...this.keys.searchByQuery, query],
            queryFn: ({ signal }) => {
                return SearchService.productsQuery(query, { signal });
            },
            enabled: !!query
        });
    }
}
