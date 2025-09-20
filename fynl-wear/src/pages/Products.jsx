import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../features/productSlice";
import ProductCard from "../components/ProductCard";
import Sort from "../components/Sort";
import productSort from "../constants/productSort";
import categorySort from "../constants/categorySort";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // use states
  const [sortValue, setSortValue] = useState("");
  const [category, setCategory] = useState("");

  // access state values
  const products = useSelector((state) => state.product.products);

  // action after page render
  useEffect(() => {
    handleGetProducts();
  }, [category, sortValue]);

  // get all products handler function
  const handleGetProducts = async () => {
    console.log(category);
    await dispatch(fetchAllProducts({ category, sortBy: sortValue }));
  };

  // handler functions
  const handleSortBy = (value) => {
    setSortValue(value);
  };

  const handleCategory = (value) => {
    setCategory(value);
  };

  return (
    <div className="flex flex-col gap-5 p-2 lg:p-5 max-w-[1440px] m-auto">
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
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      {/* Pagination */}
      <div className="w-full flex justify-center items-center mt-4">
        <Pagination totalPage={10} currentPage={1} />
      </div>
    </div>
  );
};

export default Products;
