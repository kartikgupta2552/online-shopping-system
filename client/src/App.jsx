import { createBrowserRouter , RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import Payment from "./pages/Payment";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import SearchResultsPage from "./pages/SearchResultsPage";

const router = createBrowserRouter(
    [
      {path: "/", element: <Login />},
      {path: "/register", element: <Register />},
      {path: "/cart", element: <Cart />},
      {path: "/wishList", element: <WishList />},
      {path: "/itemDetailsPage", element: <ItemDetailsPage />},
      {path: "/payment", element: <Payment />},
      {path: "/homepage", element: <HomePage/>},
      {path: "/category/:name",element:<CategoryPage/>},
      {path: "/search", element:<SearchResultsPage/>}
    
    ]
  )

 const App = () => {
  return <div>
    <RouterProvider router={router} />
  </div>
}

 export default App