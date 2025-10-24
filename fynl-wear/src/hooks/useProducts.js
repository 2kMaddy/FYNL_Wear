import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { fetchAllProducts } from "../features/productSlice";

export const useProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const basePath = location.pathname;

  const [searchParams] = useSearchParams();

  // URL query values
  const queryPage = parseInt(searchParams.get("page")) || 1;
  const queryCategory = searchParams.get("category") || "allProducts";
  const querySortBy = searchParams.get("sortBy") || "latest";
  const queryLimit = parseInt(searchParams.get("limit")) || 12;

  // Local states
  const [sortValue, setSortValue] = useState(querySortBy);
  const [category, setCategory] = useState(queryCategory);
  const [currentPage, setCurrentPage] = useState(queryPage);
  const [limit, setLimit] = useState(queryLimit);

  // Redux state
  const products = useSelector((state) => state.product.products);
  const totalPage = useSelector((state) => state.product.totalPage);
  const isLoading = useSelector((state) => state.product.loading);

  // Fetch products
  const fetchProducts = async () => {
    await dispatch(
      fetchAllProducts({
        category,
        sortBy: sortValue,
        page: currentPage,
        limit,
      })
    );
  };

  // Fetch and update URL whenever filters change
  useEffect(() => {
    fetchProducts();
    navigate(
      `${basePath}?page=${currentPage}&category=${category}&sortBy=${sortValue}&limit=${limit}`,
      { replace: true }
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, category, sortValue]);

  // Handlers
  const handleSortBy = (value) => setSortValue(value);
  const handleCategory = (value) => setCategory(value);
  const handleCurrentPage = (value) => {
    if (value === "dec" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (value === "inc" && totalPage > currentPage) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage(value);
    }
  };

  return {
    products,
    totalPage,
    isLoading,
    sortValue,
    category,
    currentPage,
    handleSortBy,
    handleCategory,
    handleCurrentPage,
  };
};
