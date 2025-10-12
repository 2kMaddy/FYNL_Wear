import { NavLink } from "react-router-dom";
import { ButtonBG } from "./Button";

export const PaymentSuccess = () => {
  return (
    <div className="fixed top-[20%] bg-white rounded-2xl p-5 flex flex-col justify-center items-center m-auto w-[300px] lg:w-[30%] shadow-2xl shadow-green-800">
      <img
        src="https://res.cloudinary.com/dhavsxxnd/image/upload/v1760253390/check-cross-mark-gradient-set_1_1_slpgxk.png"
        className="w-[100px] h-[100px]"
      />
      <div className="mt-5 flex flex-col items-center gap-5">
        <h1 className="text-[#333] font-black text-2xl">Payment successful!</h1>
        <p>Thank you for your purchase.</p>
        <NavLink to="/products">
          <ButtonBG text="Continue Shopping" />
        </NavLink>
      </div>
    </div>
  );
};

export const PaymentFailed = () => {
  return (
    <div className="fixed top-[20%] bg-white rounded-2xl p-5 flex flex-col justify-center items-center m-auto w-[300px] lg:w-[30%] shadow-2xl shadow-red-800 text-center">
      <img
        src="https://res.cloudinary.com/dhavsxxnd/image/upload/v1760253397/check-cross-mark-gradient-set_ytw36l.png"
        className="w-[100px] h-[100px]"
      />
      <div className="mt-5 flex flex-col items-center gap-5">
        <h1 className="text-[#333] font-black text-2xl">Payment Failed!</h1>
        <p>Your payment has failed try again later.</p>
        <NavLink to="/cart">
          <ButtonBG text="Retry" />
        </NavLink>
      </div>
    </div>
  );
};
