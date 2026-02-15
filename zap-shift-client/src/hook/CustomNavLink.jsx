// src/components/CustomNavLink.jsx
import React from "react";
import { NavLink } from "react-router";

const CustomNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative px-3 py-2 transition-colors ${
          isActive ? "text-primary font-semibold" : "text-gray-700"
        } after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full`
      }
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
