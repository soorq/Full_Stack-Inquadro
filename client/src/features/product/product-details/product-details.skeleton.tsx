import { Skeleton } from '~&/src/shared/ui/skeleton';

export const ProductDetailsSkeleton = () => {
    return (
        <div className="w-full h-full max-w-full mt-1 md:mt-0">
            <Skeleton className="w-full h-[380px]" />
        </div>
    );
};
