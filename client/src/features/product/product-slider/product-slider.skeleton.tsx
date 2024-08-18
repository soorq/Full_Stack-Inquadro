import { Skeleton } from '~&/src/shared/ui/skeleton';

export const ProductSliderSkeleton = () => {
    return (
        <div className="flex gap-2.5 md:max-w-[625px] xl:max-w-[705px] mx-auto lg:mx-0 max-h-[500px] mb-2.5 lg:mb-0 md:max-h-[600px] xl:max-h-[710px] h-svh w-full shrink-0">
            <div className="sm:flex hidden flex-col gap-2.5 h-full max-w-[170px] w-full">
                <Skeleton className="max-h-[230px] h-full w-full" />
                <Skeleton className="max-h-[230px] h-full w-full" />
                <Skeleton className="max-h-[230px] h-full w-full" />
            </div>
            <Skeleton className="max-w-[525px] w-full h-full" />
        </div>
    );
};
