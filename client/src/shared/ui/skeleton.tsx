import { cn } from '~&/src/shared/lib/tw-merge';

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-[10px] bg-primary/10',
                className
            )}
            {...props}
        />
    );
}

export { Skeleton };
