import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseAxiosPublic from '../../../../hooks/UseAxiosPublic';

const SocialLogin = () => {
    const axiosPublic = UseAxiosPublic();
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);

                const userInfo = {
                    email:result.user?.email,
                    name:result.user?.displayName

                }
                axiosPublic.post('/users', userInfo)
                .then(res =>{
                    console.log(res.data)
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: `Welcome, ${result.user.displayName || 'User'}!`,
                    timer: 2000,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                    navigate('/');
                }, 2000); // ২ সেকেন্ড পরে হোমে যাবে
            })
            .catch(error => {
                console.error('Google Login Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message,
                });
            });
    };

    return (
        <div>
            <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
            >
                <FaGoogle className="text-red-500 text-lg" />
                <span className="text-sm font-medium text-gray-600">Continue with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;
