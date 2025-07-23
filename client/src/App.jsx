import { createBrowserRouter , RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

const router = createBrowserRouter(
    [
      {path: "/", element: <Login />},
      {path: "/register", element: <Register />}
    ]
  )

 const App = () => {
  return <div>
    <RouterProvider router={router} />
  </div>
}

 export default App