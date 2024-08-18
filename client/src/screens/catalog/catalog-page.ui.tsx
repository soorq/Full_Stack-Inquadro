'use client';
import { FiltersProducts } from '~&/src/widgets/filters-products';
import { FilterHeader } from '~&/src/widgets/filter-header';
import { ProductQueries } from '~&/src/entities/product';
import { Filter } from '~&/src/features/filter';
import { Header } from '~&/src/widgets/header';
import { Footer } from '~&/src/widgets/footer';

export const CatalogPage = ({ params }: any) => {
    return (
        <>
            <Header />
            <FilterHeader />
            <section className="grid grid-cols-[270px,1fr] gap-x-8 container">
                <Filter />
                <FiltersProducts
                    params={params}
                    productsInfiniteQueryOptions={boundArticlesInfiniteQuery}
                />
            </section>
            <Footer />
        </>
    );
};

const boundArticlesInfiniteQuery =
    ProductQueries.infinityProductsQuery.bind(ProductQueries);
