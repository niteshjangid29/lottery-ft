"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
	getWalletBalance,
	getWalletTransactions,
	setBalance,
} from "@/redux/slices/walletSlice";
import { useSearchParams, useRouter } from "next/navigation";
import { FaWallet, FaTicketAlt, FaHistory } from "react-icons/fa";
import { recordTransaction } from "@/redux/slices/userSlice";

const CreditPage = () => {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const params = useSearchParams();
	const ticketId = params.get("ticketId");
	const ticketPrice = params.get("price");

	const { balance, transactions } = useSelector(
		(state: RootState) => state.wallet
	);
	const { authUser, userDetails } = useSelector(
		(state: RootState) => state.user
	);
	const { profile: retailer } = useSelector(
		(state: RootState) => state.retailer
	);

	const [amount, setAmount] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState("");

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	if (!authUser) {
		return (
			<div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="max-w-md mx-auto p-8">
					<div className="text-center">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							Please Login with a Customer Account
						</h2>
						<button
							onClick={() => router.push("/login")}
							className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
						>
							Login
						</button>
					</div>
				</div>
			</div>
		);
	}

	useEffect(() => {
		if (authUser) {
			dispatch(getWalletBalance())
				.unwrap()
				.then((data) => {
					console.log("Wallet balance fetched successfully:", data);
				})
				.catch((error) => {
					console.error("Failed to fetch wallet balance:", error);
				});

			dispatch(getWalletTransactions())
				.unwrap()
				.then((data) => {
					console.log(
						"Wallet transactions fetched successfully:",
						data
					);
				})
				.catch((error) => {
					console.error(
						"Failed to fetch wallet transactions:",
						error
					);
				});
		}
	}, [dispatch]);

	const handleAddFunds = () => {
		const fundAmount = parseFloat(amount);
		if (isNaN(fundAmount) || fundAmount <= 0) {
			setError("Please enter a valid amount");
			return;
		}
		dispatch(
			recordTransaction({
				amount: fundAmount,
				transaction_type: "wallet",
				lottery_id: null,
				operation: "add",
			})
		)
			.unwrap()
			.then((data) => {
				console.log("Transaction added successfully:", data);
				dispatch(setBalance(data.updatedBalance));
			});
		setAmount("");
		setError("");
	};

	const totalPages = Math.ceil(transactions.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentTransactions = transactions?.slice(startIndex, endIndex);

	return (
		<div className="min-h-screen bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto space-y-8">
				{/* Wallet Balance */}
				<div className="bg-white rounded-lg shadow-lg p-6">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-2xl font-bold text-gray-900 flex items-center">
							<FaWallet className="mr-2" /> Wallet Balance
						</h2>
						<span className="text-3xl font-bold text-green-600">
							₹{parseFloat(balance?.toString()).toFixed(2)}
						</span>
					</div>
					<div className="flex flex-col sm:flex-row gap-4">
						<input
							type="number"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							placeholder="Enter amount"
							className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						<button
							onClick={handleAddFunds}
							className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
						>
							Add Funds
						</button>
					</div>
					{error && <p className="text-red-500 mt-2">{error}</p>}
				</div>

				{/* Ticket Purchase Section */}
				{/* {ticketId && ticketPrice && (
					<div className="bg-white rounded-lg shadow-lg p-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-2xl font-bold text-gray-900 flex items-center">
								<FaTicketAlt className="mr-2" /> Purchase Ticket
							</h2>
							<span className="text-2xl font-bold text-blue-600">
								₹{parseFloat(ticketPrice).toFixed(2)}
							</span>
						</div>
						<div className="space-y-4">
							<p className="text-gray-600">
								Ticket ID: {ticketId}
								{retailer && (
									<span className="ml-2 text-sm text-gray-500">
										via {retailer.brandName}
									</span>
								)}
							</p>
							<button
								onClick={handlePurchaseTicket}
								disabled={
									isProcessing ||
									balance < parseFloat(ticketPrice)
								}
								className={`w-full py-3 rounded-lg text-white font-semibold ${
									isProcessing ||
									balance < parseFloat(ticketPrice)
										? "bg-gray-400 cursor-not-allowed"
										: "bg-green-600 hover:bg-green-700"
								} transition-colors`}
							>
								{isProcessing
									? "Processing..."
									: "Purchase Ticket"}
							</button>
							{balance < parseFloat(ticketPrice) && (
								<p className="text-red-500 text-sm">
									Insufficient balance. Please add funds to
									your wallet.
								</p>
							)}
						</div>
					</div>
				)} */}

				{/* Transaction History */}
				<div className="bg-white rounded-lg shadow-lg p-6">
					<h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
						<FaHistory className="mr-2" /> Transaction History
					</h2>
					<div className="space-y-4">
						{transactions.length === 0 ? (
							<p className="text-gray-500 text-center py-4">
								No transactions yet
							</p>
						) : (
							currentTransactions.map((transaction: any) => (
								<div
									key={transaction._id}
									className="flex items-center justify-between border-b pb-4"
								>
									<div>
										<p className="font-semibold text-gray-900">
											{transaction.description}
										</p>
										<p className="text-sm text-gray-500">
											{new Date(
												transaction.createdAt
											).toLocaleDateString("en-IN", {
												day: "numeric",
												month: "short",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit",
											})}
										</p>
									</div>
									<span
										className={`font-semibold ${
											transaction.transaction_type ===
											"wallet"
												? "text-green-600"
												: "text-red-600"
										}`}
									>
										{transaction.transaction_type ===
										"wallet"
											? "+"
											: "-"}
										₹{transaction.amount.toFixed(2)}
									</span>
								</div>
							))
						)}

						{/* Pagination Controls */}
						<div className="flex items-center justify-between mt-6">
							<button
								onClick={() =>
									setCurrentPage((prev) =>
										Math.max(prev - 1, 1)
									)
								}
								disabled={currentPage === 1}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50"
							>
								Previous
							</button>

							<div className="flex items-center gap-2">
								{Array.from(
									{ length: totalPages },
									(_, i) => i + 1
								).map((page) => (
									<button
										key={page}
										onClick={() => setCurrentPage(page)}
										className={`px-4 py-2 text-sm font-medium rounded-md ${
											currentPage === page
												? "bg-blue-600 text-white"
												: "text-gray-700 bg-white border border-gray-300"
										}`}
									>
										{page}
									</button>
								))}
							</div>

							<button
								onClick={() =>
									setCurrentPage((prev) =>
										Math.min(prev + 1, totalPages)
									)
								}
								disabled={currentPage === totalPages}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50"
							>
								Next
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreditPage;
