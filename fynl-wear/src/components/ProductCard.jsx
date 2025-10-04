import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import priceFormatter from "../utils/priceFormatter";
import { ButtonNoBG } from "./Button";
import useCartAction from "../hooks/useCartAction";

const ProductCard = (props) => {
  const {
    name,
    image1,
    price,
    rating,
    category,
    discountPer,
    discountPrice,
    productId,
  } = props.product;

  const { addToCart } = useCartAction();

  return (
    <div className="w-full">
      <NavLink to={`/product/${productId}`}>
        <div>
          <img src={image1} className="w-full md:h-[370px]" />
        </div>
        <div className="flex flex-row justify-between items-start mt-3 text-[#333]">
          <div>
            <h1 className="font-bold text-[16px]">{name}</h1>
            <p className="font-semibold text-[11px]">
              {category.toUpperCase()}
            </p>
            <div className="flex gap-2 items-center">
              <p className="font-bold">{priceFormatter(discountPrice || 0)}</p>
              <p className="italic text-[12px] text-[#333] line-through">
                {priceFormatter(price)}
              </p>
              <p className="text-[#af5cf7]">{`(${discountPer || 0}% off)`}</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-[#af5cf7]">
              <FaStar />
            </p>
            <p className="font-semibold">{rating}</p>
          </div>
        </div>
      </NavLink>
      <div className="w-full mt-3">
        <ButtonNoBG text="Add to cart" onClick={() => addToCart(productId)} />
      </div>
    </div>
  );
};

export default ProductCard;
