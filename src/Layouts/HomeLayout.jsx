import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import AuthProvider from "../context/AuthProvider";

const HomeLayout = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <div className="w-full min-h-dvh">
          <main className="max-w-7xl mx-auto min-h-dvh">
            <Outlet />
          </main>
        </div>
      </AuthProvider>
    </>
  );
};

export default HomeLayout;
