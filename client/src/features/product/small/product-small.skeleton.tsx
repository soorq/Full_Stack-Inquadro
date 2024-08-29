import { Skeleton } from '~&/src/shared/ui/skeleton';
import React from 'react';

export const ProductSmallSkeleton = () => {
    return (
        <div className="w-full h-full">
            <Skeleton className="max-h-[345px] rounded-b-none h-svh w-full" />

            <div className="w-full h-auto bg-secondary relative p-4 rounded-b-xl">
                <div className="flex justify-between items-center">
                    <Skeleton className="w-3/6 h-4" />
                    <Skeleton className="w-1/4 h-4" />
                </div>

                <Skeleton className="w-1/3 h-3 mt-2.5 mb-1.5" />

                <div className="flex justify-between items-center mb-2.5">
                    <Skeleton className="w-3/5 h-4" />
                    <Skeleton className="w-1/6 h-4" />
                </div>

                <div className="absolute h-5 -top-5 text-sm left-5 rounded-t-md bg-secondary py-1 px-2 block">
                    <Skeleton className="w-10 rounded-sm h-3" />
                </div>
            </div>
        </div>
    );
};
