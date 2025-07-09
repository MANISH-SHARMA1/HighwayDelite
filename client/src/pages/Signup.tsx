import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Logo from "../assets/top.png";
import RightImg from "../assets/rightImg.jpg";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

interface FormData {
    name: string;
    dob: string;
    email: string;
    otp: string;
}

interface FormErrors {
    name?: string;
    dob?: string;
    email?: string;
    otp?: string;
}

const SignUp: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<FormData>({
        name: "",
        dob: "",
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

        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.dob) newErrors.dob = "Date of birth is required.";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }
        if (!formData.otp.trim()) newErrors.otp = "OTP is required.";

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                const response = await axiosClient.post("/jwtAuth/signup", {
                    formData
                })

                setFormData({
                    name: "",
                    dob: "",
                    email: "",
                    otp: ""
                })
                navigate("/signin")
                alert(response.data.result)
            } catch (error) {
                return
            }
        }
    };

    const handleGoogleLogin = () => {
        window.open(`${process.env.REACT_APP_SERVER_URL}auth/google/callback`, "_self");
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center md:justify-center">
            {/* Form section */}
            <div className="w-full max-w-md">
                <div className="flex items-center justify-center lg:justify-start mt-5 lg:mt-0 mb-5 lg:pl-2">
                    <img src={Logo} alt="HD Logo" className="h-10" />
                    <p className="text-4xl font-semibold">HD</p>
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-1">Sign up</h2>
                <p className="text-base text-gray-500 text-center mb-6">
                    Sign up to enjoy the feature of HD
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 px-6">
                    {/* Name */}
                    <div className="relative">
                        <label className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-700">
                            Your Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"
                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* DOB */}
                    <div className="relative">
                        <label className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-700">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${errors.dob ? "border-red-500" : "border-gray-300"
                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.dob && <p className="text-sm text-red-500 mt-1">{errors.dob}</p>}
                    </div>

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

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        Sign up
                    </button>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full text-white rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 transition px-4 py-2"
                    >
                        Continue With Google
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center mt-5">
                    Already have an account?{" "}
                    <a href="/signin" className="text-blue-600 underline">
                        Sign in
                    </a>
                </p>
            </div>

            {/* Right Image */}
            <div className="hidden lg:flex flex-1">
                <img
                    src={RightImg}
                    alt="Signup Visual"
                    className="w-full h-screen object-cover"
                />
            </div>
        </div>
    );
};

export default SignUp;
