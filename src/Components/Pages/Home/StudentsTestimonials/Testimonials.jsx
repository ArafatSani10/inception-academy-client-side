import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteRight } from 'react-icons/fa';

const testimonials = [
  { name: 'Mahim Muntasir', text: 'Best digital marketing course.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Suria Akter Ratre', text: 'Teachers are professional.', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Bilash Das', text: 'Support helped freelancing.', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Nahid Hasan', text: 'Best trainer.', avatar: 'https://randomuser.me/api/portraits/men/28.jpg' },
  { name: 'Eshita Khan', text: 'Great platform.', avatar: 'https://randomuser.me/api/portraits/women/27.jpg' },
  { name: 'Tarek Islam', text: 'Helped me freelancing.', avatar: 'https://randomuser.me/api/portraits/men/21.jpg' },
];

const TestimonialCard = ({ item }) => (
  <div className="bg-white shadow-xl rounded-2xl p-8 min-w-[320px] max-w-[320px] flex-shrink-0 relative border border-gray-100 hover:shadow-2xl transition-shadow duration-500 cursor-default">
    <FaQuoteRight className="text-teal-400 text-4xl absolute top-5 right-5 opacity-20" />
    <div className="flex items-center mb-4">
      <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full mr-4 border-2 border-teal-400" />
      <h4 className="font-semibold text-gray-900 text-base md:text-lg">{item.name}</h4>
    </div>
    <p className="text-gray-700 text-sm md:text-base mb-5 leading-relaxed italic">&quot;{item.text}&quot;</p>
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, j) => (<FaStar key={j} size={16} />))}
    </div>
  </div>
);

const Testimonials = () => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const [topWidth, setTopWidth] = useState(0);
  const [bottomWidth, setBottomWidth] = useState(0);

  useEffect(() => {
    if (topRef.current) setTopWidth(topRef.current.scrollWidth / 2);
    if (bottomRef.current) setBottomWidth(bottomRef.current.scrollWidth / 2);

    const handleResize = () => {
      if (topRef.current) setTopWidth(topRef.current.scrollWidth / 2);
      if (bottomRef.current) setBottomWidth(bottomRef.current.scrollWidth / 2);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-teal-50 to-white py-24 overflow-hidden px-4 md:px-10 lg:px-20">
      <h2 className="text-2xl md:text-4xl  font-extrabold text-center mb-16 text-teal-800 drop-shadow-md">
        What Our Learners Say
      </h2>

      {/* Top Row - Scroll Left */}
      <div className="overflow-hidden relative mb-16">
        <motion.div
          ref={topRef}
          className="flex gap-8 w-max whitespace-nowrap"
          animate={{ x: [0, -topWidth] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 60 }}
        >
          {[...testimonials, ...testimonials].map((item, i) => (
            <TestimonialCard key={i} item={item} />
          ))}
        </motion.div>

        {/* shadow overlays */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-teal-50 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-teal-50 to-transparent z-20" />
      </div>

      {/* Bottom Row - Scroll Right */}
      <div className="overflow-hidden relative">
        <motion.div
          ref={bottomRef}
          className="flex gap-8 w-max whitespace-nowrap"
          animate={{ x: [-bottomWidth, 0] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 60 }}
        >
          {[...testimonials, ...testimonials].map((item, i) => (
            <TestimonialCard key={i} item={item} />
          ))}
        </motion.div>

        {/* shadow overlays */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-teal-50 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-teal-50 to-transparent z-20" />
      </div>
    </div>
  );
};

export default Testimonials;
