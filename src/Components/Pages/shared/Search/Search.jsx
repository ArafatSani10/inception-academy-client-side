import React, { useContext, useState, useRef, useEffect } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoNotifications, IoLogOutOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import './Search.css'
import { AuthContext } from "../../../../providers/AuthProvider";
import useCart from "../../../../hooks/useCart";
import useAdmin from "../../../../hooks/useAdmin";

const Search = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    Swal.fire({
      title: "Logging out...",
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false,
    });

    logout()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        setIsDropdownOpen(false);
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: error.message,
        });
      });
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hover handlers with delay
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // 200ms delay
  };

  return (
    <div className="w-full px-4 md:px-8 relative z-[999]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
        {/* Search Input */}
        <div className="relative flex items-center w-full md:w-[300px] mb-4 sm:mb-0">
          <input
            className="p-3 w-full border-2 rounded-lg pl-10"
            placeholder="Search..."
            type="text"
          />
          <FaSearch className="absolute left-3 text-gray-500" size={20} />
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-between w-full sm:w-auto space-x-6">
          <div className="flex items-center gap-4 opacity-40">
            <div className="relative">
              <Link to='/dashboard/cart'>
                <FaCartShopping className="text-2xl text-black" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 text-xs">
                  {cart.length}
                </span>
              </Link>
            </div>
            <IoNotifications className="text-2xl text-black" />
          </div>

          {/* User Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
          >
            {user ? (
              <button
                className="focus:outline-none"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-gray-600" />
                )}
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <span className="cursor-pointer border-2 border-gray-300 p-2 px-4 rounded-xl text-gray-700 hover:bg-purple-100 hover:border-purple-500 transition duration-300">
                    Login
                  </span>
                </Link>
                <Link to="/register">
                  <span className="cursor-pointer border-2 bg-slate-500 text-white p-2 px-4 rounded-xl hover:bg-slate-600 transition duration-300">
                    Register
                  </span>
                </Link>
              </div>
            )}

            {/* Dropdown */}
            {user && isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-[1000] p-4 space-y-3 transition-all duration-300 animate-dropdown">
                <div className="text-sm font-semibold text-gray-700 border-b pb-2">
                  {user.displayName || user.email}
                </div>


                {
                  user && isAdmin &&
                  <Link
                    to="/dashboard/adminHome"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition"
                  >
                    <MdDashboard className="text-xl" />
                    Dashboard
                  </Link>
                }

                 {
                  user && !isAdmin &&
                  <Link
                    to="/dashboard/userHome"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition"
                  >
                    <MdDashboard className="text-xl" />
                    Dashboard
                  </Link>
                }



                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition"
                >
                  <IoLogOutOutline className="text-xl" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
