import { FilterQuery } from '~&/src/entities/filter/filter.types';

export function formatSearchFilters({ filters }: FilterQuery): string {
    const queryParams = new URLSearchParams();

    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            // Ignore undefined values
            if (value !== undefined) {
                // If value is an array, join it with commas
                if (Array.isArray(value)) {
                    queryParams.append(`filter.${key}`, value.join(','));
                } else {
                    // Otherwise, convert the value to string
                    queryParams.append(`filter.${key}`, String(value));
                }
            }
        });
    }

    return queryParams.toString();
}
