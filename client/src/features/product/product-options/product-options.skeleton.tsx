import { Skeleton } from '~&/src/shared/ui/skeleton';

export const ProductOptionsSkeleton = () => {
    return (
        <div className="w-full h-full flex flex-col gap-1.5">
            <Skeleton className="max-w-full w-full h-[80px]" />
            <Skeleton className="max-w-full w-full h-[64px]" />
        </div>
    );
};
