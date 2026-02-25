import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import About from "../pages/About/About";
import Admin from "../pages/admin/Admin";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Friends from "./../pages/Friends/Friends";
import Messages from "./../pages/Messages/Messages";
import Profile from "../pages/Profile/Profile";
import Post from "../pages/Post/Post";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuthLayout from "../Layouts/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "friends",
        Component: Friends,
      },
      {
        path: "messages",
        Component: Messages,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "post",
        Component: Post,
      },
      {
        path: "admin",
        Component: Admin,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);

export default router;
