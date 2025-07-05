import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import UseAxiosPublic from '../../../hooks/UseAxiosPublic';
import Swal from 'sweetalert2';

const AddInstructor = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const axiosPublic = UseAxiosPublic();



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            setIsUploading(true);
            setUploadProgress(30);
            const response = await axios.post(
                'https://api.imgbb.com/1/upload?key=fef551d0252d6e6b41362bdb5b2b0f99',
                formData,
                {
                    onUploadProgress: (e) => {
                        const percent = Math.round((e.loaded * 100) / e.total);
                        setUploadProgress(percent);
                    }
                }
            );
            setUploadProgress(100);
            return response.data.data.url;
        } catch (error) {
            throw new Error('Image upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            let imageUrl = '';
            if (data.image[0]) {
                imageUrl = await uploadImage(data.image[0]);
            }

            const instructor = {
                name: data.name,
                expertise: data.expertise,
                about: data.about,
                image: imageUrl,
                social: {
                    linkedin: data.linkedin,
                    twitter: data.twitter,
                    youtube: data.youtube,
                    facebook: data.facebook,
                },
            };

            // ✅ Send to backend
            const res = await axiosPublic.post('/instructors', instructor);

            if (res.data.insertedId || res.data.success) {
                reset();
                setImagePreview(null);
                Swal.fire({
                    title: "Drag me!",
                    icon: `${data.name} added to the instructor in you academy web`,
                    draggable: true
                });
            } else {
                alert('Something went wrong while saving to the database.');
            }
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <section className=" bg-gradient-to-tr from-gray-50 to-white p-6">
            <div className="max-w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Add Instructor
                    </h2>
                    <p className="text-sm text-indigo-200 mt-1">Fill the form to add a new expert</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10 space-y-10">
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Left */}
                        <div className="space-y-6">
                            <div>
                                <label className="block mb-1 font-medium">Full Name <span className="text-red-500">*</span></label>
                                <input
                                    {...register('name', { required: 'Name is required' })}
                                    placeholder="Dr. Sarah Johnson"
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Expertise <span className="text-red-500">*</span></label>
                                <input
                                    {...register('expertise', { required: 'Expertise is required' })}
                                    placeholder="UI/UX, React, Firebase"
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.expertise ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.expertise && <p className="text-sm text-red-500 mt-1">{errors.expertise.message}</p>}
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">About Instructor <span className="text-red-500">*</span></label>
                                <textarea
                                    {...register('about', {
                                        required: 'About is required',
                                        minLength: {
                                            value: 50,
                                            message: 'Minimum 50 characters',
                                        },
                                    })}
                                    rows={5}
                                    placeholder="Background, philosophy, experience..."
                                    className={`w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.about ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.about && <p className="text-sm text-red-500 mt-1">{errors.about.message}</p>}
                            </div>
                        </div>

                        {/* Right */}
                        <div className="space-y-6">
                            <div>
                                <label className="block mb-1 font-medium">Profile Image <span className="text-red-500">*</span></label>
                                <label className={`relative flex flex-col justify-center items-center h-64 border-2 border-dashed rounded-xl cursor-pointer transition ${errors.image ? 'border-red-500' : 'border-gray-300'} hover:bg-gray-100`}>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                                    ) : (
                                        <div className="text-center">
                                            <svg className="w-10 h-10 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            <p className="text-gray-500 text-sm mt-2">Click to upload or drag here</p>
                                            <p className="text-xs text-gray-400">PNG, JPG, JPEG (Max: 5MB)</p>
                                        </div>
                                    )}
                                    <input
                                        {...register('image', { required: 'Image is required' })}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </label>
                                {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>}
                                {isUploading && (
                                    <div className="mt-2">
                                        <div className="w-full h-2 bg-gray-200 rounded-full">
                                            <div className="h-2 bg-indigo-600 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
                                    </div>
                                )}
                            </div>

                            <div className="grid gap-4">
                                {['linkedin', 'twitter', 'youtube', 'facebook'].map((platform) => (
                                    <div key={platform}>
                                        <label className="block mb-1 font-medium capitalize">{platform}</label>
                                        <input
                                            {...register(platform)}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                            placeholder={`https://${platform}.com/username`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isUploading}
                            className={`w-full py-3 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-transform duration-200 transform hover:-translate-y-0.5 ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isUploading ? 'Uploading Image...' : 'Add Instructor'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddInstructor;
