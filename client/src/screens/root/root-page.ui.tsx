import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';

export const RootPageUi = () => {
    return (
        <>
            <Header />
            <main className="min-h-svh max-h-[50svh]">Root Page</main>
            <Footer />
        </>
    );
};
