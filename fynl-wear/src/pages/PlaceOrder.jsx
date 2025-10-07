import { useLocation, useNavigate } from "react-router-dom";
import priceFormatter from "../utils/priceFormatter";
import AddressForm from "../components/AddressForm";
import { BackButton } from "../components/Button";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedItems } = location.state || { selectedItems: [] };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col items-center gap-5 p-3 md:p-5  bg-purple-100 min-h-dvh">
      <div className="flex flex-row w-full">
        <BackButton />
        <h1 className="font-semibold text-[#333] text-2xl my-4 m-auto">
          Place Order
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-20 w-full max-w-5xl">
        <ul className="flex flex-col gap-7 divide-y divide-gray-400">
          {selectedItems.map((item) => (
            <li key={item._id} className="flex flex-row gap-4">
              <div>
                <img
                  src={item.product.image1}
                  className="w-[150px] h-[170px]"
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
                <p>
                  Price:{" "}
                  <span className="font-semibold">
                    {priceFormatter(Number(item?.product?.price) || 0)}
                  </span>
                </p>
              </div>
            </li>
          ))}
          {selectedItems.length === 0 && <li>No items selected.</li>}
        </ul>
        {/* Confirm address form */}
        <div className="flex flex-col gap-8">
          <div>
            <AddressForm />
          </div>
          {/* Order summary */}
          <div className="bg-white p-7 h-fit text-[14px]">
            <p className="font-semibold text-[#333] text-xl text-center">
              Order Summary
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
