import { Skeleton } from '~&/src/shared/ui/skeleton';

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
export const ProductLargeSkeleton = () => {};

export const ProductSearchSkeleton = () => {
    return (
        <div className="flex p-4 w-full h-auto gap-5">
            <Skeleton className="max-h-[230px] h-svh max-w-[170px] w-full" />

            <div className="w-full h-full">
                <div className="flex flex-col gap-1.5 mb-2.5">
                    <Skeleton className="w-full h-[50px]" />
                    <Skeleton className="w-full h-[40px]" />
                    <div className="flex flex-wrap gap-1.5">
                        <Skeleton className="w-[120px] h-[25px]" />
                        <Skeleton className="w-[150px] h-[25px]" />
                        <Skeleton className="w-[100px] h-[25px]" />
                        <Skeleton className="w-[130px] h-[25px]" />
                    </div>
                </div>
                <Skeleton className="w-full h-[50px]" />
            </div>
        </div>
    );
};
