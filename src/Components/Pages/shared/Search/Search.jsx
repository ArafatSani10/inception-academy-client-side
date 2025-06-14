import { Helmet } from 'react-helmet';
import { FaSearch } from 'react-icons/fa';
import { FaCartShopping } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";

const Search = () => {
    return (
        <div className="w-full max-w-full h-full mx-auto px-4 md:px-8">
            <Helmet>
                <title>Home | Inception Academy BD</title>
            </Helmet>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">

                {/* Search Input */}
                <div className="relative flex items-center w-full sm:w-1/3 mb-4 sm:mb-0">
                    <input
                        className="p-3 w-full border-2 rounded-lg pl-10"
                        placeholder="Search..."
                        type="text"
                    />
                    <FaSearch className="absolute left-3 text-gray-500" size={20} />
                </div>

                {/* Icons and Login/Register */}
                <div className="flex items-center justify-between w-full max-sm:justify-between space-x-6 max-sm:space-x-10 sm:w-auto">

                    {/* Icons */}
                    <div className="flex items-center gap-4 opacity-40">
                        <FaCartShopping className="text-2xl text-black" />
                        <IoNotifications className="text-2xl text-black" />
                    </div>

                    {/* Login/Register */}
                    <div className="flex items-center gap-4">
                        <span className="cursor-pointer border-2 border-gray-300 p-2 px-4 rounded-xl text-gray-700 hover:bg-purple-100 hover:border-purple-500 transition duration-300">
                            Login
                        </span>
                        <span className="cursor-pointer border-2 border-slate-500 bg-slate-500 text-white p-2 px-4 rounded-xl hover:bg-slate-600 hover:border-slate-600 transition duration-300">
                            Register
                        </span>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Search;
