import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCartAction from "../hooks/useCartAction";
import { deleteCartItemState, fetchGetCart } from "../features/cartSlice";
import priceFormatter from "../utils/priceFormatter";
import { PrimaryLoader } from "../components/Loader";
import { NavLink, useNavigate } from "react-router-dom";
import { ButtonBG } from "../components/Button";
import SummaryCard from "../components/SummaryCard";

const Cart = () => {
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { deleteFromCart, updateCartItem } = useCartAction();

  // Redux state
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.cart.loading);
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Local state
  const [selectedItems, setSelectedItems] = useState([]);

  // Fetch cart items on component mount
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchGetCart({ userId: user._id }));
    } else {
      navigate("/login");
    }
  }, [dispatch, isAuthenticated]);

  // Update selected items when cartItems change
  useEffect(() => {
    const checkedItems = cartItems.filter((item) => item.checked);
    setSelectedItems(checkedItems);
  }, [cartItems]);

  // Handlers
  const handleSelectedItems = (items) => {
    setSelectedItems((prev) => {
      if (prev.includes(items)) {
        return prev.filter((item) => item !== items);
      } else {
        return [...prev, items];
      }
    });
  };

  const handleDeleteCartItem = async (cartItemId) => {
    const response = await deleteFromCart(cartItemId);
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(deleteCartItemState(cartItemId));
    }
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

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to proceed to checkout.");
      return;
    }
    if (!isAuthenticated) {
      alert("Please login to proceed to checkout.");
      return navigate("/login");
    } else {
      navigate("/place-order", { state: { selectedItems } });
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 p-3 md:p-5  bg-purple-100 min-h-dvh">
      <h1 className="font-secondary font-semibold text-2xl text-[#333]">
        My Cart
      </h1>
      <div className="flex flex-col items-center md:items-start justify-start md:justify-center md:flex-row gap-5 w-full">
        {/* Cart list items */}
        <div className="flex flex-col gap-5 bg-white p-3 rounded-lg lg:w-4xl max-w-4xl">
          {isLoading ? (
            <PrimaryLoader />
          ) : cartItems?.length > 0 ? (
            <div>
              <h2 className="font-semibold text-xl text-[#333] p-3 py-6">
                My Cart ({cartItems.length}) items
              </h2>
              <div className="p-3">
                <input
                  type="checkbox"
                  id="selectAllItems"
                  checked={selectedItems.length === cartItems.length}
                  onChange={() => {
                    if (selectedItems.length === cartItems.length) {
                      setSelectedItems([]);
                    } else {
                      setSelectedItems(cartItems);
                    }
                  }}
                />
                <label htmlFor="selectAllItems" className="ml-4">
                  {selectedItems.length === cartItems.length
                    ? "Deselect All"
                    : "Select All"}
                </label>
              </div>
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
                        <div className="flex flex-row items-center gap-4">
                          <p>
                            Price:{" "}
                            <span className="font-semibold">
                              {priceFormatter(
                                Number(item?.product?.discountPrice) || 0
                              )}
                            </span>
                          </p>
                          <p className="italic text-[12px] text-[#333] line-through">
                            {priceFormatter(Number(item?.product?.price) || 0)}
                          </p>
                          <p className="text-[#af5cf7]">{`(${
                            item?.product?.discountPer || 0
                          }% off)`}</p>
                        </div>
                      </div>
                      {/* Quantity & Remove button */}
                      <div className="flex w-full md:w-fit flex-col gap-3 items-center md:items-end">
                        <div className="flex flex-row gap-3 items-center">
                          <button
                            type="button"
                            className="px-2 border border-[#af5cf7] cursor-pointer hover:bg-[#af5cf7] hover:text-white disabled:cursor-not-allowed"
                            disabled={item.quantity === 1}
                            onClick={() =>
                              handleUpdateQuantity(item._id, "dec")
                            }
                          >
                            -
                          </button>
                          <p className="px-4">{item.quantity}</p>
                          <button
                            type="button"
                            className="px-2 border border-[#af5cf7] cursor-pointer hover:bg-[#af5cf7] hover:text-white"
                            onClick={() =>
                              handleUpdateQuantity(item._id, "inc")
                            }
                          >
                            +
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="text-gray-400 text-[12px] hover:text-red-500 cursor-pointer"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this item?"
                                )
                              ) {
                                handleDeleteCartItem(item._id);
                              }
                            }}
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
            <div className="flex flex-col justify-center items-center gap-5 p-10">
              <img
                src="https://img.freepik.com/free-vector/man-shopping-supermarket_74855-7612.jpg"
                className="max-w-2xs"
              />
              <p className="font-semibold">Your cart is empty.</p>
              <NavLink to="/products">
                <ButtonBG text="Shop Now" />
              </NavLink>
            </div>
          )}
        </div>
        {/* Cart total*/}
        <div className="flex flex-col gap-3 bg-white p-3 rounded-lg w-full md:w-[300px] h-fit">
          <h2 className="font-secondary font-semibold text-[#333]">
            Your Order
          </h2>
          <hr className="border border-gray-400" />
          <SummaryCard items={selectedItems} />
          <ButtonBG text="Check out" width="w-full" onClick={handleCheckout} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
