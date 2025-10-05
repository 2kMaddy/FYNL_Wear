import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { fetchLogOutUser } from "../features/authSlice";
import { ButtonBG, ButtonNoBG } from "./Button";
import Popup from "./Popup";
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    setIsNavOpen(false);
  }, [location]);

  const isAuthorised = useSelector((state) => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleLogoutUser = async () => {
    await dispatch(fetchLogOutUser());
    setIsNavOpen(false);
  };

  const NavItems = () => {
    return (
      <div className="flex flex-col md:flex-row gap-0 md:gap-4 text-left w-full divide-y divide-gray-300 md:divide-none lg:ml-8">
        <NavLink
          to="/"
          className="relative inline-block text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#993df5] after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-80 hover:text-[#993df5] py-2 md:p-0"
        >
          Home
        </NavLink>
        <NavLink
          to="/products?page=1"
          className="relative inline-block text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#993df5] after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-80 hover:text-[#993df5] py-2 md:p-0"
        >
          Products
        </NavLink>
        <NavLink
          to="/my-orders"
          className="relative inline-block text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#993df5] after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-80 hover:text-[#993df5] py-2 md:p-0"
        >
          Orders
        </NavLink>
        <NavLink
          to="/contact"
          className="relative inline-block text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#993df5] after:transition-transform after:duration-300 after:origin-left after:scale-x-0 hover:after:scale-x-80 hover:text-[#993df5] py-2 md:p-0"
        >
          Contact
        </NavLink>
      </div>
    );
  };

  return (
    <>
      <nav className="w-full flex flex-row font-semibold max-h-[70px]">
        <div className="flex flex-row justify-between md:items-center w-full p-4 bg-white shadow-md">
          <div>
            <NavLink to="/">
              <img
                src="https://res.cloudinary.com/dhavsxxnd/image/upload/v1755936903/Logo_Black-removebg-preview_dbskal.png"
                alt="logo"
                className="w-40 hidden lg:block"
              />
            </NavLink>
          </div>

          {/* Nav items */}
          <button
            type="button"
            onClick={() => setIsNavOpen((prev) => !prev)}
            className="block md:hidden w-full"
          >
            <CiMenuBurger />
          </button>
          <div className="w-full hidden md:flex flex-row gap-8">
            <NavItems />
          </div>
          {isAuthorised ? (
            <div className="flex flex-row gap-5">
              <NavLink to="/cart">
                <button
                  type="button"
                  className="cursor-pointer text-[18px] p-2 hover:text-[#993df5]  transition-colors duration-300 flex items-center gap-2"
                >
                  <div className="relative">
                    <FiShoppingCart />
                    <p className="flex justify-center items-center absolute top-0 transform -translate-y-1/2 right-[-20%] text-white bg-red-600 rounded-4xl px-1 text-[11px] font-bold">
                      {cartItems?.length !== 0 && cartItems?.length}
                    </p>
                  </div>
                  <span className="text-[16px] hidden lg:block">Cart</span>
                </button>
              </NavLink>

              <button
                type="button"
                className="cursor-pointer text-[18px] p-2  hover:text-[#993df5]  transition-colors duration-300 flex items-center gap-2"
              >
                <FiUser />
                <span className="text-[16px] hidden lg:block">Account</span>
              </button>

              <div>
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(true)}
                  className="cursor-pointer text-[18px] p-2   hover:text-[#993df5]  transition-colors duration-300 flex items-center gap-2"
                >
                  <IoMdLogOut />
                  <span className="text-[16px] hidden lg:block">Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-row gap-4">
              <NavLink to="/login">
                <ButtonBG text={"Login"} />
              </NavLink>
              <NavLink to="/signup">
                <ButtonNoBG text={"Signup"} />
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      {isNavOpen && (
        <div
          className="w-full flex md:hidden absolute bg-white p-4 font-semibold"
          onClick={() => setIsNavOpen(false)}
        >
          <NavItems />
        </div>
      )}

      {isPopupOpen && (
        <Popup
          message={"Are you sure you want to logout?"}
          onClose={() => setIsPopupOpen(false)}
          onClick={handleLogoutUser}
        />
      )}
    </>
  );
};

export default Navbar;
