import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { auth } from "./firebase";
import { useAuth } from "./context/UserContext";

function App() {
  const { user } = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Home /> : <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
