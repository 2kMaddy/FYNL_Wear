import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../features/productSlice";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import priceFormatter from "../utils/priceFormatter";
import { ButtonBG, ButtonNoBG, BackButton } from "../components/Button";
import { PrimaryLoader } from "../components/Loader";
import useCartAction from "../hooks/useCartAction";

const ProductDetail = () => {
  const dispatch = useDispatch();

  const { addToCart } = useCartAction();
  const { productId } = useParams();

  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");

  const product = useSelector((state) => state.product.product);
  const isLoading = useSelector((state) => state.product.loading);

  useEffect(() => {
    handleGetProductById();
  }, []);

  const handleGetProductById = async () => {
    await dispatch(fetchProductById({ productId }));
  };

  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "inc") {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 p-5  bg-purple-100 min-h-dvh font-secondary">
      <div className="flex flex-row w-full">
        <BackButton />
        <h1 className="font-semibold font-primary text-2xl text-[#333] m-auto">
          Product Detail
        </h1>
      </div>

      <div className="max-w-6xl mt-12">
        {/* Loader */}
        {isLoading && <PrimaryLoader />}
        {/* If product fetched successfully */}
        {product && (
          <div className="flex flex-col md:flex-row justify-around gap-7">
            <div>
              <img
                src={product.image1}
                alt={product.name}
                className="w-6xl h-[700px] rounded-2xl"
              />
            </div>
            <div>
              <p className="font-mono text-[#333] text-[16px]">
                {product.category}
              </p>
              <h2 className="font-bold text-2xl">{product.name}</h2>
              <div className="flex flex-row items-center gap-1 mt-2">
                <p className="text-[#af5cf7]">
                  <FaStar />
                </p>
                <p className="font-semibold">{product.rating}</p>
              </div>
              <div className="flex gap-2 items-center mt-2">
                <p className="font-bold">
                  {priceFormatter(product.discountPrice || 0)}
                </p>
                <p className="italic text-[12px] text-[#333] line-through">
                  {priceFormatter(product.price)}
                </p>
                <p className="text-[#af5cf7]">{`(${
                  product.discountPer || 0
                }% off)`}</p>
              </div>
              <div className="mt-4 text-[#333] font-semibold">
                <p>{product.description}</p>
              </div>

              {/* Color of the t-shirts available in */}
              <div className="mt-4">
                <p>
                  <span className="font-semibold">Color: </span>
                  {color || product.color[0]}
                </p>
                <div className="flex flex-row gap-2 mt-3">
                  {product.color.map((each, index) => (
                    <div
                      key={index}
                      style={{ backgroundColor: each || "gray" }}
                      className={`h-[30px] w-[30px] rounded-4xl border border-[#af5cf7] ${
                        color === each ? "border-[#af5cf7]" : ""
                      } cursor-pointer hover:bg-[#af5cf7]`}
                      onClick={() => setColor(each)}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Available sizes */}
              <div className="mt-4">
                <p>
                  <span className="font-semibold">Size: </span>
                  {size || product.size[0]}
                </p>
                <div className="flex flex-row gap-2 mt-3">
                  {product.size.map((each, index) => (
                    <p
                      key={index}
                      className={`py-1 px-8 border border-[#af5cf7] cursor-pointer hover:bg-[#af5cf7] hover:text-white ${
                        size === each ? "bg-[#af5cf7] text-white" : ""
                      }`}
                      onClick={() => setSize(each)}
                    >
                      {each}
                    </p>
                  ))}
                </div>
              </div>

              {/* Quantity controll button */}
              <div className="mt-4">
                <p className="font-semibold">Quantity: </p>
                <div className="flex flex-row gap-4 mt-3 items-center">
                  <button
                    type="button"
                    className="py-1 px-8 border border-[#af5cf7] cursor-pointer hover:bg-[#af5cf7] hover:text-white"
                    onClick={() => handleQuantity("dec")}
                  >
                    -
                  </button>
                  <p className="px-4">{quantity}</p>
                  <button
                    type="button"
                    className="py-1 px-8 border border-[#af5cf7] cursor-pointer hover:bg-[#af5cf7] hover:text-white"
                    onClick={() => handleQuantity("inc")}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to cart and Buy now button */}
              <div className="mt-9 flex gap-4">
                <ButtonNoBG
                  text="Add to Cart"
                  width="w-[200px]"
                  onClick={() => {
                    addToCart(
                      product.productId,
                      quantity,
                      size || product.size[0],
                      color || product.color[0]
                    );
                  }}
                />
                <ButtonBG text="Buy Now" width="w-[200px]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
