"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
import TransactionList from "../../../components/retailer/TransactionList";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
	fetchRetailerDetails,
	getTransactionStats,
	processAffiliatePayment,
} from "@/redux/slices/retailerSlice";

function AffiliatePage() {
	const [affiliateLink, setAffiliateLink] = useState<string>("");
	// const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(false);
	const {
		authRetailer,
		profile: retailer,
		sales,
		stats,
	} = useSelector((state: RootState) => state.retailer) as any;
	const dispatch = useDispatch<AppDispatch>();

	console.log("stats", stats);

	useEffect(() => {
		setLoading(true);
		if (retailer?.uniqueId) {
			const link = `${window.location.origin}/store/?affiliate_id=${retailer.uniqueId}`;
			setAffiliateLink(link);
			dispatch(getTransactionStats({ retailerId: retailer?._id }));
			dispatch(fetchRetailerDetails())
				.unwrap()
				.then((data) => {
					console.log("Stats fetched successfully:", data);
				})
				.catch((error) => {
					console.error("Failed to fetch stats:", error);
				});
		}
		setLoading(false);
	}, [retailer, dispatch]);

	const handleProcessPayment = async (transactionIds: string[]) => {
		try {
			await dispatch(
				processAffiliatePayment({
					transactionIds,
					retailerId: retailer?._id,
				})
			);
			toast.success("Payments processed successfully");
			dispatch(fetchRetailerDetails());
			return true;
		} catch (error) {
			toast.error("Failed to process payments");
			console.error("Failed to process payments:", error);
			setLoading(false);
			return false;
		}
	};

	const copyToClipboard = async (text: string): Promise<void> => {
		try {
			await navigator.clipboard.writeText(text);
			toast.success("Link copied to clipboard!");
		} catch (error) {
			toast.error("Failed to copy link");
			console.error("Failed to copy link:", error);
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				Loading...
			</div>
		);
	}

	if (!authRetailer) {
		return (
			<div className="flex items-center justify-center h-screen">
				Retailer not found
			</div>
		);
	}

	return (
		<div className="py-16 max-w-7xl mx-auto">
			{/* Affiliate Link Section */}
			<div className="bg-white rounded-lg shadow p-6 mb-8">
				<h2 className="text-2xl font-bold mb-4">Your Affiliate Link</h2>
				<div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
					<input
						type="text"
						value={affiliateLink}
						readOnly
						className="flex-1 bg-transparent border-none focus:outline-none"
					/>
					<button
						onClick={() => copyToClipboard(affiliateLink)}
						className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
					>
						<FaCopy /> Copy
					</button>
				</div>
			</div>

			{/* Stats Overview */}
			{stats && (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-white p-6 rounded-lg shadow">
						<h3 className="text-lg font-semibold text-gray-600 mb-2">
							Total Earnings
						</h3>
						<p className="text-3xl font-bold">
							₹{stats.total.totalCommission.toFixed(2)}
						</p>
						<p className="text-sm text-gray-500 mt-1">
							From {stats.total.totalTransactions} transactions
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow">
						<h3 className="text-lg font-semibold text-gray-600 mb-2">
							Pending Earnings
						</h3>
						<p className="text-3xl font-bold">
							₹{stats.pending.pendingCommission.toFixed(2)}
						</p>
						<p className="text-sm text-gray-500 mt-1">
							From {stats.pending.pendingTransactions}{" "}
							transactions
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow">
						<h3 className="text-lg font-semibold text-gray-600 mb-2">
							Processed Earnings
						</h3>
						<p className="text-3xl font-bold">
							₹{stats.processed.processedCommission.toFixed(2)}
						</p>
						<p className="text-sm text-gray-500 mt-1">
							From {stats.processed.processedTransactions}{" "}
							transactions
						</p>
					</div>
				</div>
			)}

			{/* Transactions List */}
			<TransactionList
				transactions={sales}
				onProcessPayment={handleProcessPayment}
			/>
		</div>
	);
}

export default AffiliatePage;
