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
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <button className="btn loading btn-primary text-black">Loading...</button>
      </div>
    );
  }
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
