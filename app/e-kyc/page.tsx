"use client";

import { useEffect, useState } from "react";
import { KYC_DETAILS } from "@/utils/data/kycDetails";
import toast from "react-hot-toast";
import Image from "next/image";
import profile from "@/utils/assets/profile.jpg";
import aadhar from "@/utils/assets/aadhar.png";
import pan from "@/utils/assets/pan.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
	getKycDetails,
	updateKYC,
} from "@/redux/slices/kycSlice";
import { useRouter } from "next/navigation";
import axios from "axios";

const EKYCPage = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getKycDetails());
	}, [dispatch]);

	const { isVerified, kycDetails } = useSelector(
		(state: RootState) => state.kyc
	);
	const { authUser, userDetails } = useSelector(
		(state: RootState) => state.user
	);
	const [kycType, setKycType] = useState<"aadhar" | "pan">("aadhar");
	const [idNumber, setIdNumber] = useState("");

	const [otp, setOtp] = useState("");
	const [isOtpSent, setIsOtpSent] = useState(false);
	const router = useRouter();

	const countryCode = userDetails?.phoneNumber.split(" ")[0];
	const phone = userDetails?.phoneNumber.split(" ")[1];

	console.log("kycType", kycType);
	console.log("kycDetails", kycDetails);
	console.log("isVerified", isVerified);

	const handleVerifyId = async () => {
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

		try {
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/otp/sendOtp`, {
				phoneNumber: phone,
				countryCode: countryCode,
			});
			setIsOtpSent(true);
			toast.success(
				`OTP sent to *******${userDetails?.phoneNumber.slice(-3)}`
			);
		} catch (error: any) {
			toast.error(error.response?.data?.message || "Failed to send OTP");
		}
	};

	const handleKycUpdate = async () => {
		dispatch(updateKYC({ kycType, idNumber, otp: otp.trim() }));
	};

	if (!authUser) {
		router.push("/login");
		return null;
	}

	return (
		<div className="min-h-screen pt-16 bg-gray-100 pb-16 md:pb-0">
			<div className="max-w-7xl mx-auto h-full p-4">
				<h1 className="text-2xl font-bold mb-6">E-KYC Verification</h1>

				{/* KYC Type Selection */}
				<div
					className={`flex flex-col md:flex-row gap-4 mb-6 md:w-[50%] mx-auto ${
						isVerified ? "hidden" : ""
					}`}
				>
					<button
						className={`px-4 py-2 rounded ${
							kycType === "aadhar"
								? "bg-blue-600 text-white"
								: "bg-gray-200"
						} disabled:bg-gray-200 disabled:text-gray-400 disabled:hidden flex items-center justify-between gap-2`}
						disabled={isVerified}
						onClick={() => setKycType("aadhar")}
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
						} disabled:bg-gray-200 disabled:text-gray-400 disabled:hidden flex items-center justify-between gap-2`}
						disabled={isVerified}
						onClick={() => setKycType("pan")}
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
							required
							value={idNumber}
							onChange={(e) => setIdNumber(e.target.value)}
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
									onClick={handleKycUpdate}
									className="w-full bg-blue-600 text-white py-2 rounded"
								>
									Verify OTP
								</button>
							</div>
						)}
					</div>
				)}

				{/* Display KYC Details */}
				{isVerified && kycDetails && (
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
										{kycDetails.name}
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
										{kycDetails.kyc.documents.find(
											(doc) =>
												doc.kycType.toLowerCase() ===
												"aadhar"
										)
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
