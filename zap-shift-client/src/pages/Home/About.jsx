import { useState } from "react";

const About = () => {
  const [activeTab, setActiveTab] = useState("Story");

  const content = {
    Story: {
      title: "Our Story",
      description:
        "Founded with a vision to simplify logistics, our journey began with a small fleet and a big dream. Today, we proudly serve customers nationwide with reliable parcel delivery services, combining technology and dedication to ensure every package reaches safely."
    },
    Mission: {
      title: "Our Mission",
      description:
        "Our mission is to provide fast, reliable, and transparent delivery solutions. We aim to connect businesses and individuals with seamless shipping experiences powered by real-time tracking and customer-first service."
    },
    Success: {
      title: "Our Success",
      description:
        "With thousands of successful deliveries every month and growing partnerships across the country, our success is built on trust, punctuality, and customer satisfaction. We continuously improve to exceed expectations."
    },
    "Team & Others": {
      title: "Our Team",
      description:
        "Behind every successful delivery is a passionate team. From logistics experts to customer support professionals, our dedicated workforce ensures smooth operations and outstanding service every day."
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-4">
        About Us
      </h1>

      {/* Description */}
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
        From personal packages to business shipments — we deliver on time, every time.
      </p>

      {/* Divider */}
      <div className="w-24 h-1 bg-primary mx-auto mb-10 rounded"></div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {Object.keys(content).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full border transition-all duration-300
              ${
                activeTab === tab
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-green-100"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

     {/* Content Card */}
      <div className="bg-white shadow-xl rounded-2xl p-10 border-t-4 border-primary transition-all duration-300">
        <h2 className="text-2xl font-bold text-black mb-4">
          {content[activeTab].title}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {content[activeTab].description}
        </p>
      </div>
    </div>


  );
};

export default About;
