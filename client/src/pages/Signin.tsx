import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import Logo from "../assets/top.png"
import RightImg from "../assets/rightImg.jpg"

interface FormData {
    email: string;
    otp: string;
}

interface FormErrors {
    email?: string;
    otp?: string;
}

function Signin() {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        otp: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [showOtp, setShowOtp] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }
        if (!formData.otp.trim()) newErrors.otp = "OTP is required.";

        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log(formData);
            // Submit to backend
        }
    };
    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center md:justify-center">
            {/* Form Section */}
            <div className="w-full max-w-md">
                <div className="flex items-center justify-center lg:justify-start mb-5 lg:pl-2">
                    <img src={Logo} alt="HD Logo" className="h-10" />
                    <p className="text-4xl font-semibold">HD</p>
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-1">Sign In</h2>
                <p className="text-base text-gray-500 text-center mb-6">
                    Please login to continue to your account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 px-6">
                    {/* Email */}
                    <div className="relative">
                        <label className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    {/* OTP */}
                    <div className="relative">
                        <label className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-700">
                            OTP
                        </label>
                        <input
                            type={showOtp ? "text" : "password"}
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${errors.otp ? "border-red-500" : "border-gray-300"
                                } rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowOtp((prev) => !prev)}
                            className="absolute right-3 top-2.5 text-gray-500"
                        >
                            {showOtp ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                        {errors.otp && <p className="text-sm text-red-500 mt-1">{errors.otp}</p>}
                    </div>

                    <p className='text-blue-500 underline text-sm cursor-pointer'>Resend OTP</p>

                    <div className="flex items-center gap-2 text-sm">
                        <input id='checkbox' type='checkbox' className="accent-blue-600" />
                        <label htmlFor="checkbox">Keep me logged in</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center mt-5">
                    Need an account?{" "}
                    <a href="/signup" className="text-blue-600 underline">
                        Create one
                    </a>
                </p>
            </div>

            {/* Image Section — only visible on large screens */}
            <div className="hidden lg:block flex-1">
                <img
                    src={RightImg}
                    alt="Login Visual"
                    className="w-full h-screen object-cover"
                />
            </div>
        </div>

    )
}

export default Signin