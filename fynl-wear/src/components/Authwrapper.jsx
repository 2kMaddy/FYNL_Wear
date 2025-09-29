import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthoriseUser } from "../features/authSlice";
import { PrimaryLoader } from "./Loader";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(fetchAuthoriseUser());
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  if (isLoading) {
    return <PrimaryLoader />;
  }
  return children;
};

export default AuthWrapper;
