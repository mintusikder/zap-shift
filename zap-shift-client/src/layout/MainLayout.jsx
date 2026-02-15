import React, { useContext } from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
import { AuthContext } from "../context/AuthContext/AuthContext";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    // ✅ Show spinner while loading
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <span className="loading loading-spinner text-primary loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-360px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
