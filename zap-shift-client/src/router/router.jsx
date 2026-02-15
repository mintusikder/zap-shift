import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import About from "../pages/Home/About";
import Coverage from "../pages/Home/Coverage";
import PrivateRoute from "./PrivateRoute";
import SendParcelForm from "../components/parcel/SendParcelForm";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendParcelForm />
          </PrivateRoute>
        ),
      },
      { path: "/coverage", Component: Coverage },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
    ],
  },
]);
