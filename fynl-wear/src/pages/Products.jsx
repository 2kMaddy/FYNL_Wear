import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../features/productSlice";
import ProductCard from "../components/ProductCard";
import Sort from "../components/Sort";
import productSort from "../constants/productSort";
import categorySort from "../constants/categorySort";
import Pagination from "../components/Pagination";

const Products = () => {
  const dispatch = useDispatch();

  // use states

  // access state values
  const products = useSelector((state) => state.product.products);

  // action after page render
  useEffect(() => {
    handleGetProducts();
  }, []);

  // get all products handler function
  const handleGetProducts = async () => {
    await dispatch(fetchAllProducts());
  };

  // functions
  const handleSetSearchKey = (value) => {
    setSearchKey(value);
    console.log(value);
  };

  return (
    <div className="flex flex-col gap-5 p-2 lg:p-5 max-w-[1440px] m-auto">
      <div className="w-full gap-4 hidden md:flex">
        {/* Sort and Filters */}
        <div>
          <Sort sortValues={productSort} className="w-[100px]" />
        </div>
        <div>
          <Sort sortValues={categorySort} />
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
