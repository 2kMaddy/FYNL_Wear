import { useLocation, useNavigate } from "react-router-dom";
import priceFormatter from "../../utils/priceFormatter";
import AddressForm from "../../components/AddressForm";
import { BackButton, ButtonBG } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SummaryCard from "../../components/SummaryCard";
import { fetchCreateOrder } from "../../features/orderSlice";
import getSubTotal from "../../utils/getSubTotal";
import { fetchShippingAddress } from "../../features/addressSlice";
import { paymentVerification } from "../../services/orderServices";
import { PaymentFailed, PaymentSuccess } from "../../components/PaymentResponse";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);

  const { selectedItems } = location.state || { selectedItems: [] };

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const shippingAddress = useSelector((state) => state.auth.shippingAddress);

  const totalAmount = getSubTotal(selectedItems);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchShippingAddress({ userId: user._id }));
    }
  }, [user?._id]);

  const handleCreateOrder = async () => {
    try {
      // Step 1: Get Razorpay order from backend
      const orderRes = await dispatch(fetchCreateOrder({ totalAmount }));
      const razorpayOrder = orderRes.payload.order;

      const options = {
        key: import.meta.env.VITE_APP_RAZORPAY_KEY,
        amount: razorpayOrder?.amount,
        currency: "INR",
        name: "FYNL Wear",
        description: `Payment for Order #${razorpayOrder?.id}`,
        order_id: razorpayOrder?.id,
        handler: async (response) => {
          const verifyPayload = {
            ...response,
            userId: user._id,
            items: selectedItems,
            paymentMethod: "RazorPay",
            grandTotal: totalAmount,
            shippingAddress,
          };
          const verifyRes = await paymentVerification(verifyPayload);
          if (verifyRes.data.success) {
            setPaymentSuccess(true);
          } else {
            setPaymentFailed(true);
          }
        },
        theme: { color: "#3399cc" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 p-3 md:p-5  bg-purple-100 min-h-dvh">
      <div className="flex flex-row w-full">
        <BackButton />
        <h1 className="font-semibold text-[#333] text-2xl my-4 m-auto">
          Place Order
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-10 w-full max-w-5xl">
        <ul className="flex flex-col gap-7 divide-y divide-gray-400 bg-white rounded-2xl w-full px-2">
          {selectedItems.map((item) => (
            <li
              key={item._id}
              className="p-3 py-7 flex flex-row items-start md:items-center gap-6"
            >
              <div>
                <img
                  src={item.product.image1}
                  className="w-[110px] h-[120px]"
                />
              </div>
              <div className="flex flex-col gap-1 text-[14px]">
                <p className="font-semibold">{item?.product?.name}</p>
                <div className="flex flex-row gap-3 items-center">
                  <p>
                    Qty: <span className="font-semibold">{item?.quantity}</span>
                  </p>
                  <p className="font-bold">|</p>
                  <p>
                    Size: <span className="font-semibold">{item?.size}</span>
                  </p>
                  <p className="font-bold">|</p>
                  <p>
                    Color: <span className="font-semibold">{item?.color}</span>
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
                    {priceFormatter(item?.product?.price)}
                  </p>
                  <p className="text-[#af5cf7]">{`(${
                    item?.product?.discountPer || 0
                  }% off)`}</p>
                </div>
              </div>
            </li>
          ))}
          {selectedItems.length === 0 && (
            <p className="flex justify-center items-center font-bold text-[#333] text-2xl h-[60vh] w-full">
              No items selected.
            </p>
          )}
        </ul>
        {/* Confirm address form */}
        <div className="flex flex-col gap-8">
          {isAddressConfirmed ? (
            <div className="flex flex-col gap-3 bg-white p-3 rounded-lg w-full md:w-[300px] h-fit">
              <h2 className="font-semibold text-[#333] text-xl text-center">
                Order Summary
              </h2>
              <hr className="border border-gray-400" />
              <SummaryCard items={selectedItems} />
              <ButtonBG
                text="Make Payment"
                width="w-full"
                onClick={handleCreateOrder}
              />
            </div>
          ) : (
            <div>
              <AddressForm isConfirmed={setIsAddressConfirmed} />
            </div>
          )}
        </div>
      </div>
      {paymentSuccess && <PaymentSuccess />}
      {paymentFailed && <PaymentFailed />}
    </div>
  );
};

export default PlaceOrder;
