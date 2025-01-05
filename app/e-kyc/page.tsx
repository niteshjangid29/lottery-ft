"use client";

import { useState } from "react";
import { KYC_DETAILS } from "@/utils/data/kycDetails";
import toast from "react-hot-toast";
import Image from "next/image";
import profile from "@/utils/assets/profile.jpg";
import aadhar from "@/utils/assets/aadhar.png";
import pan from "@/utils/assets/pan.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
	setIdNumber,
	setKYCType,
	setUserDetails,
	setVerificationStatus,
} from "@/redux/slices/kycSlice";
import { useRouter } from "next/navigation";

const EKYCPage = () => {
	const dispatch = useDispatch();
	const { kycType, idNumber, isVerified, userDetails } = useSelector(
		(state: RootState) => state.kyc
	);
	const { authUser } = useSelector((state: RootState) => state.user);

	const [otp, setOtp] = useState("");
	const [isOtpSent, setIsOtpSent] = useState(false);
	const router = useRouter();

	const handleKycTypeSelect = (type: "aadhar" | "pan") => {
		dispatch(setKYCType(type));
		setIsOtpSent(false);
		setOtp("");
	};

	const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setIdNumber(e.target.value));
	};

	const handleVerifyId = () => {
		const user = KYC_DETAILS.find((user) =>
			kycType === "aadhar"
				? user.aadhar_no.replace(/\s/g, "") ===
				  idNumber.replace(/\s/g, "")
				: user.pan_no === idNumber
		);

		if (!user) {
			toast.error("Invalid ID number");
			return;
		}

		setIsOtpSent(true);
		toast.success(
			`OTP sent to ${user.phone_no.slice(0, 3)}****${user.phone_no.slice(
				-4
			)}`
		);
	};

	const handleVerifyOTP = () => {
		if (otp === "1234") {
			// Dummy OTP
			const user = KYC_DETAILS.find((user) =>
				kycType === "aadhar"
					? user.aadhar_no.replace(/\s/g, "") ===
					  idNumber.replace(/\s/g, "")
					: user.pan_no === idNumber
			);

			if (user) {
				dispatch(
					setUserDetails({
						name: user.name,
						dob: user.dob,
						gender: user.gender,
						phone_no: user.phone_no,
						address: user.address,
						aadhar_no: user.aadhar_no,
						pan_no: user.pan_no,
						bank_name: user.bank_details.bank_name,
						bank_account_no: user.bank_details.account_no,
					})
				);
				dispatch(setVerificationStatus(true));
				toast.success("KYC verified successfully!");
			} else {
				toast.error("User not found");
			}
		} else {
			toast.error("Invalid OTP");
		}
	};

	if(!authUser) {
		router.push("/login");
		return null;
	}

	return (
		<div className="min-h-screen pt-16 bg-gray-100 pb-16 md:pb-0">
			<div className="max-w-7xl mx-auto h-full p-4">
				<h1 className="text-2xl font-bold mb-6">E-KYC Verification</h1>

				{/* KYC Type Selection */}
				<div className="flex flex-col md:flex-row gap-4 mb-6 md:w-[50%] mx-auto">
					<button
						className={`px-4 py-2 rounded ${
							kycType === "aadhar"
								? "bg-blue-600 text-white"
								: "bg-gray-200"
						} disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-between gap-2`}
						disabled={isVerified}
						onClick={() => handleKycTypeSelect("aadhar")}
					>
						<p>Link with your Aadhar</p>
						<Image
							src={aadhar}
							alt="aadhar"
							width={40}
							height={40}
						/>
					</button>
					<button
						className={`px-4 py-2 rounded ${
							kycType === "pan"
								? "bg-blue-600 text-white"
								: "bg-gray-200"
						} disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-between gap-2`}
						disabled={isVerified}
						onClick={() => handleKycTypeSelect("pan")}
					>
						<p>Link with your PAN</p>
						<Image src={pan} alt="pan" width={40} height={40} />
					</button>
				</div>

				{/* ID Input */}
				{kycType && !isVerified && (
					<div className="space-y-4 md:w-[50%] mx-auto">
						<input
							type="text"
							placeholder={
								kycType === "aadhar"
									? "Enter Aadhar Number"
									: "Enter PAN Number"
							}
							value={idNumber}
							onChange={handleIdNumberChange}
							className="w-full p-2 border rounded"
						/>
						{!isOtpSent ? (
							<button
								onClick={handleVerifyId}
								className="w-full bg-blue-600 text-white py-2 rounded"
							>
								Verify ID
							</button>
						) : (
							<div className="space-y-4">
								<input
									type="text"
									placeholder="Enter OTP"
									value={otp}
									onChange={(e) => setOtp(e.target.value)}
									className="w-full p-2 border rounded"
								/>
								<button
									onClick={handleVerifyOTP}
									className="w-full bg-blue-600 text-white py-2 rounded"
								>
									Verify OTP
								</button>
							</div>
						)}
					</div>
				)}

				{/* Display KYC Details */}
				{isVerified && userDetails && (
					<div className="mt-6 p-4 border rounded-lg bg-blue-100">
						<h2 className="text-base font-semibold mb-4">
							Verified KYC Details
						</h2>
						<div
							className="flex gap-4 items-center"
							onClick={() => router.push("/e-kyc/details")}
						>
							<div>
								<Image
									src={profile}
									alt="Profile"
									width={75}
									height={100}
									className="rounded-lg"
								/>
							</div>
							<div className="space-y-2 text-xs">
								<p>
									Name:{" "}
									<span className="font-bold capitalize">
										{userDetails.name}
									</span>
								</p>
								<p>
									Status:{" "}
									<span className="text-green-600 font-bold">
										{"VERIFIED"}
									</span>
								</p>
								<p>
									Type:{" "}
									<span className="font-bold uppercase">
										{kycType === "aadhar"
											? "Aadhar"
											: "PAN"}
									</span>
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default EKYCPage;
