import React from "react";
import { FaBrain, FaRobot, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

const courses = [
  {
    title: "Generative AI",
    icon: FaBrain,
    description:
      "Master the creation of intelligent models that generate text, images, music, and more.",
  },
  {
    title: "Robotics",
    icon: FaRobot,
    description:
      "Learn robot design, control, and automation with hands-on real-world projects.",
  },
  {
    title: "Computer Vision",
    icon: FaEye,
    description:
      "Explore image processing, object detection, and video analysis techniques.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const WhatYouLearn = () => {
  return (
    <section
      className="relative py-14 px-6 sm:px-10 lg:px-16 bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80')",
        minHeight: "400px",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative max-w-full mx-auto text-white"
      >
        <h2 className="text-2xl l sm:text-4xl font-extrabold mb-12 text-center drop-shadow-lg">
          What you learn this course..
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map(({ title, icon: Icon, description }) => {
            return (
              <motion.div
                key={title}
                variants={cardVariants}
                className="relative rounded-2xl p-5 cursor-pointer max-w-full transition-transform duration-500 hover:scale-105 hover:shadow-md"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1.5px solid rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                }}
              >
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-white bg-opacity-10 flex items-center justify-center mb-4 shadow-sm">
                  <Icon className="text-3xl text-white" />
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold mb-3 drop-shadow-md">
                  {title}
                </h3>
                <p className="text-white text-opacity-75 text-sm sm:text-base leading-relaxed">
                  {description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default WhatYouLearn;
