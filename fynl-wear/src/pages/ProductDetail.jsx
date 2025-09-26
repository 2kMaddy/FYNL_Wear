import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../features/productSlice";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import priceFormatter from "../utils/priceFormatter";
import { ButtonBG, ButtonNoBG } from "../components/Button";

const ProductDetail = () => {
  const dispatch = useDispatch();

  const { productId } = useParams();

  const product = useSelector((state) => state.product.product);
  console.log(product);

  useEffect(() => {
    handleGetProductById();
  }, []);

  const handleGetProductById = async () => {
    await dispatch(fetchProductById({ productId }));
  };

  return (
    <div>
      <div>
        <h1>Product Detail</h1>
      </div>

      <div>
        {/* If product fetched successfully */}
        {product && (
          <div>
            <div>
              <img src={product.image1} alt={product.name} />
            </div>
            <div>
              <p className="font-secondary">{product.category}</p>
              <h2>{product.name}</h2>
              <div className="flex flex-row items-center gap-1">
                <p className="text-[#af5cf7]">
                  <FaStar />
                </p>
                <p className="font-semibold">{product.rating}</p>
              </div>
              <div className="flex gap-2 items-center">
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
              <div>
                <p>{product.description}</p>
              </div>

              {/* Color of the t-shirts available in */}
              <div>
                <p>Color: {product.color[0]}</p>
                <div>
                  {product.color.map((each) => (
                    <div
                      style={{ backgroundColor: each || "gray" }}
                      className="h-[30px] w-[30px] rounded-4xl"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Available sizes */}
              <div>
                <p>Size: {product.size[0]}</p>
                <div>
                  {product.size.map((each) => (
                    <p>{each}</p>
                  ))}
                </div>
              </div>

              {/* Quantity controll button */}
              <div>
                <button type="button">-</button>
                <p>1</p>
                <button type="button">+</button>
              </div>

              {/* Add to cart and Buy now button */}
              <div>
                <ButtonNoBG text="Add to Cart" width="w-fit" />
                <ButtonBG text="Buy Now" />
              </div>

              {/* Review section */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
