import { Skeleton } from '~&/src/shared/ui/skeleton';

export const ProductOperationSkeleton = () => {
    return (
        <div className="w-full flex flex-col gap-1.5">
            <div className="flex md:flex-col gap-1.5">
                <Skeleton className="w-full h-48 md:h-[72px]" />
                <Skeleton className="w-full h-48 md:h-[72px]" />
                <Skeleton className="w-full h-48 md:h-[72px]" />
            </div>
            <div className="w-full py-3.5 h-auto">
                <div className="flex gap-1.5 mb-1.5">
                    <Skeleton className="w-1/4 h-[50px]" />
                    <Skeleton className="w-1/4 h-[50px]" />
                </div>
                <div className="flex gap-1.5">
                    <Skeleton className="w-7/12 h-[50px]" />
                    <Skeleton className="size-[50px]" />
                </div>
            </div>
        </div>
    );
};
