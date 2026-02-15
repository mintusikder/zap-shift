import React from "react";
import logo from "../../assets/logo/logo.png";

// Optional: accept className so parent can style it
const ProFastLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-end ${className}`}>
      <img className="mb-2" src={logo} alt="ProFast Logo" />
      <p className="-ml-2 text-3xl font-bold">Profast</p>
    </div>
  );
};

export default ProFastLogo;
