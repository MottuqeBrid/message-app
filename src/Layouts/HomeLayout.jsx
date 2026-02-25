import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-dvh">
        <main className="max-w-7xl mx-auto min-h-dvh">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default HomeLayout;
