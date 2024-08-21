import { useProductStore } from '~&/src/entities/product';
import { OptionGroup } from './product-operation.group';
import { SpecifyQty } from '~&/src/features/qty';
import { useEffect, useState } from 'react';
import {
    filterOptionsByIds,
    getRelatedSizeIds,
    getOptions
} from './product-operation.lib';

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
        const determineCurrentId = (): number | undefined => {
            return selectedShadeId ?? selectedUsageId ?? selectedSizeId;
        };

        const currentId = determineCurrentId();

        if (currentId !== undefined) {
            setCurrentId(currentId);
        }
    }, [selectedSizeId, selectedUsageId, selectedShadeId, setCurrentId]);

    const updateOptions = () => {
        if (product) {
            const sizeOptions = getOptions(product.size, true);
            const usageOptions = getOptions(product.usage);
            const shadeOptions = getOptions(product.shade);

            const relatedSizeIds = getRelatedSizeIds(
                sizeOptions,
                selectedSizeId ?? 0
            );

            const filteredUsageOptions =
                selectedSizeId === 0
                    ? usageOptions
                    : filterOptionsByIds(usageOptions, relatedSizeIds);

            if (filteredUsageOptions.length > 0) {
                const relatedUsageIds = filteredUsageOptions
                    .filter(
                        usage => usage.value === filteredUsageOptions[0].value
                    )
                    .map(usage => usage.id);

                setSelectedUsageId(relatedUsageIds[0]);
                const filteredShadeOptions = filterOptionsByIds(
                    shadeOptions,
                    relatedUsageIds
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
            const shadeOptions = Array.isArray(product.shade)
                ? getOptions(product.shade)
                : [{ id: selectedUsageId, value: product.shade }];

            const usageOptions = getOptions(product.usage);

            const relatedUsageValues = usageOptions
                .filter(usage => usage.id === selectedUsageId)
                .map(usage => usage.value);

            const relatedUsageIds = usageOptions
                .filter(usage => relatedUsageValues.includes(usage.value))
                .map(usage => usage.id);

            const filteredShadeOptions = Array.isArray(product.shade)
                ? filterOptionsByIds(shadeOptions, relatedUsageIds)
                : [{ id: selectedUsageId, value: product.shade }];

            setSelectedShadeId(
                filteredShadeOptions.length > 0
                    ? filteredShadeOptions[0].id
                    : selectedUsageId
            );
        }
    }, [selectedUsageId, product]);

    if (!product) return null;

    const sizeOptions = getOptions(product.size, true);
    const usageOptions = getOptions(product.usage);
    const shadeOptions = getOptions(product.shade);

    const relatedSizeIds = getRelatedSizeIds(sizeOptions, selectedSizeId ?? 0);

    const filteredUsageOptions =
        selectedSizeId === 0
            ? usageOptions
            : filterOptionsByIds(usageOptions, relatedSizeIds);

    const relatedUsageValues = selectedUsageId
        ? usageOptions
              .filter(usage => usage.id === selectedUsageId)
              .map(usage => usage.value)
        : [];

    const relatedUsageIds = usageOptions
        .filter(usage => relatedUsageValues.includes(usage.value))
        .map(usage => usage.id);

    const filteredShadeOptions = selectedUsageId
        ? filterOptionsByIds(shadeOptions, relatedUsageIds)
        : shadeOptions;

    const handleSizeChange = (id: number) => {
        setSelectedSizeId(id);
        setSelectedUsageId(undefined);
        setSelectedShadeId(undefined);
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
