import React from 'react';
import OurCourses from '../Home/OurCourses/OurCourses';
import { Helmet } from 'react-helmet';

const Courses = () => {
    return (
        <div>
            <Helmet>
                <title>
                    Courses || Inception Academy
                </title>
            </Helmet>
            <div className="relative min-h-screen bg-gradient-to-br from-[#f9faff] to-[#eef1ff] overflow-hidden">
                {/* Floating Blobs */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-300/20 rounded-full blur-[100px] z-0" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200/20 rounded-full blur-[140px] z-0" />

                {/* Hero Header */}
                <div className="relative z-10 pt-28 pb-16 px-4 sm:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text">
                        Explore Our Courses
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover a variety of industry-relevant courses designed by professionals to help you grow.
                    </p>
                    <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                </div>

                {/* Courses Section */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-20">
                    <OurCourses />
                </div>
            </div>
        </div>
    );
};

export default Courses;
