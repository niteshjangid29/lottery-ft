import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateProfile } from "../../redux/slices/retailerSlice";
import axios from "axios";

const StoreCustomization: React.FC = () => {
	const dispatch = useDispatch();
	const profile = useSelector((state: RootState) => state.retailer.profile);

	const [formData, setFormData] = useState({
		brandName: profile?.brandName || "",
		logo: profile?.logo || "",
		primaryColor: profile?.customization.primaryColor || "#000000",
		secondaryColor: profile?.customization.secondaryColor || "#ffffff",
		brandingText: profile?.customization.brandingText || "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage("");

		try {
			const response = await axios.put(
				"http://localhost:4000/api/v1/retailer/branding",
				{
					brandName: formData.brandName,
					logo: formData.logo,
					customization: {
						primaryColor: formData.primaryColor,
						secondaryColor: formData.secondaryColor,
						brandingText: formData.brandingText,
					},
				}
			);
			dispatch(updateProfile(response.data));
			setMessage("Store customization updated successfully!");
		} catch (error) {
			setMessage(
				"Failed to update store customization. Please try again."
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) return;

		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("logo", file);

		try {
			const response = await axios.post(
				"/api/retailer/upload-logo",
				formData
			);
			setFormData((prev) => ({
				...prev,
				logo: response.data.logoUrl,
			}));
		} catch (error) {
			setMessage("Failed to upload logo. Please try again.");
		}
	};

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-8">Store Customization</h1>

			<form onSubmit={handleSubmit} className="max-w-2xl">
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Store Name
					</label>
					<input
						type="text"
						name="brandName"
						value={formData.brandName}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>

				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Store Logo
					</label>
					<div className="flex items-center gap-4">
						{formData.logo && (
							<img
								src={formData.logo}
								alt="Store Logo"
								className="w-16 h-16 object-contain"
							/>
						)}
						<input
							type="file"
							accept="image/*"
							onChange={handleLogoUpload}
							className="border rounded p-2"
						/>
					</div>
				</div>

				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Primary Color
					</label>
					<input
						type="color"
						name="primaryColor"
						value={formData.primaryColor}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>

				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Secondary Color
					</label>
					<input
						type="color"
						name="secondaryColor"
						value={formData.secondaryColor}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>

				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Brand Text
					</label>
					<input
						type="text"
						name="brandingText"
						value={formData.brandingText}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>

				{message && (
					<div
						className={`p-4 rounded mb-4 ${
							message.includes("success")
								? "bg-green-100 text-green-700"
								: "bg-red-100 text-red-700"
						}`}
					>
						{message}
					</div>
				)}

				<button
					type="submit"
					disabled={isLoading}
					className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
						isLoading ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					{isLoading ? "Updating..." : "Update Store"}
				</button>
			</form>
		</div>
	);
};

export default StoreCustomization;
