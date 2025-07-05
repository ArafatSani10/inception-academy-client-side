import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import SocialLogin from './SocialLogin/SocialLogin';
import { Helmet } from 'react-helmet';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const captchaRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [disable, setDisable] = useState(true);
  const [captchaError, setCaptchaError] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then(result => {
        const user = result.user;
        console.log("Login successful:", user);
        toast.success("Login successful!");
        navigate('/'); // Redirect to homepage or dashboard
      })
      .catch(error => {
        console.error("Login failed:", error.message);
        toast.error("Login failed: " + error.message);
      });
  };

  const handleValidateCaptcha = () => {
    const userInput = captchaRef.current.value;
    if (validateCaptcha(userInput)) {
      setDisable(false);
      setCaptchaError('');
      toast.success("Captcha validated!");
    } else {
      setDisable(true);
      setCaptchaError("Captcha does not match!");
      toast.error("Captcha does not match!");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Login || Inception Academy</title>
      </Helmet>

      <ToastContainer />

      <div className="py-20 max-sm:py-10 flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 px-4">
        <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-xl w-full max-w-6xl h-[480px] md:h-[480px] p-8 gap-8">
          {/* Left: Login Form */}
          <div className="w-full md:w-1/2 h-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block mb-1 text-gray-600 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block mb-1 text-gray-600 font-medium">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-indigo-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
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
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {captchaError && (
                  <p className="text-red-500 text-sm mt-1">{captchaError}</p>
                )}
                <button
                  type="button"
                  onClick={handleValidateCaptcha}
                  className="btn btn-outline btn-xs w-full mt-2"
                >
                  Validate Captcha
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={disable}
                className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                  disable
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                Sign In
              </button>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Don't have an account?</span>
                <Link to="/register" className="text-sm text-indigo-600 hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </form>

            {/* Social Login */}
            <div className="my-6 flex items-center justify-center gap-2 text-gray-400">
              <span className="w-1/4 h-px bg-gray-300" />
              <span className="text-sm">or continue with</span>
              <span className="w-1/4 h-px bg-gray-300" />
            </div>
            <SocialLogin />
          </div>

          {/* Right Image */}
          <div className="hidden md:block md:w-1/2 h-full">
            <img
              src="https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=600&q=80"
              alt="Login Visual"
              className="rounded-2xl object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
