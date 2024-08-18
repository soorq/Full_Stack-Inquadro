import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';
import { Navbar } from '~&/src/widgets/navbar/navbar.ui';

export const RootPageUi = () => {
    return (
        <>
            <Header />
            <main className="min-h-svh max-h-[50svh]">
                <div className="max-w-[295px]">
                    <Navbar />
                </div>
            </main>
            <Footer />
        </>
    );
};
