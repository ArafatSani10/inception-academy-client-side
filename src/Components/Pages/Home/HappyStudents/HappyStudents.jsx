import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

import { AuthContext } from '../../../../providers/AuthProvider';
import useAdmin from '../../../../hooks/useAdmin';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const backendURL = 'http://localhost:5000'; // <-- Your backend base URL here

const HappyStudents = () => {
  const axiosSecure = useAxiosSecure(); // axios instance with auth token
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  const [instructorCount, setInstructorCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [enrollCount, setEnrollCount] = useState(0);

  const { ref, inView } = useInView({ triggerOnce: true });

  // Always fetch instructors securely (token required)
  useEffect(() => {
    axiosSecure.get('/instructors')
      .then(res => setInstructorCount(res.data.length))
      .catch(err => console.error('Error loading instructors:', err));
  }, [axiosSecure]);

  // Fetch course & enroll counts from admin or public stats
  useEffect(() => {
    if (user && isAdmin) {
      // Admin: secure stats
      axiosSecure.get('/admin-stats')
        .then(res => {
          setCourseCount(res.data.academyCourse || 0);
          setEnrollCount(res.data.enrollCourse || 0);
        })
        .catch(err => console.error('Error loading admin stats:', err));
    } else {
      // Public: no auth
      axios.get(`${backendURL}/public-stats`)
        .then(res => {
          setCourseCount(res.data.academyCourse || 0);
          setEnrollCount(res.data.enrollCourse || 0);
        })
        .catch(err => console.error('Error loading public stats:', err));
    }
  }, [user, isAdmin, axiosSecure]);

  const StatCard = ({ title, count, description, bgClass }) => (
    <motion.div
      className={`${bgClass} text-white rounded-2xl shadow-lg p-8 text-center transform hover:scale-105 hover:bg-gray-900 transition-all duration-500 cursor-pointer`}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-5xl font-bold mt-4">
        <CountUp end={count} duration={2} />
      </p>
      <p className="mt-3 text-sm text-white/80">{description}</p>
    </motion.div>
  );

  return (
    <div ref={ref} className="max-w-full mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Instructors"
        count={instructorCount}
        bgClass="bg-gradient-to-r from-cyan-500 to-blue-500"
        description="Skilled professionals sharing knowledge to empower learners."
      />
      <StatCard
        title="Total Courses"
        count={courseCount}
        bgClass="bg-gradient-to-r from-fuchsia-500 to-purple-500"
        description="Carefully crafted content to boost real-world skills."
      />
      <StatCard
        title="Total Enrollments"
        count={enrollCount}
        bgClass="bg-gradient-to-r from-green-400 to-green-500"
        description="Students upgrading their futures through our platform."
      />
    </div>
  );
};

export default HappyStudents;
