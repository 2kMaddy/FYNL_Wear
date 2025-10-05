import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCartAction from "../hooks/useCartAction";
import { deleteCartItemState, fetchGetCart } from "../features/cartSlice";
import priceFormatter from "../utils/priceFormatter";
import { PrimaryLoader } from "../components/Loader";

const Cart = () => {
  const dispatch = useDispatch();

  const { deleteFromCart, updateCartItem } = useCartAction();
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.cart.loading);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const error = useSelector((state) => state.cart.error);

  const [selectedItems, setSelectedItems] = useState([]);

  // Fetch cart items on component mount
  useEffect(() => {
    dispatch(fetchGetCart({ userId: user._id }));
  }, [dispatch]);

  // Update selected items when cartItems change
  useEffect(() => {
    setSelectedItems(cartItems);
  }, [cartItems]);

  const handleDeleteCartItem = async (cartItemId) => {
    const response = await deleteFromCart(cartItemId);
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(deleteCartItemState(cartItemId));
    }
  };

  const handleSelectedItems = (items) => {
    setSelectedItems((prev) => {
      if (prev.includes(items)) {
        return prev.filter((item) => item !== items);
      } else {
        return [...prev, items];
      }
    });
  };

  const handleUpdateQuantity = async (cartItemId, type) => {
    const item = cartItems.find((item) => item._id === cartItemId);
    if (!item) return;
    let newQuantity = item.quantity;
    if (type === "dec" && item.quantity > 1) {
      newQuantity = item.quantity - 1;
    } else if (type === "inc") {
      newQuantity = item.quantity + 1;
    }

    await updateCartItem(cartItemId, newQuantity);
  };

  console.log(cartItems);
  console.log(selectedItems);

  return (
    <div className="flex flex-col gap-5 p-3 md:p-5  bg-purple-100 min-h-dvh">
      <h1 className="font-secondary font-semibold text-2xl text-[#333]">
        My Cart
      </h1>
      {/* Cart list items */}
      <div className="flex flex-col gap-5 bg-white p-3 rounded-lg max-w-3xl">
        {isLoading ? (
          <PrimaryLoader />
        ) : cartItems?.length > 0 ? (
          <div>
            <h2 className="font-semibold text-xl text-[#333] p-3 py-6">
              My Cart ({cartItems.length}) items
            </h2>
            <ul className="divide-y divide-gray-400 flex flex-col">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="p-3 py-7 flex flex-row items-start md:items-center gap-6"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={() => handleSelectedItems(item)}
                      checked={selectedItems.some((i) => i._id === item._id)}
                    />
                    <img
                      src={item?.product?.image1}
                      alt={item?.product?.name}
                      className="w-[110px] h-[110px]"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
                    {/* Product detail */}
                    <div className="flex flex-col gap-1 text-[14px]">
                      <p className="font-semibold">{item?.product?.name}</p>
                      <div className="flex flex-row gap-3 items-center">
                        <p>
                          Qty:{" "}
                          <span className="font-semibold">
                            {item?.quantity}
                          </span>
                        </p>
                        <p className="font-bold">|</p>
                        <p>
                          Size:{" "}
                          <span className="font-semibold">{item?.size}</span>
                        </p>
                        <p className="font-bold">|</p>
                        <p>
                          Color:{" "}
                          <span className="font-semibold">{item?.color}</span>
                        </p>
                      </div>
                      <p>
                        Price:{" "}
                        <span className="font-semibold">
                          {priceFormatter(Number(item?.product?.price) || 0)}
                        </span>
                      </p>
                    </div>
                    {/* Quantity & Remove button */}
                    <div className="flex w-full md:w-fit flex-col gap-3 items-center md:items-end">
                      <div className="flex flex-row gap-3 items-center">
                        <button
                          type="button"
                          className="px-2 border border-[#af5cf7] cursor-pointer hover:bg-[#af5cf7] hover:text-white disabled:cursor-not-allowed"
                          disabled={item.quantity === 1}
                          onClick={() => handleUpdateQuantity(item._id, "dec")}
                        >
                          -
                        </button>
                        <p className="px-4">{item.quantity}</p>
                        <button
                          type="button"
                          className="px-2 border border-[#af5cf7] cursor-pointer hover:bg-[#af5cf7] hover:text-white"
                          onClick={() => handleUpdateQuantity(item._id, "inc")}
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="text-gray-400 text-[12px] hover:text-red-500 cursor-pointer"
                          onClick={() => handleDeleteCartItem(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
