import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAddToCart,
  fetchDeleteCartItem,
  fetchUpdateCartItem,
} from "../features/cartSlice";

const useCartAction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleAuthorised = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  };

  const addToCart = async (productId, quantity = 1, size = "M", color) => {
    handleAuthorised();

    await dispatch(
      fetchAddToCart({ userId: user._id, productId, quantity, size, color })
    );
  };

  const deleteFromCart = async (cartItemId) => {
    handleAuthorised();
    const response = await dispatch(
      fetchDeleteCartItem({ userId: user._id, cartItemId })
    );
    return response;
  };

  const updateCartItem = async (cartItemId, quantity) => {
    handleAuthorised();
    await dispatch(
      fetchUpdateCartItem({ userId: user._id, cartItemId, quantity })
    );
  };

  return { addToCart, deleteFromCart, updateCartItem };
};

export default useCartAction;
