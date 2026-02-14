import React from "react";
import Marquee from "react-fast-marquee";

// Import your local logos
import brand1 from "../../assets/brands/amazon.png";
import brand2 from "../../assets/brands/amazon_vector.png";
import brand3 from "../../assets/brands/casio.png";
import brand4 from "../../assets/brands/moonstar.png";
import brand5 from "../../assets/brands/randstad.png";
import brand6 from "../../assets/brands/star.png";
import brand7 from "../../assets/brands/start_people.png";

const logos = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];

const BrandSlider = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          We've helped thousands of{" "}
          <span className="text-[#CAEB66]">sales teams</span>
        </h2>

        <Marquee speed={50} gradient={false} pauseOnHover={true}>
          {logos.map((logo, index) => (
            <div key={index} className="mx-16">
              <img
                src={logo}
                alt={`brand-${index}`}
                className="h-8 w-full grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default BrandSlider;
