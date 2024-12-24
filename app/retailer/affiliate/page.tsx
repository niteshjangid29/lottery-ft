"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";

function AffiliatePage() {
	const [inputValue, setInputValue] = useState("");
	const [affiliateLink, setAffiliateLink] = useState<string>("");

	const handleGenerateLink = () => {
		const uniqueCode = Math.random().toString(36).slice(2);
		// const link = `https://lottery-ft.vercel.app/affiliate/${uniqueCode}`;
		const dummylink = `http://localhost:3000/affiliate/${uniqueCode}`;
		setInputValue(dummylink);
		setAffiliateLink(dummylink);
	};

	const copyToClipboard = (text: string): void => {
		navigator.clipboard
			.writeText(text)
			.then(
				() => {
					toast.success("Copied to clipboard!");
				},
				(err) => {
					toast.error("Failed to copy text");
					console.log("Copy failed", err);
				}
			)
			.catch((err) => {
				console.error("Failed to copy text to clipboard:", err);
			});
	};

	return (
		<div className="min-h-screen bg-gray-100 py-16 md:pb-0">
			<div className="max-w-7xl mx-auto p-4">
				<h1 className="text-4xl font-bold text-gray-800">
					Affiliate Program
				</h1>

				<div className="flex gap-4 mt-8 flex-col sm:flex-row">
					<div className="relative w-full sm:w-1/2 flex items-center gap-2">
						<input
							type="text"
							placeholder="Your Affiliate Link"
							className="w-full p-2 border rounded"
							readOnly={true}
							value={affiliateLink}
						/>

						{inputValue && (
							<button
								className="w-[20px] flex items-center justify-center h-[20px] absolute right-2 z-10 text-gray-600 rounded"
								onClick={() => copyToClipboard(inputValue)}
							>
								<FaCopy />
							</button>
						)}
					</div>

					<button
						className="w-full sm:w-1/2 bg-blue-500 text-white py-3 px-6 rounded disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-300"
						onClick={handleGenerateLink}
						disabled={affiliateLink !== ""}
					>
						Generate You Link
					</button>
				</div>

				{/* Display all affiliate codes */}
				{/* <div className="mt-8 flex flex-col gap-4">
					<h2 className="text-2xl font-bold">Your Affiliate Codes</h2>
					<ul className="flex flex-col">
						{affiliateCodes.map((code, index) => (
							<li key={index}>{code}</li>
						))}
					</ul>
				</div> */}
			</div>
		</div>
	);
}

export default AffiliatePage;
