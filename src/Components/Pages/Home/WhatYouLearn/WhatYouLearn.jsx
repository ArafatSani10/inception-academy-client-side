import React from "react";
import { FaBrain, FaRobot, FaEye, FaCode, FaChartLine, FaServer } from "react-icons/fa";
import { motion } from "framer-motion";

const courses = [
  {
    title: "Generative AI",
    icon: FaBrain,
    description: "Master the creation of intelligent models that generate text, images, music, and more.",
    color: "from-violet-500 to-purple-600"
  },
  {
    title: "Robotics",
    icon: FaRobot,
    description: "Learn robot design, control, and automation with hands-on real-world projects.",
    color: "from-rose-500 to-pink-600"
  },
  {
    title: "Computer Vision",
    icon: FaEye,
    description: "Explore image processing, object detection, and video analysis techniques.",
    color: "from-cyan-500 to-blue-600"
  },
  
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      type: "spring",
      stiffness: 100
    } 
  },
  hover: {
    y: -15,
    scale: 1.03,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const WhatYouLearn = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600 rounded-full filter blur-[100px] opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              What You'll Learn
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
              Cutting-edge courses designed to prepare you for the future of technology
            </p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map(({ title, icon: Icon, description, color }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover="hover"
              className="relative rounded-2xl overflow-hidden p-1"
            >
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${color} opacity-80 rounded-2xl`}
              ></div>
              
              <div 
                className="relative rounded-2xl bg-gray-900 bg-opacity-50 backdrop-blur-xl p-8 h-full border border-gray-700/50"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-lg">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white ml-4">{title}</h3>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  {description}
                </p>
                
                <div className="flex justify-end">
                  <button className="text-sm font-medium px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10 backdrop-blur-sm">
                    Explore Course
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
          >
            View All Courses
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default WhatYouLearn;