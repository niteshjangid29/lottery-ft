"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import profile from "@/utils/assets/profile.jpg";
import {
	FaArrowLeft,
	FaUser,
	FaIdCard,
	FaPhone,
	FaMapMarkerAlt,
	FaUniversity,
	FaRedoAlt,
} from "react-icons/fa";
import { getKycDetails, resetKYC } from "@/redux/slices/kycSlice";
import { format } from "date-fns";
import { useEffect } from "react";
import { formatDate } from "@/utils/helpers/formatDate";

const KYCDetailsPage = () => {
	const router = useRouter();
	const { kycDetails } = useSelector((state: RootState) => state.kyc);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!kycDetails) {
			dispatch(getKycDetails());
		}
	}, [dispatch, kycDetails]);

	const handleResetKYC = () => {
		dispatch(resetKYC());
		router.push("/e-kyc");
	};

	if (!kycDetails) {
		return (
			<div className="min-h-screen py-16 md:pb-0 flex items-center justify-center bg-gray-100">
				Loading...
			</div>
		);
	}

	const kycType = kycDetails?.kyc.documents.find(
		(doc) => doc.kycType.toLowerCase() === "aadhar"
	)?.kycType;

	const aadharNo = kycDetails?.kyc.documents.find(
		(doc) => doc.kycType.toLowerCase() === "aadhar"
	)?.idNumber;

	const panNo = kycDetails?.kyc.documents.find(
		(doc) => doc.kycType.toLowerCase() === "pan"
	)?.idNumber;

	return (
		<div className="min-h-screen py-16 md:pb-0 bg-gray-100">
			<div className="max-w-3xl mx-auto p-4">
				<button
					onClick={() => router.back()}
					className="flex items-center gap-2 text-blue-600 mb-6"
				>
					<FaArrowLeft /> Back
				</button>

				{/* Header Section */}
				<div className="bg-white rounded-lg p-6 shadow-sm mb-6">
					<div className="flex gap-3 items-center">
						<Image
							src={profile}
							alt="Profile"
							width={100}
							height={100}
							className="rounded-lg"
						/>
						<div>
							<h1 className="text-lg font-bold capitalize">
								{kycDetails?.name}
							</h1>
							<p className="text-green-600 font-semibold">
								Verified via{" "}
								{kycType === "aadhar" ? "Aadhar" : "PAN"}
							</p>
						</div>
					</div>
				</div>

				{/* Personal Information */}
				<div className="bg-white rounded-lg p-6 shadow-sm mb-6">
					<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<FaUser /> Personal Information
					</h2>
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<p className="text-gray-600">Full Name</p>
							<p className="font-semibold capitalize">
								{kycDetails?.name}
							</p>
						</div>
						<div>
							<p className="text-gray-600">Date of Birth</p>
							<p className="font-semibold">
								{formatDate(kycDetails?.dob)}
							</p>
						</div>
						<div>
							<p className="text-gray-600">Gender</p>
							<p className="font-semibold capitalize">
								{kycDetails?.gender ? kycDetails.gender : "-"}
							</p>
						</div>
					</div>
				</div>

				{/* ID Information */}
				<div className="bg-white rounded-lg p-6 shadow-sm mb-6">
					<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<FaIdCard /> ID Information
					</h2>
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<p className="text-gray-600">Aadhar Number</p>
							<p className="font-semibold">
								XXXX XXXX {aadharNo?.slice(-4)}
							</p>
						</div>
						<div>
							<p className="text-gray-600">PAN Number</p>
							<p className="font-semibold">
								{panNo?.length === 0 || !panNo
									? "-"
									: `XXXXXXX${panNo?.slice(-3)}`}
							</p>
						</div>
					</div>
				</div>

				{/* Contact Information */}
				<div className="bg-white rounded-lg p-6 shadow-sm mb-6">
					<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<FaPhone /> Contact Information
					</h2>
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<p className="text-gray-600">Phone Number</p>
							<p className="font-semibold">
								{kycDetails?.phone_no}
							</p>
						</div>
					</div>
				</div>

				{/* Bank Details */}
				<div className="bg-white rounded-lg p-6 shadow-sm mb-6">
					<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<FaUniversity /> Bank Information
					</h2>
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<p className="text-gray-600">Bank Name</p>
							<p className="font-semibold">
								{kycDetails?.kyc.bank_details.bank_name
									? kycDetails.kyc.bank_details.bank_name
									: "-"}
							</p>
						</div>
						<div>
							<p className="text-gray-600">Account Number</p>
							<p className="font-semibold">
								{kycDetails?.kyc.bank_details.account_no
									? `XXXXXXXXX
								${kycDetails?.kyc.bank_details.account_no?.slice(-4)}`
									: "-"}
							</p>
						</div>
					</div>
				</div>

				{/* Address */}
				<div className="bg-white rounded-lg p-6 shadow-sm mb-6">
					<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<FaMapMarkerAlt /> Address
					</h2>
					<p className="whitespace-pre-wrap">
						{kycDetails?.address.local
							? kycDetails.address.local
							: "-"}
					</p>
				</div>

				{/* Reset KYC */}
				<div className="bg-white border border-red-400 flex flex-col gap-4 rounded-lg p-6 shadow-sm">
					<h2 className="text-lg font-semibold flex items-center gap-2">
						<FaRedoAlt /> Reset KYC
					</h2>
					<p className="whitespace-pre-wrap">
						Are you sure you want to reset KYC? This will delete all
						your KYC details and reset your KYC status.
					</p>
					<button
						onClick={handleResetKYC}
						className="w-full bg-gray-300 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-2 rounded"
					>
						Reset KYC
					</button>
				</div>
			</div>
		</div>
	);
};

export default KYCDetailsPage;
