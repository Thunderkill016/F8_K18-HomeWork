import { createBrowserRouter } from "react-router";
import LoginPage from "../pages/Login";
import ProductPage from "../pages/Product";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/", element: <ProductPage /> },
]);

export default router;
