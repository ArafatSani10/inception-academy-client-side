import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    LoadCanvasTemplate,
    loadCaptchaEnginge,
    validateCaptcha,
} from 'react-simple-captcha';
import SocialLogin from '../Login/SocialLogin/SocialLogin';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UseAxiosPublic from '../../../hooks/UseAxiosPublic';

const Register = () => {
    const axiosPublic = UseAxiosPublic();
    const captchaRef = useRef(null);
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleValidateCaptcha = () => {
        const userInput = captchaRef.current.value;
        if (validateCaptcha(userInput)) {
            setIsCaptchaValid(true);
            toast.success('Captcha matched!');
        } else {
            setIsCaptchaValid(false);
            toast.error('Captcha does not match!');
        }
    };

    const onSubmit = (data) => {
        if (!isCaptchaValid) {
            toast.error('Please validate the captcha first.');
            return;
        }

        createUser(data.email, data.password, data.name)
            .then(() => {
                const userInfo = {
                    name: data.name,
                    email: data.email,
                };

                axiosPublic.post('/users', userInfo)
                    .then((res) => {
                        if (res.data.insertedId) {
                            console.log('user added to the database ')
                            toast.success('Registration successful!');
                            setTimeout(() => {
                                navigate('/login');
                            }, 2000);
                        } else {
                            toast.error('User creation failed on server.');
                        }
                    })
                    .catch((err) => {
                        toast.error('Server error: ' + err.message);
                        console.error('MongoDB Insert Error:', err);
                    });
            })
            .catch((error) => {
                toast.error('Registration failed: ' + error.message);
                console.error('Registration Error:', error.message);
            });
    };

    return (
        <div>
            <Helmet>
                <title>Sign Up || Inception-Academy</title>
            </Helmet>

            <ToastContainer />
            <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex items-center justify-center px-4 py-10">
                <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden">
                    <div className="lg:w-1/2 h-72 lg:h-auto">
                        <img
                            src="https://inceptionbd.com/store/1/default_images/front_register.jpg"
                            alt="Register Visual"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="lg:w-1/2 w-full p-8 bg-gradient-to-br from-white via-gray-50 to-white">
                        <h2 className="text-3xl font-bold text-start text-gray-800 mb-6">Sign Up</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block mb-1 text-gray-600 font-medium">Name</label>
                                <input
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block mb-1 text-gray-600 font-medium">Email</label>
                                <input
                                    type="email"
                                    {...register('email', { required: 'Email is required' })}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block mb-1 text-gray-600 font-medium">Password</label>
                                <input
                                    type="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        validate: {
                                            minLength: (v) => v.length >= 6 || 'Minimum 6 characters',
                                            hasUpperCase: (v) => /[A-Z]/.test(v) || 'One uppercase letter required',
                                            hasLowerCase: (v) => /[a-z]/.test(v) || 'One lowercase letter required',
                                            hasNumber: (v) => /\d/.test(v) || 'One number required',
                                            hasSpecialChar: (v) =>
                                                /[@$!%*?&]/.test(v) || 'One special character required',
                                        },
                                    })}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
                            </div>

                            {/* Captcha */}
                            <div>
                                <label className="block mb-1 text-gray-600 font-medium">
                                    <LoadCanvasTemplate />
                                </label>
                                <input
                                    type="text"
                                    ref={captchaRef}
                                    name="captcha"
                                    placeholder="Type the captcha here"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleValidateCaptcha}
                                    className="mt-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 py-2 rounded-lg font-medium transition"
                                >
                                    Validate Captcha
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!isCaptchaValid}
                                className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${isCaptchaValid
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Register
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="mt-6 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/login" className="text-indigo-600 hover:underline font-medium">
                                Login
                            </a>
                        </div>

                        {/* Social Login */}
                        <div className="my-6">
                            <div className="flex items-center justify-center gap-2 text-gray-400 mb-3">
                                <span className="w-1/5 h-px bg-gray-300" />
                                <span className="text-sm">or register with</span>
                                <span className="w-1/5 h-px bg-gray-300" />
                            </div>
                            <SocialLogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
