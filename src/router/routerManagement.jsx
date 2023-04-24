import React, { useEffect, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landing-page/landingPage";
import ProductPage from "../pages/product-page/productPage";
import CreateProductPage from "../pages/create-product-page/createProductPage";
import LoginPage from "../pages/login-page/loginPage";
import RegisterPage from "../pages/register-page/registerPage";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingComponent from "../components/loadingComponent/LoadingComponent";
export default function RouteManagement() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (
      !token &&
      !(location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate("/login");
    } else if (
      !!token &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate("/");
    }
  }, [token]);
  return (
    <Suspense fallback={<LoadingComponent />}>
      {!token ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
          <Route path="/product/:no" element={<ProductPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      )}
    </Suspense>
  );
}
