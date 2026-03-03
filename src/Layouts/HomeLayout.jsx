import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import AuthProvider from "../context/AuthProvider";
import SocketProvider from "../context/SocketProvider";

const HomeLayout = () => {
  return (
    <>
      <AuthProvider>
        <SocketProvider>
          <Navbar />
          <div className="w-full min-h-dvh">
            <main className="max-w-7xl mx-auto min-h-dvh">
              <Outlet />
            </main>
          </div>
        </SocketProvider>
      </AuthProvider>
    </>
  );
};

export default HomeLayout;
