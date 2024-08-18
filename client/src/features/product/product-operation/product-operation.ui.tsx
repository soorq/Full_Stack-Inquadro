import { useProductStore } from '~&/src/entities/product';
import { OptionGroup } from './product-operation.group';
import { SpecifyQty } from '~&/src/features/qty';
import { useEffect, useState } from 'react';
import {
    filterOptionsByIds,
    getRelatedSizeIds,
    getSizeOptions
} from './product-operation.lib';

type Option = {
    id: number;
    value: string;
};

// Function to convert various data formats into Option[]
const toOptionArray = (
    data: string | string[] | { id: number; value: string }[]
): Option[] => {
    if (typeof data === 'string') {
        // Single string, return as single Option
        return [{ id: 0, value: data }];
    }

    if (Array.isArray(data)) {
        if (typeof data[0] === 'string') {
            // Array of strings
            return data.map((value, index) => ({ id: index, value }));
        } else if (
            typeof data[0] === 'object' &&
            'id' in data[0] &&
            'value' in data[0]
        ) {
            // Array of objects with id and value
            return data.map(item => ({
                id: item.id,
                value: item.value
            }));
        }
    }

    // Return empty array if no valid data format is found
    return [];
};

const getOptions = (
    data: string | string[] | { id: number; value: string }[],
    getSize?: boolean
): Option[] => {
    if (
        typeof data === 'string' ||
        (Array.isArray(data) && typeof data[0] === 'string')
    ) {
        // Convert to Option[] if the data is a string or array of strings
        return getSize
            ? getSizeOptions(toOptionArray(data))
            : toOptionArray(data);
    }

    // Convert to Option[] if the data is already an array of objects with id and value
    return toOptionArray(data);
};

export const ProductOperation = () => {
    const [selectedSizeId, setSelectedSizeId] = useState<number | undefined>(
        undefined
    );
    const [selectedUsageId, setSelectedUsageId] = useState<number | undefined>(
        undefined
    );
    const [selectedShadeId, setSelectedShadeId] = useState<number | undefined>(
        undefined
    );
    const [qty, setQty] = useState<number>(1);

    const { product_api: product, setCurrentId } = useProductStore(
        state => state
    );

    useEffect(() => {
        if (product && product.size) {
            const sizeOptions = getOptions(product.size, true);
            setSelectedSizeId(sizeOptions[0]?.id);
        }
    }, [product]);

    useEffect(() => {
        if (selectedSizeId) {
            setCurrentId(selectedSizeId);
        }
    }, [selectedSizeId, setCurrentId]);

    const updateOptions = () => {
        if (product) {
            const sizeOptions = getOptions(product.size, true);
            const usageOptions = getOptions(product.usage);
            const shadeOptions = getOptions(product.shade);

            const relatedSizeIds = getRelatedSizeIds(
                sizeOptions,
                selectedSizeId ?? 0
            );

            const filteredUsageOptions = filterOptionsByIds(
                usageOptions,
                relatedSizeIds
            );
            if (filteredUsageOptions.length > 0) {
                setSelectedUsageId(filteredUsageOptions[0].id);

                const filteredShadeOptions = filterOptionsByIds(
                    shadeOptions,
                    filteredUsageOptions.map(usage => usage.id)
                );
                setSelectedShadeId(
                    filteredShadeOptions.length > 0
                        ? filteredShadeOptions[0].id
                        : undefined
                );
            } else {
                setSelectedUsageId(undefined);
                setSelectedShadeId(undefined);
            }
        }
    };

    useEffect(updateOptions, [selectedSizeId, product]);

    useEffect(() => {
        if (selectedUsageId && product) {
            const shadeOptions = getOptions(product.shade);
            const usageOptions = getOptions(product.usage);

            const usageOptionIds = usageOptions
                .filter(usage => usage.id === selectedUsageId)
                .map(usage => usage.id);

            const filteredShadeOptions = filterOptionsByIds(
                shadeOptions,
                usageOptionIds
            );
            setSelectedShadeId(
                filteredShadeOptions.length > 0
                    ? filteredShadeOptions[0].id
                    : undefined
            );
        }
    }, [selectedUsageId, product]);

    if (!product) return null;

    const sizeOptions = getOptions(product.size, true);
    const usageOptions = getOptions(product.usage);
    const shadeOptions = getOptions(product.shade);

    const relatedSizeIds = getRelatedSizeIds(sizeOptions, selectedSizeId ?? 0);
    const filteredUsageOptions = filterOptionsByIds(
        usageOptions,
        relatedSizeIds
    );
    const filteredShadeOptions = selectedUsageId
        ? filterOptionsByIds(
              shadeOptions,
              usageOptions
                  .filter(usage => usage.id === selectedUsageId)
                  .map(usage => usage.id)
          )
        : [];

    const handleSizeChange = (id: number) => {
        setSelectedSizeId(id);
        setSelectedUsageId(undefined); // Reset usage when size changes
        setSelectedShadeId(undefined); // Reset shade when size changes
    };

    const handleUsageChange = (id: number) => setSelectedUsageId(id);
    const handleShadeChange = (id: number) => setSelectedShadeId(id);

    return (
        <div className="flex-col flex gap-1.5 w-full">
            <div className="flex sm:flex-col w-full max-w-max sm:max-w-none gap-1.5">
                <div className="bg-secondary w-full rounded-[10px] p-2 sm:p-4">
                    <OptionGroup
                        options={sizeOptions}
                        selectedId={selectedSizeId}
                        highlightId={selectedSizeId}
                        onChange={handleSizeChange}
                    />
                </div>
                <div className="bg-secondary w-full rounded-[10px] p-2 sm:p-4">
                    <OptionGroup
                        options={filteredUsageOptions}
                        selectedId={selectedUsageId}
                        highlightId={selectedUsageId}
                        onChange={handleUsageChange}
                    />
                </div>
                <div className="bg-secondary w-full rounded-[10px] p-2 sm:p-4">
                    <OptionGroup
                        options={filteredShadeOptions}
                        selectedId={selectedShadeId}
                        highlightId={selectedShadeId}
                        onChange={handleShadeChange}
                    />
                </div>
            </div>

            <SpecifyQty setQty={setQty} withFavorite qty={qty} withCart />
        </div>
    );
};
