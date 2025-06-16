import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaClock, FaChartLine, FaCheckCircle, FaChevronLeft, FaTimes, FaGraduationCap, FaLaptop, FaUserGraduate, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showInstructor, setShowInstructor] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/academyCourse/${id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch course data');
                }

                const data = await response.json();
                setCourse(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setCourse(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
                    ></motion.div>
                    <p className="mt-4 text-lg text-gray-600">Loading course details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md text-center bg-white p-8 rounded-2xl shadow-xl"
                >
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <div className="text-3xl text-red-500">⚠️</div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-6">Error Loading Course</h2>
                    <p className="text-gray-600 mt-2">{error}</p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/courses')}
                            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors flex items-center"
                        >
                            <FaChevronLeft className="mr-2" /> Browse Courses
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.location.reload()}
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-colors"
                        >
                            Try Again
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className=" flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl"
                >
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaGraduationCap className="text-4xl text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
                    <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed</p>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/courses')}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white flex items-center mx-auto"
                    >
                        <FaChevronLeft className="mr-2" /> Browse All Courses
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    // Fallback values
    const courseImage = course.image || "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    const instructorPhoto = course.instructor?.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
    const instructorName = course.instructor?.name || "Expert Instructor";
    const instructorBio = course.instructor?.bio || "Experienced professional with years of industry experience in this field. Passionate about teaching and sharing knowledge with students.";

    // Instructor stats (mock data)
    const instructorStats = {

        rating: 4.9,
        reviews: 1280
    };

    return (
        <div className=" bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Instructor Profile Modal */}
            <AnimatePresence>
                {showInstructor && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20"
                        onClick={() => setShowInstructor(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="relative">
                                <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                                    <div className="absolute -bottom-16 left-8">
                                        <div className="bg-white p-1 rounded-full">
                                            <img
                                                src={instructorPhoto}
                                                alt={instructorName}
                                                className="w-32 h-32 rounded-full object-cover border-4 border-white"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowInstructor(false)}
                                    className="absolute top-4 right-4 text-white bg-black/20 hover:bg-black/30 rounded-full p-2 transition-colors"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="pt-20 px-8 pb-8">
                                <div className="flex flex-col md:flex-row md:justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">{instructorName}</h2>
                                        <p className="text-blue-600 font-medium mt-1">{course.instructor?.specialist || "Senior Instructor"}</p>

                                        <div className="flex items-center mt-3">
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={i < Math.floor(instructorStats.rating) ? "fill-current" : "fill-gray-300"} />
                                                ))}
                                            </div>
                                            <span className="ml-2 text-gray-600">{instructorStats.rating} ({instructorStats.reviews} reviews)</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 md:mt-0 flex items-center space-x-6">
                                        <div className="text-center">

                                        </div>

                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">About Me</h3>
                                    <p className="text-gray-700 leading-relaxed">{instructorBio}</p>
                                </div>

                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-bold text-gray-800 mb-2">Teaching Philosophy</h4>
                                        <p className="text-gray-700 text-sm">I believe in hands-on learning with real-world projects. My goal is to make complex concepts easy to understand.</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-bold text-gray-800 mb-2">Professional Experience</h4>
                                        <p className="text-gray-700 text-sm">5+ years industry experience with leading tech companies. Certified professional in multiple technologies.</p>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h4 className="font-bold text-gray-800 mb-3">Contact Instructor</h4>

                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="py-10 px-4 sm:px-6 max-w-full mx-auto"
            >
                <motion.button
                    whileHover={{ x: -5 }}
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <FaChevronLeft className="mr-2" /> Back to Courses
                </motion.button>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Course Header */}
                    <div className="relative">
                        <div className="h-64 md:h-80 w-full relative">
                            <img
                                src={courseImage}
                                alt={course.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                                    e.target.onerror = null;
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-end">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                                        {course.title || "Premium Course"}
                                    </h1>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center">
                                            <FaClock className="mr-1.5" /> {course.duration || "8 Weeks"}
                                        </span>
                                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center">
                                            <FaChartLine className="mr-1.5" /> {course.level || "All Levels"}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <span className="text-3xl font-bold text-white drop-shadow-md">৳ {course.price || "4,999"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                {/* Overview */}
                                {course.overview && (
                                    <motion.section
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="mb-8"
                                    >
                                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">Course Overview</h2>
                                        <p className="text-gray-700 leading-relaxed">{course.overview}</p>
                                    </motion.section>
                                )}

                                {/* Description */}
                                {course.description && (
                                    <motion.section
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="mb-8"
                                    >
                                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">Detailed Description</h2>
                                        <p className="text-gray-700 leading-relaxed">{course.description}</p>
                                    </motion.section>
                                )}

                                {/* Features */}
                                {course.features?.length > 0 && (
                                    <motion.section
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="mb-8"
                                    >
                                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">Key Features</h2>
                                        <ul className="space-y-3">
                                            {course.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                                    <span className="text-gray-700">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.section>
                                )}

                                {/* Outcomes */}
                                {course.outcomes?.length > 0 && (
                                    <motion.section
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="mb-8"
                                    >
                                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">What You'll Learn</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {course.outcomes.map((outcome, idx) => (
                                                <div key={idx} className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start">
                                                    <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                                    <div>{outcome}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.section>
                                )}

                                {/* Requirements */}
                                {course.requirements?.length > 0 && (
                                    <motion.section
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="mb-8"
                                    >
                                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">Requirements</h2>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 pl-2">
                                            {course.requirements.map((req, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <FaLaptop className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.section>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Enroll Card */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg"
                                >
                                    <h3 className="text-xl font-bold mb-4">Enroll in this Course</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span>Course Price:</span>
                                            <span className="text-2xl font-bold">৳ {course.price || "4,999"}</span>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-4 rounded-lg transition-colors shadow-md"
                                        >
                                            Enroll Now
                                        </motion.button>
                                        <div className="text-center text-blue-100 text-sm">
                                            30-Day Money-Back Guarantee
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Instructor Card */}
                                {course.instructor && (
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                                    >
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">About the Instructor</h3>
                                        <div className="flex items-start gap-4">
                                            <img
                                                src={instructorPhoto}
                                                alt={instructorName}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
                                                    e.target.onerror = null;
                                                }}
                                            />
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-800">{instructorName}</h4>
                                                {course.instructor.specialist && (
                                                    <p className="text-gray-600 text-sm mt-1">{course.instructor.specialist}</p>
                                                )}
                                                <div className="mt-3">
                                                    <button
                                                        onClick={() => setShowInstructor(true)}
                                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                                    >
                                                        View Profile <FaChevronLeft className="ml-1 rotate-180" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Course Info */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                                >
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Course Details</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 flex items-center">
                                                <FaClock className="mr-2 text-blue-500" /> Duration:
                                            </span>
                                            <span className="font-medium">{course.duration || "8 Weeks"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 flex items-center">
                                                <FaChartLine className="mr-2 text-blue-500" /> Level:
                                            </span>
                                            <span className="font-medium">{course.level || "All Levels"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 flex items-center">
                                                <FaLaptop className="mr-2 text-blue-500" /> Format:
                                            </span>
                                            <span className="font-medium">Online</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 flex items-center">
                                                <FaUserGraduate className="mr-2 text-blue-500" /> Students:
                                            </span>
                                            <span className="font-medium">100 enrolled</span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Course Rating */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                                >
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Course Rating</h3>
                                    <div className="flex items-center">
                                        <div className="text-4xl font-bold text-yellow-600">4.8</div>
                                        <div className="ml-4">
                                            <div className="flex text-yellow-400 mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className="fill-current" />
                                                ))}
                                            </div>
                                            <div className="text-gray-600 text-sm">Based on 428 reviews</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CourseDetails;