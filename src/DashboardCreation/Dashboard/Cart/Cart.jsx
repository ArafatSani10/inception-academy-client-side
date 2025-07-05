import React from 'react';
import useCart from '../../../hooks/useCart';
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    // Delete handler (example only — you’ll implement backend later)
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


                // todo someting

                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-5  px-4">
            <div className="max-w-full mx-auto">
                {/* Summary */}
                <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-6 mb-10">
                    <div className="flex items-center gap-3">
                        <FaShoppingCart className="text-3xl text-blue-600" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Cart Summary</h2>
                            <p className="text-gray-600 text-sm">{cart.length} {cart.length === 1 ? "item" : "items"}</p>
                        </div>
                    </div>
                    <div className="text-center sm:text-right">
                        <p className="text-gray-500">Total Price</p>
                        <h3 className="text-2xl font-bold text-indigo-600">৳ {totalPrice.toFixed(2)}</h3>
                    </div>





                </div>
                {cart.length ? <Link to='/dashboard/payment'>
                    <div className="text-start  sm:text-left">
                        <button className='btn btn-primary'>
                            pay
                        </button>
                    </div>
                </Link> : <button disabled className='btn btn-primary'>
                    pay
                </button>}
                {/* Table */}
                <div className="overflow-x-auto mt-5 bg-white shadow-md rounded-2xl">
                    <table className="table w-full text-sm">
                        <thead className="bg-blue-100 text-gray-700">
                            <tr>
                                <th>#</th>
                                <th>Course Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={item._id} className="hover:bg-blue-50">
                                    <td className="font-medium">{index + 1}</td>
                                    <td>{item.title || "Unnamed Course"}</td>
                                    <td>৳ {item.price?.toFixed(2) || "0.00"}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                                        >
                                            <FaTrashAlt /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {cart.length === 0 && (
                        <div className="text-center py-10 text-gray-500">Your cart is empty.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
