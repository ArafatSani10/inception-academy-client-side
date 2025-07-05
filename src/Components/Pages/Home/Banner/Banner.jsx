import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import lottieData from '../../../../assets/Animation - 1750081911908.json';

const Banner = () => {
  const aiRef = useRef(null);
  const animationInstance = useRef(null);

  useEffect(() => {
    let isMounted = true;

    import('lottie-web').then((lottie) => {
      // ✅ Destroy previous instance if exists
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }

      // ✅ Only load if ref and component still mounted
      if (aiRef.current && isMounted) {
        animationInstance.current = lottie.loadAnimation({
          container: aiRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: lottieData,
        });
      }
    });

    // ✅ Cleanup on unmount
    return () => {
      isMounted = false;
      if (animationInstance.current) {
        animationInstance.current.destroy();
        animationInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="px-4 py-12 md:py-24 relative overflow-hidden text-gray-900 bg-white">
      {/* Decorative Blur Circles */}
      <div className="absolute top-16 right-10 w-40 h-40 bg-blue-200 opacity-30 blur-3xl rounded-full z-0" />
      <div className="absolute bottom-0 left-0 w-52 h-52 bg-green-200 opacity-30 blur-3xl rounded-full z-0" />

      <div className="max-w-full mx-auto relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left Side */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl w-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 w-8 h-1 rounded-full" />
              <span className="text-sm font-medium text-green-600">FUTURE TECH EDUCATION</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-snug md:leading-tight">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">AI & Robotics</span><br />
              with Real-World Projects
            </h1>

            <p className="text-base md:text-lg text-gray-600 mb-8">
              Hands-on experience with expert-led training, flexible scheduling, and job-ready portfolio building.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold shadow hover:from-green-600 hover:to-green-700 transition-all">
                Explore Courses
              </button>
              <button className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold hover:border-green-500 transition-all">
                View Curriculum
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Lottie */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div
            ref={aiRef}
            className="w-full max-w-[600px] h-[280px] sm:h-[320px] md:h-[380px] lg:h-[460px]"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
