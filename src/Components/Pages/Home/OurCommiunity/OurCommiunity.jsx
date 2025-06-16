import React from "react";
import { FaGraduationCap, FaHeadset, FaUsers } from "react-icons/fa";

const OurCommunity = () => {
  const cards = [
    {
      title: "FOCUS ON LEARNING",
      icon: <FaGraduationCap className="text-4xl text-purple-400 mb-4" />,
      description:
        "One has to learn by heart to earn and if one tries hard, we will always be there to give 24/7 support",
      bgColor: "bg-purple-100",
    },
    {
      title: "Free Lifetime Support",
      icon: <FaHeadset className="text-4xl text-green-400 mb-4" />,
      description:
        "Only our students can get Lifetime Online Support & Course Access into their User Dashboard.",
      bgColor: "bg-green-100",
    },
    {
      title: "Largest Community",
      icon: <FaUsers className="text-4xl text-purple-400 mb-4" />,
      description:
        "Join our Successful Freelancers Community where you will find every single proof of their Earnings and activities.",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="py-16 px-4  max-w-full mx-auto">
        <div className="text-center my-5">
            <h1 className="md:text-4xl text-2xl font-bold">Join Our Community</h1>
            <p className="max-w-5xl mt-3 text-lg mx-auto">Join our students  Community where you will find every single proves of their Earnings and activities.</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map(({ title, icon, description, bgColor }, idx) => (
          <div
            key={idx}
            className={`${bgColor} rounded-2xl hover:shadow-xl duration-300 p-8 shadow-md`}
          >
            <div className="flex justify-center">{icon}</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
              {title}
            </h3>
            <p className="text-gray-600 text-center">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurCommunity;
