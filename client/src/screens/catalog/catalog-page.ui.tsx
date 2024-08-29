import { Filter, TypeQueryFilters } from '~&/src/features/filter';
import { FilterHeader } from '~&/src/widgets/filter-header';
import { FiltersProducts } from '~&/src/entities/product';
import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';

export const CatalogPage = ({ params }: { params: TypeQueryFilters }) => {
    return (
        <>
            <Header />
            <main className="container mb-10 flex md:flex-row flex-col w-full h-full gap-y-5 md:gap-y-0 gap-x-8">
                <FilterHeader />
                <Filter />
                <FiltersProducts filters={params} />
            </main>
            <Footer />
        </>
    );
};
