export function formatSearchFilters(
    filters: Record<string, string | undefined> | undefined
): string {
    const queryParams = new URLSearchParams();

    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) {
                if (Array.isArray(value)) {
                    queryParams.append(`filter.${key}`, value.join(','));
                } else {
                    queryParams.append(`filter.${key}`, String(value));
                }
            }
        });
    }

    return queryParams.toString();
}
