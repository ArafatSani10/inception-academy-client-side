import React, { useEffect, useState } from 'react';
import UseAxiosPublic from '../../../hooks/UseAxiosPublic';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaStar } from 'react-icons/fa';

const Instructors = () => {
  const axiosPublic = UseAxiosPublic();
  const [instructors, setInstructors] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    axiosPublic
      .get('/instructors')
      .then(res => setInstructors(res.data))
      .catch(err => console.error('Failed to fetch instructors:', err));
  }, [axiosPublic]);

  const toggleExpand = (idx) => {
    setExpandedCard(expandedCard === idx ? null : idx);
  };

  return (
    <div className="relative bg-gradient-to-br from-[#fefeff] to-[#f0f4ff] px-4 sm:px-8 py-20 overflow-hidden">
      {/* Floating Effects */}
      <div className="absolute top-0 right-0 w-60 h-60 bg-purple-200/30 rounded-full blur-[100px] z-0"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/20 rounded-full blur-[120px] z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
            Meet Our Expert Instructors
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full mb-4"></div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Learn from industry professionals with real-world experience and passion for teaching.
          </p>
          <div className="mt-6 inline-block bg-white border border-indigo-300 text-indigo-800 px-5 py-2 rounded-full shadow">
            {instructors.length} Qualified Instructors
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-10">
          {instructors.map((instructor, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row overflow-hidden group hover:border-indigo-200"
            >
              {/* Image Side */}
              <div className="md:w-1/3 h-full overflow-hidden">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover "
                />
              </div>

              {/* Info Side */}
              <div className="md:w-2/3 p-6 flex flex-col justify-between">
                {/* Name, Expertise, Stars */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{instructor.name}</h3>
                      <p className="text-sm text-indigo-600">{instructor.expertise}</p>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={16} />
                      ))}
                    </div>
                  </div>

                  {/* About text */}
                  <p className="text-gray-600 text-xs mb-2">
                    {expandedCard === idx
                      ? instructor.about
                      : `${instructor.about?.slice(0, 160)}...`}
                  </p>

                  {/* Toggle Button */}
                  {instructor.about?.length > 160 && (
                    <button
                      onClick={() => toggleExpand(idx)}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      {expandedCard === idx ? 'See Less' : 'See More'}
                    </button>
                  )}
                </div>

                {/* Social Icons */}
                <div className="flex gap-4 mt-5">
                  {instructor?.social?.linkedin && (
                    <a
                      href={instructor.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-all shadow-sm hover:shadow-md"
                    >
                      <FaLinkedin size={16} />
                    </a>
                  )}
                  {instructor?.social?.twitter && (
                    <a
                      href={instructor.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-sm hover:shadow-md"
                    >
                      <FaTwitter size={16} />
                    </a>
                  )}
                  {instructor?.social?.facebook && (
                    <a
                      href={instructor.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-md"
                    >
                      <FaFacebook size={16} />
                    </a>
                  )}
                  {instructor?.social?.youtube && (
                    <a
                      href={instructor.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm hover:shadow-md"
                    >
                      <FaYoutube size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructors;
