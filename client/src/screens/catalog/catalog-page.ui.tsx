import { FilterHeader } from '~&/src/widgets/filter-header';
import { FiltersProducts } from '~&/src/entities/product';
import type { filterT } from '~&/src/shared/api/filter';
import { HintOrder } from '~&/src/widgets/hint-order';
import { Filter } from '~&/src/features/filter';
import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';

export function CatalogPage({ params }: { params: filterT.TypeQueryFilters }) {
    return (
        <>
            <Header />
            <main className="container mb-10 flex md:flex-row flex-col w-full h-full gap-y-5 md:gap-y-0 gap-x-8">
                <div className="md:hidden flex mt-10">
                    <HintOrder className="mb-0" />
                </div>
                <FilterHeader />
                <Filter />
                <FiltersProducts filters={params} />
            </main>
            <Footer />
        </>
    );
}
