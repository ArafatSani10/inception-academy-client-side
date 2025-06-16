import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const OurCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/academyCourse')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);

  const renderCourseCard = (course) => (
    <div
      key={course._id}
      className="bg-white rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 group h-full flex flex-col animated-border"
    >
      <div className="overflow-hidden rounded-t-3xl">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
              Duration: {course.duration}
            </span>
            <span className="text-blue-600 text-lg font-bold">৳ {course.price}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 p-4 rounded-xl border border-gray-200 shadow-sm bg-white">
            <div className="flex items-center gap-4">
              <img
                src={course.instructor?.photo}
                alt={course.instructor?.name}
                className="w-14 h-14 rounded-full border border-blue-200 object-cover shadow-md"
              />
              <div>
                <p className="text-base font-semibold text-gray-800">{course.instructor?.name}</p>
                <p className="text-sm text-gray-500">{course.instructor?.specialist}</p>
              </div>
            </div>

            <Link to={`/courses/${course._id}`}>
              <button className="md:h-10 md:w-28 border-none bg-gray-100  sm:mt-0 max-sm:mt-2 max-sm:py-2 max-sm:w-full  rounded-2xl border border-blue-500 text-blue-600 font-medium hover:bg-blue-50 transition duration-200">
                Enroll Now
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Animated border CSS */}
      <style>{`
        @keyframes border-rotate {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .animated-border {
          position: relative;
          z-index: 0;
          overflow: visible;
        }

        .animated-border::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: 1.5rem; /* same as rounded-3xl */
          padding: 2px;
          background: linear-gradient(
            270deg,
            #4ade80,
            #3b82f6,
            #9333ea,
            #f59e0b,
            #4ade80
          );
          background-size: 400% 400%;
          animation: border-rotate 8s linear infinite;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          pointer-events: none;
          z-index: -1;
        }
      `}</style>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-full mx-auto">
          <h2 className="text-4xl font-bold text-start text-gray-800 mb-4">Shaping the innovators of tomorrow.</h2>
          <p className="text-start text-gray-500  max-w-2xl  mb-12">
            We offer comprehensive AI education programs designed to equip individuals with the skills to harness the power of artificial intelligence.
          </p>

          {/* Grid view for md and up */}
          <div className="hidden  md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map(renderCourseCard)}
          </div>

          {/* Swiper view for small screens */}
          <div className="md:hidden">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1.1}
              grabCursor={true}
              loop={false}
              style={{ paddingBottom: '30px' }}
            >
              {courses.map((course) => (
                <SwiperSlide key={course._id}>
                  <div className="h-full">{renderCourseCard(course)}</div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurCourses;
