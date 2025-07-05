import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckOutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();


    const stripe = useStripe();
    const elements = useElements();

    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const { user } = useContext(AuthContext);

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data)
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        setProcessing(true);

        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentMethodError) {
            setError(paymentMethodError.message);
            setProcessing(false);
            return;
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || 'anonymouse',
                    name: user?.displayName || 'anonymouse',

                },
            },
        });


        if (confirmError) {
            console.log('confirm error')
        }

        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id)


                // now save the payment in the datavase
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    courseIds: cart.map(item => item.courseId),
                    status: 'pending'

                }

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                refetch();

                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        title: "Thank You for the Payment !",
                        icon: "success",
                        draggable: true
                    });

                    navigate('/dashboard/paymentHistory')
                }
            }
        }


    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl  p-6 bg-white rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Complete Your Payment</h2>

            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
                className="py-3 px-4 border border-gray-300 rounded-md bg-gray-50"
            />

            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className={`w-full py-2 text-white font-semibold rounded-lg transition ${processing ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
                {processing ? 'Processing...' : 'Pay Now'}
            </button>

            {error && <p className="text-red-600">{error}</p>}
            {transactionId && <p className="text-green-600">Payment successful! Transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckOutForm;
