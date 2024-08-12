import { FiltersProducts } from '~&/src/widgets/filters-products';
import { Filter } from '~&/src/features/filter';
import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';

export const CatalogPage = () => {
    return (
        <>
            <Header />
            <div className="flex container justify-between gap-8">
                <Filter />
                <FiltersProducts />
            </div>
            <Footer />
        </>
    );
};
