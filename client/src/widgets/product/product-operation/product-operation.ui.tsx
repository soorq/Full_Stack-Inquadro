'use client';

import { useProductStore } from '~&/src/entities/product';
import { OptionGroup } from './product-operation.group';
import { useEffect, useState } from 'react';
import { ProductQty } from '../product-qty';
import {
    filterOptionsByIds,
    getRelatedSizeIds,
    getOptions
} from './product-operation.lib';

export function ProductOperation() {
    const [selectedSizeId, setSelectedSizeId] = useState<number | undefined>(
        undefined
    );
    const [selectedUsageId, setSelectedUsageId] = useState<number | undefined>(
        undefined
    );
    const [selectedShadeId, setSelectedShadeId] = useState<number | undefined>(
        undefined
    );

    const {
        product_api: product,
        setCurrentId,
        product_client,
        currentId: id
    } = useProductStore(state => state);

    useEffect(() => {
        if (product && product.size) {
            const sizeOptions = getOptions(product.size, true);
            setSelectedSizeId(
                sizeOptions.length > 1
                    ? (id ?? sizeOptions[0]?.id)
                    : (sizeOptions[0]?.id ?? id)
            );
        }
    }, [product]);

    useEffect(() => {
        const currentId =
            selectedShadeId ?? selectedUsageId ?? id ?? selectedSizeId;

        if (currentId !== undefined) {
            setCurrentId(currentId);
        }
    }, [selectedSizeId, selectedUsageId, selectedShadeId, setCurrentId]);

    const updateOptions = () => {
        if (product) {
            const sizeOptions = getOptions(product.size, true);
            const usageOptions = getOptions(product.usage);
            const shadeOptions = Array.isArray(product.shade)
                ? getOptions(product.shade).filter(
                      option => option.id !== undefined
                  )
                : [
                      { id: selectedShadeId ?? id ?? 0, value: product.shade }
                  ].filter(option => option.id !== undefined);

            const relatedSizeIds = getRelatedSizeIds(
                sizeOptions,
                selectedSizeId ?? id ?? 0
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

                setSelectedUsageId(
                    relatedUsageIds.length > 1
                        ? (id ?? relatedUsageIds[0])
                        : (relatedUsageIds[0] ?? id)
                );
                const filteredShadeOptions = filterOptionsByIds(
                    shadeOptions,
                    relatedUsageIds
                );

                setSelectedShadeId(
                    filteredShadeOptions.length > 1
                        ? (id ?? filteredShadeOptions[0]?.id)
                        : (filteredShadeOptions[0]?.id ?? id)
                );
            }
        }
    };

    useEffect(updateOptions, [selectedSizeId, product]);

    useEffect(() => {
        if (selectedUsageId && product) {
            const shadeOptions = Array.isArray(product.shade)
                ? getOptions(product.shade).filter(
                      option => option.id !== undefined
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
    const shadeOptions = Array.isArray(product.shade)
        ? getOptions(product.shade).filter(option => option.id !== undefined)
        : [{ id: selectedShadeId ?? id ?? 0, value: product.shade }].filter(
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

            <ProductQty product={product_client} />
        </div>
    );
}
