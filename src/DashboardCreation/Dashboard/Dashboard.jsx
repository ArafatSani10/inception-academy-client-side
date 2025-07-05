import { NavLink, Outlet, Link } from "react-router-dom";
import { useContext, useState } from "react";
import {
  MdDashboard,
  MdMenu,
  MdClose,
  MdHome,
  MdPeople,
  MdClass,
  MdSettings,
  MdLogout,
  MdNotifications
} from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { AuthContext } from "../../providers/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import useCart from "../../hooks/useCart";

const Dashboard = () => {
  // todo: get admin value from database 
  const [isAdmin] = useAdmin();

  const [cart] = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex font-montserrat h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 w-72 h-full bg-gradient-to-b from-indigo-900 to-indigo-800 border-r border-indigo-700/50 shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo + Close */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-indigo-700/50 sticky top-0 bg-indigo-900 z-20">
          <div className="flex items-center gap-3">
            <div className="flex items-center space-x-3 bg-indigo-600 p-2  rounded-xl shadow-md">
              <div className="flex items-center justify-center bg-indigo-500 border-2 border-dashed border-indigo-300 rounded-lg w-12 h-12">
                <img
                  className="h-10 w-10 rounded-md shadow-sm object-cover"
                  src="https://i.ibb.co/bfRfmnh/506449397-122099659574908092-5042721577538220121-n.jpg"
                  alt="EduAdmin Logo"
                />
              </div>
              <span className="text-white max-sm:text-xs text-xs font-extrabold tracking-tight select-none">
                Inception Academy
              </span>
            </div>
          </div>
          <button
            className="lg:hidden text-indigo-200 hover:text-white transition"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <MdClose size={26} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-8 flex flex-col gap-1">
          {
            isAdmin ? <>

              <NavLink
                to="/dashboard/adminHome"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-xl font-medium transition-all duration-200
              ${isActive
                    ? "bg-white/10 text-white border-l-4 border-cyan-400"
                    : "text-indigo-200 hover:bg-white/5 hover:text-white"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <MdDashboard className="text-xl" />
                <span>Admin Home</span>
              </NavLink>

              <NavLink
                to="/dashboard/allUser"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-xl font-medium transition-all duration-200
              ${isActive
                    ? "bg-white/10 text-white border-l-4 border-cyan-400"
                    : "text-indigo-200 hover:bg-white/5 hover:text-white"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <MdPeople className="text-xl" />
                <span>All User</span>
              </NavLink>

              <NavLink
                to="/dashboard/addInstructor"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-xl font-medium transition-all duration-200
              ${isActive
                    ? "bg-white/10 text-white border-l-4 border-cyan-400"
                    : "text-indigo-200 hover:bg-white/5 hover:text-white"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <MdPeople className="text-xl" />
                <span>Add Instructors</span>
              </NavLink>

              <NavLink
                to="/dashboard/classes"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-xl font-medium transition-all duration-200
              ${isActive
                    ? "bg-white/10 text-white border-l-4 border-cyan-400"
                    : "text-indigo-200 hover:bg-white/5 hover:text-white"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <MdClass className="text-xl" />
                <span>Manage Classes</span>
              </NavLink>
            </>
              :
              <>
                <NavLink
                  to="/dashboard/userHome"
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-5 py-4 rounded-xl font-medium transition-all duration-200
              ${isActive
                      ? "bg-white/10 text-white border-l-4 border-cyan-400"
                      : "text-indigo-200 hover:bg-white/5 hover:text-white"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <MdDashboard className="text-xl" />
                  <span>User Home</span>
                </NavLink>



                <NavLink
                  to="/dashboard/cart"
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-5 py-4 rounded-xl font-medium transition-all duration-200
              ${isActive
                      ? "bg-white/10 text-white border-l-4 border-cyan-400"
                      : "text-indigo-200 hover:bg-white/5 hover:text-white"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <MdClass className="text-xl" />
                  <span>My cart ({cart.length})</span>
                </NavLink>


                <NavLink
                  to="/dashboard/paymentHistory"
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-5 py-4 rounded-xl font-medium transition-all duration-200
              ${isActive
                      ? "bg-white/10 text-white border-l-4 border-cyan-400"
                      : "text-indigo-200 hover:bg-white/5 hover:text-white"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <MdClass className="text-xl" />
                  <span>Payment History</span>
                </NavLink>
              </>
          }

          <div className="mt-8 pt-6 border-t border-indigo-700/50">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-xl font-medium transition-all duration-200
                ${isActive
                  ? "bg-white/10 text-white"
                  : "text-indigo-200 hover:bg-white/5 hover:text-white"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <MdHome className="text-xl" />
              <span>Go to Site</span>
            </NavLink>

            <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl font-medium text-indigo-200 hover:bg-white/5 hover:text-white transition-all duration-200">
              <MdSettings className="text-xl" />
              <span>Settings</span>
            </button>

            <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl font-medium text-indigo-200 hover:bg-rose-500/20 hover:text-rose-200 transition-all duration-200">
              <MdLogout className="text-xl" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open sidebar"
              className="lg:hidden text-indigo-600 hover:text-indigo-800 mr-4"
            >
              <MdMenu size={28} />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Dashboard Overview</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">

            </div>

            <div className="flex items-center gap-3">
              <button className="relative text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
                <MdNotifications size={24} />

              </button>

              <div className="border-l border-gray-200 pl-4 relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3"
                >
                  <div className="relative">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center text-gray-500">

                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 bg-green-500 border-2 border-white rounded-full w-3 h-3"></span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800 truncate max-w-[120px]">
                      {user?.displayName || "Admin User"}
                    </p>

                  </div>
                </button>

                {/* User Dropdown */}
                {user && isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-[1000] overflow-hidden transition-all duration-300 animate-fadeIn">
                    <div className="p-4 border-b">
                      <p className="text-sm font-semibold text-gray-700 truncate">
                        {user.displayName || user.email}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <MdDashboard className="text-lg" />
                        <span>Home</span>
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <MdSettings className="text-lg" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <IoLogOutOutline className="text-lg" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

