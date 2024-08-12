import { QueryClientProvider } from './queryClient.provider';
import { Toaster } from 'react-hot-toast';

export const RootProvider = ({ children }: React.PropsWithChildren) => {
    return (
        <QueryClientProvider>
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
