import { Skeleton } from '~&/src/shared/ui/skeleton';

export const ProductOrderSkeleton = () => {
    return (
        <div className="flex gap-2.5 sm:gap-5 p-4 w-full">
            <Skeleton className="max-w-[130px] max-h-[195px] w-full h-svh" />

            <div className="flex flex-col gap-2.5 w-full">
                <Skeleton className="h-[55px] w-full" />
                <div className="flex gap-2.5">
                    <Skeleton className="w-full h-7" />
                    <Skeleton className="w-full h-7" />
                </div>
                <div className="flex gap-2.5">
                    <Skeleton className="w-2/3 h-10" />
                    <Skeleton className="w-1/3 h-10" />
                </div>
                <div className="flex gap-1.5 w-full">
                    <div className="flex gap-1.5">
                        <Skeleton className="size-10" />
                        <Skeleton className="size-10" />
                        <Skeleton className="size-10" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                </div>

                <Skeleton />
            </div>
        </div>
    );
};
