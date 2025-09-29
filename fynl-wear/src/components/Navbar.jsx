import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { ButtonNoBG } from "./Button";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const isAuthorised = useSelector((state) => state.auth.isAuthenticated);

  const NavItems = () => {
    return (
      <div className="flex flex-col md:flex-row gap-0 md:gap-4 text-left w-full divide-y divide-gray-300">
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
      <nav className="w-full flex flex-row font-semibold max-h-[66px]">
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
                <button
                  type="button"
                  className="cursor-pointer w-24 border border-[#8f49ff] bg-[#8f49ff] text-white rounded-2xl p-2 pl-3 pr-3 hover:bg-[#5203a1] transition-colors duration-300"
                >
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button
                  type="button"
                  className="cursor-pointer w-24 text-[#8f49ff] border border-[#8f49ff] rounded-2xl p-2 pl-3 pr-3 hover:bg-[#993df5] hover:text-white hover:border-[#993df5] transition-colors duration-300"
                >
                  Signup
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      {isNavOpen && (
        <div className="w-full flex md:hidden absolute bg-white p-4 font-semibold">
          <NavItems />
        </div>
      )}
    </>
  );
};

export default Navbar;
