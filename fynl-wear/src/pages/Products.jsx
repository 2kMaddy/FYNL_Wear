import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../features/productSlice";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Sort from "../components/Sort";
import productSort from "../constants/productSort";

const Products = () => {
  const dispatch = useDispatch();

  // use states
  const [searchKey, setSearchKey] = useState("");

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
      {/* Search & Sort options */}
      <div className="w-full flex">
        {/* Search bar */}
        {/* <div className="w-full md:w-[50%]">
          <SearchBar
            placeHolder="Search Product"
            searcFunc=""
            onChangeFunc={handleSetSearchKey}
          />
        </div> */}
        {/* Sort option */}
        <div>
          <Sort sortValues={productSort} />
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
    </div>
  );
};

export default Products;
