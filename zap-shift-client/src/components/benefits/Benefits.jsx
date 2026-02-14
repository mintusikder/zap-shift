import React from "react";
import BenefitCard from "./BenefitCard";

import benefit1 from "../../assets/benefits/customer-top.png";
import benefit2 from "../../assets/benefits/location-merchant.png";
import benefit3 from "../../assets/benefits/safe-delivery.png";

const benefitsData = [
  {
    image: benefit1,
    title: "Fast & Reliable Delivery",
    description:
      "We ensure your parcels are delivered on time with real-time tracking and zero hassle for maximum reliability.",
  },
  {
    image: benefit2,
    title: "Secure Payment System",
    description:
      "Safe and secure cash on delivery service with guaranteed product protection across the country.",
  },
  {
    image: benefit3,
    title: "Business Growth Support",
    description:
      "We support your eCommerce growth with fulfillment solutions, warehouse management, and return handling.",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 rounded-xl bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Benefits
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of businesses trust our parcel delivery solutions.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-10">
          {benefitsData.map((benefit, index) => (
            <BenefitCard
              key={index}
              image={benefit.image}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Benefits;
