import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="bg-[#e8f5e9] w-full px-6 md:px-16 py-20 relative overflow-hidden">

      {/* Decorative Background */}
      <div className="absolute bottom-5 right-10 opacity-10 pointer-events-none select-none">
        <img
          src="https://i.ibb.co/xsG3Gy4/wave1.png"
          alt="decor"
          className="w-24 rotate-180 animate-pulse"
        />
      </div>

      {/* Content */}
      <div className="max-w-full mx-auto flex flex-col items-start space-y-10">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-6xl font-extrabold leading-tight text-gray-900"
        >
          Empowering the Future with{" "}
          <span className="bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text">
            Artificial Intelligence & Robotics
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-700 text-lg md:text-xl max-w-3xl leading-relaxed"
        >
          Learn with real-world content and inspiring technology to shape tomorrow.
        </motion.p>

        {/* Videos */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
        >
          {/* Video 1 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.015] border border-green-200 hover:border-green-400"
          >
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/JcXKbUIebrU?si=WqUKH0PIFQjssS3s"
              title="Generative AI"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-56 md:h-72"
            ></iframe>
          </motion.div>

          {/* Video 2 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.015] border border-green-200 hover:border-green-400"
          >
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/htjRUL3neMg?si=evl2g0_Ecr8753VZ"
              title="Robotics & Automation"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-56 md:h-72"
            ></iframe>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
