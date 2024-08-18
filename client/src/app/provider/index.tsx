import { QueryClientProvider } from './queryClient.provider';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

export const RootProvider = ({ children }: React.PropsWithChildren) => {
    return (
        <QueryClientProvider>
            <NextTopLoader easing={'easeInOut'} color="#050505" />
            <Toaster
                position="top-right"
                gutter={8}
                reverseOrder={false}
                containerClassName="text-white"
            />
            {children}
        </QueryClientProvider>
    );
};
