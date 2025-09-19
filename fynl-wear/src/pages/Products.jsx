import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../features/productSlice";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const dispatch = useDispatch();

  // access state values
  const products = useSelector((state) => state.product.products);
  console.log(products);

  // action after page render
  useEffect(() => {
    handleGetProducts();
  }, []);

  // get all products handler function
  const handleGetProducts = async () => {
    await dispatch(fetchAllProducts());
  };

  return (
    <div>
      {/* product cards list */}
      <ul>
        {products.map((product) => (
          <li key={product.productId}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
