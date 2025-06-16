import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaVideo } from "react-icons/fa";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HappyStudents = ({ studentCount = 100 }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay },
    }),
  };

  return (
    <section ref={ref} className="py-20 px-6 md:px-5 bg-[#e8f5e9]">
     

      <div className="max-w-full mx-auto grid gap-10 md:grid-cols-3">
        {[
          {
            icon: FaUserGraduate,
            title: "Happy Students",
            count: studentCount,
            description:
              "Thousands of students enrolled and boosted their careers.",
            borderColor: "border-indigo-400",
            iconColor: "text-indigo-600",
          },
          {
            icon: FaChalkboardTeacher,
            title: "Expert Instructors",
            count: 3,
            description: "Learn from industry professionals and educators.",
            borderColor: "border-green-400",
            iconColor: "text-green-600",
          },
          {
            icon: FaVideo,
            title: "Video Courses",
            count: 3,
            description: "Engaging and clear tutorials for every topic.",
            borderColor: "border-purple-400",
            iconColor: "text-purple-600",
          },
        ].map(
          (
            { icon: Icon, title, count, description, borderColor, iconColor },
            idx
          ) => (
            <motion.div
              key={title}
              custom={idx * 0.15}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className={` rounded-lg border-2 ${borderColor} p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300 cursor-default transform hover:scale-105`}
            >
              <div
                className={`inline-flex items-center justify-center w-10 h-10 mb-6 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 ${iconColor}`}
              >
                <Icon className="text-4xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">{title}</h3>
              <p className="text-4xl font-extrabold text-gray-900 mb-3 select-none">
                {inView && <CountUp start={0} end={count} duration={2} />}
              </p>
              <p className="text-gray-600 text-base">{description}</p>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};

export default HappyStudents;
