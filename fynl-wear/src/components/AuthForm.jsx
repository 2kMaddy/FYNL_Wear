import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ButtonBG } from "./Button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { fetchCreateUser, fetchLoginUser } from "../features/authSlice";

const AuthForm = ({ formType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);

  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.loading);
  const isAuthorised = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthorised) {
      navigate("/products");
    }
  }, [isAuthorised]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    if (formType === "signup") {
      result = await dispatch(fetchCreateUser({ name, email, password }));
    } else {
      result = await dispatch(fetchLoginUser({ email, password }));
    }
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/products");
    }
  };

  return (
    <div className="ablsolute flex flex-col gap-4 p-3 md:p-5 bg-purple-100 rounded-2xl shadow-lg max-w-md mt-4 mx-auto">
      <h1 className="font-bold text-[#333] text-2xl">
        {formType === "signup" ? "Sign Up" : "Welcome Back"}
      </h1>
      <p className="text-[#333]">
        {formType === "signup"
          ? "Please enter your details to create your account"
          : "Welcome back! Please enter your details below."}
      </p>

      {/* Form */}
      <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
        {formType === "signup" && (
          <>
            <label htmlFor="name" className="mt-4">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-gray-400 border rounded-md outline-0 px-2 py-1"
            />
          </>
        )}
        <label htmlFor="email" className="mt-4">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-gray-400 border rounded-md outline-0 px-2 py-1"
        />
        <label htmlFor="password" className="mt-4">
          Password
        </label>
        <div className="w-full relative">
          <input
            type={isPasswordShown ? "text" : "password"}
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-gray-400 border rounded-md outline-0 px-2 py-1 w-full"
          />
          <button
            type="button"
            className="absolute right-2 top-2 cursor-pointer"
            onClick={() => setIsPasswordShown(!isPasswordShown)}
          >
            {isPasswordShown ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        {formType === "signup" && (
          <>
            <label htmlFor="confirm-password" className="mt-4">
              Confirm Password
            </label>
            <div className="w-full relative">
              <input
                type={isConfirmPasswordShown ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder="Confirm Password"
                className="border-gray-400 border rounded-md outline-0 px-2 py-1 w-full"
              />
              <button
                type="button"
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() =>
                  setIsConfirmPasswordShown(!isConfirmPasswordShown)
                }
              >
                {isConfirmPasswordShown ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </>
        )}
        <div className="flex flex-row justify-between items-center mt-1">
          {formType !== "signup" && <NavLink to="/">Forgot Password</NavLink>}
          {formType === "signup" ? (
            <NavLink to="/login">
              Already have account?
              <span className="text-blue-800 cursor-pointer">Login</span>
            </NavLink>
          ) : (
            <NavLink to="/signup">
              Create new account?
              <span className="text-blue-800 cursor-pointer">Signup</span>
            </NavLink>
          )}
        </div>
        <div className="mt-4">
          <ButtonBG
            btnType="submit"
            text={formType === "signup" ? "Sign Up" : "Login"}
            width="w-full"
          />
        </div>
        {error && error !== "unauthorized" && (
          <p className="text-red-600 italic text-[14px]">{error}</p>
        )}
      </form>
      {/* <div className="flex flex-row items-center w-full gap-1">
        <hr className="w-full" />
        <span>OR</span>
        <hr className="w-full" />
      </div> */}
    </div>
  );
};

export default AuthForm;
