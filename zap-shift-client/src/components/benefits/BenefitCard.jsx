import React from "react";

const BenefitCard = ({ image, title, description }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      
      {/* Left Image */}
      <div className="w-32 h-32 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Vertical Line */}
      <div className="hidden md:block w-[2px] bg-[#CAEB66] h-28"></div>

      {/* Right Content */}
      <div className="text-center md:text-left">
        <h3 className="text-xl font-semibold mb-3">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

    </div>
  );
};

export default BenefitCard;
