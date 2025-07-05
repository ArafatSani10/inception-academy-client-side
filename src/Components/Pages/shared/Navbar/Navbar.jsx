import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaBars,
    FaTimes,
    FaHome,
    FaBookOpen,
    FaChalkboardTeacher,
    FaStore,
    FaComments,
    FaTable,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Search from '../Search/Search';
import { AuthContext } from '../../../../providers/AuthProvider';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {user} = useContext(AuthContext);

    // scroll lock when menu open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const navItems = [
        { name: 'Home', path: '/', icon: FaHome },
        { name: 'Courses', path: '/courses', icon: FaBookOpen },
        { name: 'Instructors', path: '/instructors', icon: FaChalkboardTeacher },
        { name: 'Store', path: '/store', icon: FaStore },
        { name: 'Forums', path: '/forums', icon: FaComments },
    ];

    // sidebar variants for framer motion
    const sidebarVariants = {
        hidden: { x: '100%' },
        visible: {
            x: 0,
            transition: { type: 'spring', stiffness: 300, damping: 30, when: "beforeChildren", staggerChildren: 0.1 }
        },
        exit: {
            x: '100%',
            transition: { ease: 'easeInOut', duration: 0.3, when: "afterChildren" }
        },
    };

    // nav item variants for staggered fade+slide animation
    const navItemVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: 30, transition: { duration: 0.2 } },
    };

    return (
        <div className="w-full   ">
            {/* Search bar */}
            <div className="max-w-full   mx-auto px-4 md:px-8 py-1">
                <Search />
            </div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-300  py-2 px-4 flex items-center justify-between">
                {/* Logo */}
                <NavLink to="/" onClick={closeMenu} className="flex-shrink-0">
                    <img
                        src="https://i.ibb.co/bfRfmnh/506449397-122099659574908092-5042721577538220121-n.jpg"
                        alt="Logo"
                        className="w-[130px] object-cover"
                        draggable={false}
                    />
                </NavLink>

                {/* Desktop nav */}
                <ul className="hidden md:flex items-center gap-6">
                    <li>
                        <button
                            className="flex items-center gap-2 px-5 py-1 bg-gradient-to-r from-teal-500 to-indigo-600 text-white text-base rounded-full shadow-md hover:scale-105 transition-transform duration-300 select-none"
                            type="button"
                            aria-label="Categories"
                        >
                            <FaTable /> Categories
                        </button>
                    </li>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-1 rounded-md text-base font-medium text-gray-700 hover:text-purple-700 transition-colors duration-300 ${
                                        isActive ? 'text-purple-800 font-semibold bg-purple-100/60' : ''
                                    }`
                                }
                                end
                            >
                                <item.icon className="text-lg" />
                                <span>{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                        {isMenuOpen ? (
                            <FaTimes className="text-3xl text-purple-700" />
                        ) : (
                            <FaBars className="text-3xl text-gray-800" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.aside
                        className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-lg z-50 flex flex-col"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={sidebarVariants}
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Header with close button */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-purple-700 select-none">Menu</h2>
                            <button
                                onClick={closeMenu}
                                aria-label="Close menu"
                                className="text-gray-600 hover:text-purple-700 transition-colors duration-300 text-2xl"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Nav items */}
                        <nav className="flex flex-col mt-4 px-6 gap-4 overflow-y-auto">
                            <button
                                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-teal-500 to-indigo-600 text-white text-base rounded-lg shadow-md justify-center select-none"
                                type="button"
                                aria-label="Categories"
                            >
                                <FaTable /> Categories
                            </button>

                            {navItems.map((item) => (
                                <motion.div
                                    key={item.name}
                                    variants={navItemVariants}
                                >
                                    <NavLink
                                        to={item.path}
                                        onClick={closeMenu}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 px-5 py-3 rounded-lg text-base font-semibold transition-colors duration-300 ${
                                                isActive
                                                    ? 'shadow text-purple-700 bg-purple-100'
                                                    : 'text-gray-800 hover:bg-purple-50 hover:text-purple-600'
                                            }`
                                        }
                                        end
                                    >
                                        <item.icon className="text-lg" />
                                        {item.name}
                                    </NavLink>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;
