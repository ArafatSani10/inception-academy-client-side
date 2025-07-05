import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        },
    });

    return (
        <div className="p-3 bg-gray-50">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                Total Payments: {payments.length}
            </h1>

            <div className="overflow-x-auto rounded-lg shadow border bg-white">
                <table className="min-w-full table-auto text-left text-sm text-gray-700">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Price ($)</th>
                            <th className="px-4 py-3">Transaction ID</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr
                                key={payment._id || index}
                                className="border-t hover:bg-indigo-50 transition"
                            >
                                <td className="px-4 py-3 font-medium">{index + 1}</td>
                                <td className="px-4 py-3">${payment.price}</td>
                                <td className="px-4 py-3">{payment.transactionId || 'N/A'}</td>
                                <td className="px-4 py-3">
                                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                        Paid
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {payments.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                                    No payment history found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;

