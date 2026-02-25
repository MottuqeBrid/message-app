import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-dvh">
      <Navbar />
      <main className="max-w-7xl mx-auto min-h-dvh">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
