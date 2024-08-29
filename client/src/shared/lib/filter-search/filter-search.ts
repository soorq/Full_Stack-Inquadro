export function formatSearchFilters(
    filters: Record<string, string | undefined> | undefined
): string {
    const queryParams = new URLSearchParams();

    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) {
                if (value.includes(',')) {
                    const valueArray = value.split(',');
                    queryParams.append(
                        `filter.${key}`,
                        `$in:${valueArray.join(',')}`
                    );
                } else {
                    queryParams.append(`filter.${key}`, String(value));
                }
            }
        });
    }

    return queryParams.toString();
}
