import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const OurCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/academyCourse')
      .then((res) => res.json())
      .then((data) => {
        // Sort courses by price (ascending)
        const sorted = data.sort((a, b) => a.price - b.price);
        setCourses(sorted);
      });
  }, []);

  const renderCourseCard = (course) => (
    <div
      key={course._id}
      className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group h-full flex flex-col overflow-hidden border border-gray-100"
    >
      <div className="relative overflow-hidden rounded-t-3xl h-56">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          ৳ {course.price}
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {course.duration}
            </div>
            <div className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-medium">
              {course.level || 'Intermediate'}
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center">
              <img
                src={course.instructor?.photo}
                alt={course.instructor?.name}
                className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{course.instructor?.name}</p>
                <p className="text-xs text-gray-500">{course.instructor?.specialist}</p>
              </div>
            </div>
          </div>
          <Link to={`/courses/${course._id}`}>
            <button className="w-full mt-5 text-xs font-semibold px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 group relative overflow-hidden">
              <span className="relative z-10">See More Details</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style jsx>{`
        .section-bg {
          background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.03) 0%, transparent 25%),
                      radial-gradient(circle at bottom left, rgba(14, 165, 233, 0.03) 0%, transparent 25%);
        }
        .swiper-pagination-bullet-active {
          background-color: #3b82f6 !important;
        }
      `}</style>

      <section className="py-20 px-4 section-bg relative overflow-hidden">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full mb-4">
              <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
              <span className="text-sm font-medium">AI Learning Paths</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shape Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI Future</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive programs designed by industry experts
            </p>
          </div>

          <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8">
            {courses.map(renderCourseCard)}
          </div>

          <div className="md:hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 5000 }}
              spaceBetween={20}
              slidesPerView={1.05}
              grabCursor={true}
              loop={true}
              breakpoints={{
                480: { slidesPerView: 1.3 },
                640: { slidesPerView: 1.5 }
              }}
            >
              {courses.map((course) => (
                <SwiperSlide key={course._id} className="pb-12">
                  {renderCourseCard(course)}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="text-center mt-16">
            <button className="px-8 py-3.5 bg-white border-2 border-blue-500 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center mx-auto gap-2">
              Browse All Courses
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurCourses;