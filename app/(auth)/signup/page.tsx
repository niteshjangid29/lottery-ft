"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setProfile } from "@/redux/slices/retailerSlice";
import axios from "axios";
import toast from "react-hot-toast";
import countryCode from "@/utils/data/countryCode.json";
import { login } from "@/redux/slices/userSlice";

function SignupPage() {
  const [activeTab, setActiveTab] = useState<"user" | "retailer">("user");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brandName: "", // Only for retailer
    phone: "",
    otp: "",
    countryCode: "+91",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpSent) {
      try {
        await axios.post(`http://localhost:4000/api/v1/otp/sendOtp`, {
          phoneNumber: formData.phone,
          countryCode: formData.countryCode,
        });
        setOtpSent(true);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to send OTP");
      }
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        activeTab === "user" ? "/user/register" : "/retailer/register";

      const dataToSend =
        activeTab === "user"
          ? {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              otp: formData.otp,
            }
          : {
              name: formData.name,
              email: formData.email,
              brandName: formData.brandName,
              phone: formData.phone,
              otp: formData.otp,
            };

      const response = await axios.post(
        `http://localhost:4000/api/v1${endpoint}`,
        dataToSend
      );

      if (activeTab === "retailer") {
        // Handle retailer signup
        dispatch(setProfile(response.data.retailer));
        localStorage.setItem("retailerToken", response.data.token);
        router.push("/retailer/dashboard");
      } else {
        // Handle user signup
        dispatch(login(response.data.user));
        localStorage.setItem("userToken", response.data.token);
        router.push("/");
      }

      toast.success("Registration successful!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 md:pb-0 flex items-center justify-center">
      <div className="w-full sm:w-[60%] md:w-[50%] lg:w-[30%] mx-auto p-8">
        {/* Tabs */}
        <div className="flex mb-8 border-b">
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "user"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("user")}
          >
            User Signup
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "retailer"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("retailer")}
          >
            Retailer Signup
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          {activeTab === "retailer" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Brand Name
              </label>
              <input
                type="text"
                name="brandName"
                required
                value={formData.brandName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="flex gap-4">
              <select
                name="countryCode"
                id="countryCode"
                value={formData.countryCode}
                // defaultValue={"+91"}
                onChange={handleChange}
                className="mt-1 block w-[35%] rounded-md border border-gray-300 px-1 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
              >
                {countryCode.map((country, index) => {
                  return (
                    <option key={index} value={country.code}>
                      {country.code}-{country.country}
                    </option>
                  );
                })}
              </select>
              <input
                type="tel"
                name="phone"
                required
                disabled={otpSent}
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {otpSent && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                type="text"
                name="otp"
                required
                value={formData.otp}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {!otpSent
              ? "Send OTP"
              : loading
              ? "Creating Account..."
              : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
