import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonBG } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { fetchAdminLogin } from "../../features/adminSlice";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const error = useSelector((state) => state.admin.error);

  const handleLoginAdmin = async (e) => {
    e.preventDefault();
    const response = await dispatch(fetchAdminLogin({ email, password }));
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="bg-purple-200 min-h-dvh flex items-center justify-center">
      <form
        className="bg-white p-5 px-8 rounded-2xl shadow-2xl shadow-gray-400"
        onSubmit={handleLoginAdmin}
      >
        <h1 className="text-[#333] font-bold text-2xl mb-5">
          Admin Login for FYNL Wear
        </h1>
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-[#333]" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-400 border rounded-md outline-0 px-2 py-1"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-[#333]" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-gray-400 border rounded-md outline-0 px-2 py-1"
            placeholder="Email"
          />
        </div>
        <ButtonBG text="Login" btnType="submit" width="w-full" />
        {error && <p className="text-red-600 font-semibold">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
