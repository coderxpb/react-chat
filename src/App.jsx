import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./context/UserContext";
import { useRoutes } from "react-router-dom";
function App() {
  const { user } = useAuth();

  const routes = (user) => [
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
  ];
  const routing = useRoutes(routes(user));
  return <>{routing}</>;
}

export default App;
