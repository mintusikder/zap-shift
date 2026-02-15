import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import CustomNavLink from "../../hook/CustomNavLink";
import ProFastLogo from "./ProFastLogo";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-xl mt-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <>
              <CustomNavLink to="/">Home</CustomNavLink>
            </>
            <>
              <CustomNavLink to="/coverage">Coverage</CustomNavLink>
            </>
            <>
              <CustomNavLink to="/about">About</CustomNavLink>
            </>

            <>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 hover:text-primary transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-2 hover:text-primary transition-colors"
                >
                  Login
                </Link>
              )}
            </>
          </ul>
        </div>
        <Link to="/" className="inline-block">
          <ProFastLogo />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <>
            <CustomNavLink to="/">Home</CustomNavLink>
          </>

          <>
            <CustomNavLink to="/coverage">Coverage</CustomNavLink>
          </>
          <>
            <CustomNavLink to="/about">About</CustomNavLink>
          </>
          <>
            {user ? (
              <button
                onClick={handleLogout}
                className="px-3 py-2 hover:text-primary transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 hover:text-primary transition-colors"
              >
                Login
              </Link>
            )}
          </>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
