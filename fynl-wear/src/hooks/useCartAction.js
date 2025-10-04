import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddToCart } from "../features/cartSlice";

const useCartAction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.cart.error);

  const addToCart = async (productId, quantity = 1, size = "M") => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    await dispatch(
      fetchAddToCart({ userId: user._id, productId, quantity, size })
    );
    console.log(error);
  };

  return { addToCart };
};

export default useCartAction;
