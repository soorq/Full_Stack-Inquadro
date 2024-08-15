import { FiltersProducts } from '~&/src/widgets/filters-products';
import { FilterHeader } from '~&/src/widgets/filter-header';
import { Filter } from '~&/src/features/filter';
import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';

export const CatalogPage = () => {
    return (
        <>
            <Header />
            <FilterHeader />
            <section className="flex container justify-between gap-8">
                <Filter />
                <FiltersProducts />
            </section>
            <Footer />
        </>
    );
};
