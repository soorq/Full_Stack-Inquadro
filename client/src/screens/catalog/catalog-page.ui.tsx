import { FiltersProducts } from '~&/src/widgets/filters-products';
import { filterTypes } from '~&/src/entities/filter';
import { Filter } from '~&/src/features/filter';
import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';

export const CatalogPage = ({
    params
}: {
    params: filterTypes.TypeQueryFilters;
}) => {
    return (
        <>
            <Header />
            <section className="container relative mb-10 flex w-full h-full gap-x-8">
                <Filter />
                <FiltersProducts filters={params} />
            </section>
            <Footer />
        </>
    );
};
