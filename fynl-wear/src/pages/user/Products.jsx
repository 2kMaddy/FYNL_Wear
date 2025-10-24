import ProductCard from "../../components/ProductCard";
import Sort from "../../components/Sort";
import productSort from "../../constants/productSort";
import categorySort from "../../constants/categorySort";
import Pagination from "../../components/Pagination";
import { PrimaryLoader } from "../../components/Loader";
import { BackButton } from "../../components/Button";
import { useProducts } from "../../hooks/useProducts";

const Products = () => {
  const {
    products,
    totalPage,
    isLoading,
    sortValue,
    category,
    currentPage,
    handleSortBy,
    handleCategory,
    handleCurrentPage,
  } = useProducts();

  return (
    <div className="flex flex-col gap-5 p-2 lg:p-5 max-w-[1440px] m-auto bg-purple-100 min-h-dvh">
      <div className="flex flex-row w-full my-4">
        <BackButton />
        <h1 className="font-semibold font-primary text-2xl text-[#333] m-auto">
          Products List
        </h1>
      </div>

      <div className="w-fit md:w-full gap-4 flex flex-col md:flex-row">
        <div className="bg-gray-300 rounded-2xl p-1 mr-5">
          <Sort
            sortValues={productSort}
            onChangeHandler={handleSortBy}
            currentValue={sortValue}
          />
        </div>
        <div className="bg-gray-300 rounded-2xl p-1 mr-5">
          <Sort
            sortValues={categorySort}
            onChangeHandler={handleCategory}
            currentValue={category}
          />
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-8">
        {products.map((product) => (
          <li key={product.productId}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      <div className="w-full flex justify-center items-center mt-4">
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          setPage={handleCurrentPage}
        />
      </div>

      {isLoading && <PrimaryLoader />}
    </div>
  );
};

export default Products;
