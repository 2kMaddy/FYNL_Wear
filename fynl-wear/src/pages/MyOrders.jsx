import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchGetOrderById } from "../features/orderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.order.orderList);

  console.log(`Orders : ${orders}`);

  useEffect(() => {
    handleGetOrder();
  }, []);

  // handlers
  const handleGetOrder = async () => {
    const response = await dispatch(fetchGetOrderById({ userId: user._id }));
    console.log(`response: ${response.meta.requestStatus}`);
    if (response.meta.requestStatus === "fulfilled") {
      console.log(orders);
    }
  };

  return <div>My Orders</div>;
};

export default MyOrders;
