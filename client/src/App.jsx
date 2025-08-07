import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import Payment from "./pages/Payment";
import Cart from "./pages/Cart";

// import WishList from "./pages/WishList";

import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import InvoicePage from "./pages/InvoicePage";
import OrderHistory from "./pages/OrderHistory";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
// import AdminDashboard from "./pages/AdminDashboard";
// import Cart from "./pages/Cart";
// import { DashboardLayout } from "./admin/layouts/dashboard/layout";
// dashboardlayout inside {} because it is not default export
import AdminShell from "./admin/AdminShell";
import AdminDashboard from "./admin/pages/AdminDashboard";
import Users from "./admin/pages/Users";
import Products from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Categories from "./admin/pages/Categories";
import "bootstrap-icons/font/bootstrap-icons.css";
import { CartProvider } from "./context/CartContext";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  // {path: "/admin", element: (
  //   <ProtectedAdminRoute>
  //     <AdminDashboard />
  //   </ProtectedAdminRoute>
  // )},
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute>
        <AdminShell />
      </ProtectedAdminRoute>
    ),
    children: [
      { path: "", element: <AdminDashboard /> }, // /admin
      { path: "users", element: <Users /> }, // /admin/users
      { path: "products", element: <Products /> }, // /admin/products
      { path: "orders", element: <Orders /> }, // /admin/orders
      { path: "categories", element: <Categories /> }, // /admin/categories
    ],
  },
  { path: "/register", element: <Register /> },

  { path: "/login", element: <Login /> },
  { path: "/cart", element: <Cart /> },
  // {path: "/wishList", element: <WishList />},

  { path: "/itemDetailsPage", element: <ItemDetailsPage /> },
  { path: "/cart", element: <Cart /> },
  { path: "/payment", element: <Payment /> },
  { path: "/", element: <HomePage /> },
  { path: "/category/:name", element: <CategoryPage /> },
  { path: "/search", element: <SearchResultsPage /> },
  { path: "/orderHistory", element: <OrderHistory /> },
  { path: "/invoicePage", element: <InvoicePage /> },
]);

const App = () => {
  return (
    <div>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </div>
  );
};

export default App;
