import React from "react";
import { Link, Outlet } from "react-router";
import ProFastLogo from "../pages/Shared/ProFastLogo";
import AuthImage from "../assets/authImage/authImage.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">

      {/* Logo */}
      <div className="px-6 pt-6">
        <Link to="/" className="inline-block">
          <ProFastLogo />
        </Link>
      </div>

      {/* Main Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 px-4 lg:px-10 py-8 flex-1">

        {/* Login/Register Form - TOP on Mobile, LEFT on Desktop */}
        <div className="w-full lg:w-1/2 max-w-md">
          <Outlet />
        </div>

        {/* Image - BOTTOM on Mobile, RIGHT on Desktop */}
        <div className="w-full lg:w-1/2 flex justify-center mt-6 lg:mt-0">
          <img
            src={AuthImage}
            alt="Authentication"
            className="w-4/5 sm:w-3/4 md:w-2/3 lg:max-w-md rounded-xl shadow-xl"
          />
        </div>

      </div>

    </div>
  );
};

export default AuthLayout;
