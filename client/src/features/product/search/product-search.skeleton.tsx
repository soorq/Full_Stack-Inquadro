import { Skeleton } from '~&/src/shared/ui/skeleton';

export const ProductSearchSkeleton = () => {
    return (
        <div className="flex p-4 w-full h-auto gap-5">
            <Skeleton className="sm:max-h-[230px] h-svh sm:max-w-[170px] max-w-[135px] max-h-[190px] w-full" />

            <div className="w-full h-full">
                <div className="flex flex-col gap-1.5 mb-2.5">
                    <Skeleton className="w-full h-[50px]" />
                    <Skeleton className="w-full h-[40px]" />
                    <div className="flex-wrap gap-1.5 hidden sm:flex">
                        <Skeleton className="w-[120px] h-[25px]" />
                        <Skeleton className="w-[150px] h-[25px]" />
                        <Skeleton className="w-[100px] h-[25px]" />
                        <Skeleton className="w-[130px] h-[25px]" />
                    </div>
                </div>
                <Skeleton className="w-full h-9 sm:h-[50px]" />
            </div>
        </div>
    );
};
