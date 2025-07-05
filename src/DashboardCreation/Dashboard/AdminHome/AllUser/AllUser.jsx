import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaSearch, FaUserShield, FaUser, FaTrashAlt, FaCrown } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import Swal from 'sweetalert2';

const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;

    const { data: users = [], refetch, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: `${user.name} is an admin Now.!`,
                        icon: "success",
                        draggable: true
                    });
                }
            })
    }

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };



    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ImSpinner2 className="animate-spin text-4xl text-indigo-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500 text-xl">Error loading users</p>
                <p className="text-gray-500 mt-2">Please try again later</p>
            </div>
        );
    }

    return (
        <div className=" max-w-full mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <FaUserShield className="text-indigo-600" />
                    User Management
                </h1>
                <p className="text-gray-600 mt-1">Review and manage user accounts</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                {/* Top Summary + Search */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <div className="bg-indigo-50 p-3 rounded-xl mr-4">
                            <FaUser className="text-indigo-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Users</p>
                            <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                        </div>
                    </div>

                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-left">
                                <th className="py-4 px-6 font-medium">User</th>
                                <th className="py-4 px-6 font-medium">Email</th>
                                <th className="py-4 px-6 font-medium">Role</th>
                                <th className="py-4 px-6 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-5 px-6">
                                        <div className="flex items-center">
                                            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                                                {user.profileImage || user.photoURL ? (
                                                    <img
                                                        src={user.profileImage || user.photoURL}
                                                        alt={user.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-indigo-800 font-bold">{user.name?.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <p className="font-medium text-gray-800">{user.name}</p>
                                                <p className="text-gray-500 text-sm">ID: {user._id.slice(-6)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6 text-gray-800">{user.email}</td>
                                    <td className="py-5 px-6 text-gray-700">
                                        {
                                            user.role === 'admin' ? "Admin" :
                                                <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    title="Make Admin"
                                                    className="text-indigo-600 hover:text-indigo-800 transition"
                                                >
                                                    <FaCrown />
                                                </button>
                                        }
                                    </td>

                                    <td className="py-5 px-6 text-right">
                                        <button
                                            onClick={() => handleDelete(user._id)}

                                            className="text-red-600 hover:text-red-800 transition"
                                            title="Delete User"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaSearch className="text-gray-400 text-2xl" />
                        </div>
                        <p className="text-gray-600">No users found</p>
                        <p className="text-gray-500 mt-1 text-sm">Try adjusting your search query</p>
                    </div>
                )}

                {/* Pagination */}
                <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100">
                    <p className="text-gray-600">
                        Showing {Math.min(indexOfFirstUser + 1, filteredUsers.length)}–
                        {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUser;
