import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../features/productSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Sort from "../../components/Sort";
import productSort from "../../constants/productSort";
import categorySort from "../../constants/categorySort";
import Pagination from "../../components/Pagination";
import { PrimaryLoader } from "../../components/Loader";
import { BackButton } from "../../components/Button";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryPage = parseInt(searchParams.get("page")) || 1;
  const queryCategory = searchParams.get("category") || "allProducts";
  const querySortBy = searchParams.get("sortBy") || "latest";

  // use states
  const [sortValue, setSortValue] = useState(querySortBy);
  const [category, setCategory] = useState(queryCategory);
  const [currentPage, setCurrentPage] = useState(queryPage);

  // access state values
  const products = useSelector((state) => state.product.products);
  const totalPage = useSelector((state) => state.product.totalPage);
  const isLoading = useSelector((state) => state.product.loading);

  // action after page render
  useEffect(() => {
    handleGetProducts();
    navigate(
      `/products?page=${currentPage}&category=${category}&sortBy=${sortValue}`
    );
    window.scrollTo({ top: 0, behavior: "smooth" }); // or "auto"
  }, [currentPage, category, sortValue]);

  // get all products handler function
  const handleGetProducts = async () => {
    await dispatch(
      fetchAllProducts({
        category,
        sortBy: sortValue,
        page: currentPage,
      })
    );
  };

  // handler functions
  const handleSortBy = (value) => {
    setSortValue(value);
  };

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleCurrentPage = (value) => {
    if (value === "dec" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (value === "inc" && totalPage > currentPage) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage(value);
    }
  };

  return (
    <div
      className="flex flex-col gap-5 p-2 lg:p-5 max-w-[1440px] m-auto
    bg-purple-100 min-h-dvh
    "
    >
      <div className="flex flex-row w-full my-4">
        <BackButton />
        <h1 className="font-semibold font-primary text-2xl text-[#333] m-auto">
          Products List
        </h1>
      </div>
      <div className="w-fit md:w-full gap-4 flex flex-col md:flex-row">
        {/* Sort and Filters */}
        <div className="bg-gray-300 rounded-2xl p-1 mr-5">
          <Sort
            sortValues={productSort}
            className="w-[100px]"
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
      {/* product cards list */}
      <ul
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4
      gap-8 lg:gap-8"
      >
        {products.map((product) => (
          <li key={product.productId} className="w-full">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      {/* Pagination */}
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
