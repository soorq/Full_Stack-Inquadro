'use client';

import { useEffect, useState } from 'react';
import {
    filterOptionsByIds,
    getOptions,
    getRelatedSizeIds
} from '~&/src/widgets/product/product-operation/product-operation.lib';
import { OptionGroup } from '~&/src/widgets/product/product-operation/product-operation.group';

type DynamicOption = {
    id: number;
    value: string;
};

const mockProduct = {
    id: 1,
    size: [
        { id: 1, value: 'Small' },
        { id: 2, value: 'Medium' },
        { id: 3, value: 'Large' }
    ],
    usage: [
        { id: 1, value: 'Daily' },
        { id: 2, value: 'Occasional' }
    ],
    shade: [
        { id: 1, value: 'Red' },
        { id: 2, value: 'Blue' },
        { id: 3, value: 'Green' }
    ]
};

export default function ProductOperation() {
    const [selectedSizeId, setSelectedSizeId] = useState<number | undefined>(
        undefined
    );
    const [selectedUsageId, setSelectedUsageId] = useState<number | undefined>(
        undefined
    );
    const [selectedShadeId, setSelectedShadeId] = useState<number | undefined>(
        undefined
    );

    // Здесь используем заглушку вместо store
    const product = mockProduct;

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

        // Здесь можно установить текущий ID, если это необходимо
        // setCurrentId(currentId); // закомментировано, так как у нас нет настоящего store
    }, [selectedSizeId, selectedUsageId, selectedShadeId]);

    const updateOptions = () => {
        if (product) {
            const sizeOptions = getOptions(product.size, true);
            const usageOptions = getOptions(product.usage);
            const shadeOptions: DynamicOption[] = Array.isArray(product.shade)
                ? getOptions(product.shade).filter(
                      (option): option is DynamicOption =>
                          option.id !== undefined
                  )
                : [{ id: selectedShadeId ?? 0, value: product.shade }].filter(
                      option => option.id !== undefined
                  );

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
            const shadeOptions: DynamicOption[] = Array.isArray(product.shade)
                ? getOptions(product.shade).filter(
                      (option): option is DynamicOption =>
                          option.id !== undefined
                  )
                : [{ id: selectedUsageId ?? 0, value: product.shade }].filter(
                      option => option.id !== undefined
                  );

            const usageOptions = getOptions(product.usage);

            const relatedUsageValues = usageOptions
                .filter(usage => usage.id === selectedUsageId)
                .map(usage => usage.value);

            const relatedUsageIds = usageOptions
                .filter(usage => relatedUsageValues.includes(usage.value))
                .map(usage => usage.id);

            const filteredShadeOptions = filterOptionsByIds(
                shadeOptions,
                relatedUsageIds
            );
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
    const shadeOptions: DynamicOption[] = Array.isArray(product.shade)
        ? getOptions(product.shade).filter(option => option.id !== undefined)
        : [{ id: selectedShadeId ?? 0, value: product.shade }].filter(
              option => option.id !== undefined
          );

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
            <div className="flex sm:flex-col w-full sm:max-w-none gap-1.5">
                <div className="bg-secondary w-4/12 sm:w-full rounded-[10px] p-2 sm:p-4">
                    <OptionGroup
                        options={sizeOptions}
                        selectedId={selectedSizeId}
                        highlightId={selectedSizeId}
                        onChange={handleSizeChange}
                    />
                </div>
                <div className="bg-secondary w-6/12 sm:w-full rounded-[10px] p-2 sm:p-4">
                    <OptionGroup
                        options={filteredUsageOptions}
                        selectedId={selectedUsageId}
                        highlightId={selectedUsageId}
                        onChange={handleUsageChange}
                    />
                </div>
                <div className="bg-secondary w-6/12 sm:w-full rounded-[10px] p-2 sm:p-4">
                    <OptionGroup
                        options={filteredShadeOptions}
                        selectedId={selectedShadeId}
                        highlightId={selectedShadeId}
                        onChange={handleShadeChange}
                    />
                </div>
            </div>
        </div>
    );
}
