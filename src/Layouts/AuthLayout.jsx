import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import AuthProvider from "../context/AuthProvider";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-dvh">
      <AuthProvider>
        <Navbar />
        <main className="max-w-7xl mx-auto min-h-dvh">
          <Outlet />
        </main>
      </AuthProvider>
    </div>
  );
};

export default AuthLayout;
