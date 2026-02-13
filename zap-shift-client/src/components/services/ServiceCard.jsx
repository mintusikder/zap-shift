import React from "react";

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        hover:shadow-xl
        hover:bg-[#CAEB66]
        transition-all
        duration-300
        ease-in-out
        p-8
        text-center
        max-w-sm
      "
    >
      <div className="flex justify-center mb-6 text-5xl transition-colors duration-300">
        <Icon />
      </div>

      <h3 className="text-xl font-semibold mb-3">
        {title}
      </h3>

      <p className="text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
