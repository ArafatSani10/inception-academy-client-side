import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Legend
} from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6B6B', '#A78BFA'];

const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: stats, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const { data: chartData = [] } = useQuery({
        queryKey: ['course-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/course-stats');
            return res.data;
        }
    });

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    if (isLoading) {
        return <div className="text-center text-xl font-semibold mt-10">Loading admin stats...</div>;
    }

    return (
        <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <h1 className="text-4xl font-bold mb-10 text-gray-800">
                Hi, Welcome <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">{user?.displayName || 'Admin'}</span> 👋
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard icon="💰" title="Total Revenue" value={`$${stats?.revenue || 0}`} desc="All course payments" color="from-green-400 to-green-600" />
                <StatCard icon="👥" title="Total Users" value={stats?.users || 0} desc="Registered accounts" color="from-blue-400 to-blue-600" />
                <StatCard icon="📘" title="Academy Courses" value={stats?.academyCourse || 0} desc="Published courses" color="from-purple-400 to-purple-600" />
                <StatCard icon="📝" title="Total Enrollments" value={stats?.enrollCourse || 0} desc="Paid enrollments" color="from-yellow-400 to-yellow-600" />
            </div>

            {/* Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Course Sales Overview</h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="title" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="quantity" shape={<TriangleBar />} label={{ position: 'top', fontSize: 12 }}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Revenue Distribution</h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="revenue"
                                nameKey="title"
                                cx="50%"
                                cy="50%"
                                outerRadius={110}
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`slice-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value, desc, color }) => {
    return (
        <div className={`rounded-2xl p-6 bg-white/70 backdrop-blur-md shadow-xl border border-white border-opacity-30 hover:scale-105 transition-transform duration-300`}>
            <div className="text-4xl mb-3">{icon}</div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">{title}</h2>
            <div className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${color}`}>{value}</div>
            <p className="text-sm text-gray-500 mt-1">{desc}</p>
        </div>
    );
};

export default AdminHome;
