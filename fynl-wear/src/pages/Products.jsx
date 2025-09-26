import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../features/productSlice";
import { NavLink } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Sort from "../components/Sort";
import productSort from "../constants/productSort";
import categorySort from "../constants/categorySort";
import Pagination from "../components/Pagination";
import { PrimaryLoader } from "../components/Loader";

const Products = () => {
  const dispatch = useDispatch();

  // use states
  const [sortValue, setSortValue] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // access state values
  const products = useSelector((state) => state.product.products);
  const totalPage = useSelector((state) => state.product.totalPage);
  const isLoading = useSelector((state) => state.product.loading);

  // action after page render
  useEffect(() => {
    handleGetProducts();
  }, [currentPage]);

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
      <div className="w-full gap-4 hidden md:flex">
        {/* Sort and Filters */}
        <div>
          <Sort
            sortValues={productSort}
            className="w-[100px]"
            onChangeHandler={handleSortBy}
          />
        </div>
        <div>
          <Sort sortValues={categorySort} onChangeHandler={handleCategory} />
        </div>
      </div>
      {/* product cards list */}
      <ul
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4
      gap-4 lg:gap-8"
      >
        {products.map((product) => (
          <li key={product.productId} className="w-full">
            <NavLink to={`/product/${product.productId}`}>
              <ProductCard product={product} />
            </NavLink>
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
