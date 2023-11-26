import { Navigate, createBrowserRouter } from "react-router-dom";
import Default_Layout from "./Layout/Default_Layout";
import Home from "./pages/Home";
import Auth_Layout from "./Layout/Auth_Layout";
import Login from "./pages/auth/Login.jsx";

import ProductDetailPage from "./pages/ProductDetailPage";
import NotFound from "./components/NotFound";
import Cart from "./pages/Cart";

import SignUp from "./pages/auth/SignUp";
import CheckOut from "./pages/CheckOut.jsx";
import PrivateRoutes from "./components/PrivateRoutes";
import Order from "./pages/Order.jsx";
import Profile from "./pages/auth/Profile.jsx";
import AdminLayout from "./Layout/AdminLayout.jsx";
import EditProduct from "./pages/Admin/EditProduct.jsx";
import Products from "./pages/Admin/Products.jsx";
import Users from "./pages/Admin/Users.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import Orders from "./pages/Admin/Orders.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Default_Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:"/about",
        element: <About/>      },
        {
          path:"/contact",
          element: <Contact/>      },
      {
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/checkout",
            element: <CheckOut />,
          },
          {
            path: "/orders/:id",
            element: <Order />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth_Layout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: "true",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <EditProduct />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);
export default routes;
