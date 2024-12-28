"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
	fetchRetailerDetails,
	getTransactionStats,
	processAffiliatePayment,
} from "../../redux/slices/retailerSlice";
import toast from "react-hot-toast";
import { format, parse } from "date-fns";
import SalesTable from "../SalesTable";
import StatCard from "../StatCard";
import TransactionList from "@/components/retailer/TransactionList";

const RetailerDashboard: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const {
		profile: retailer,
		transactionStats,
		stats,
		sales,
	} = useSelector((state: RootState) => state.retailer) as any;
	const [loading, setLoading] = useState(false);

	// console.log("profile", profile);
	console.log("transactionStats", transactionStats);
	console.log("sales", sales);
	console.log("stats", stats);

	// Get dates for last month
	const endDate = new Date();
	const startDate = new Date();
	startDate.setMonth(startDate.getMonth() - 1);

	useEffect(() => {
		dispatch(fetchRetailerDetails());

		dispatch(
			getTransactionStats({
				retailerId: retailer?._id,
			})
		)
			.unwrap()
			.then((data) => {
				console.log("Stats fetched successfully:", data);
			})
			.catch((error) => {
				console.error("Failed to fetch stats:", error);
			});
	}, [dispatch]);

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
		} catch (error) {
			toast.error("Failed to process payments");
			setLoading(false);
		}
	};

	// if (loading) {
	// 	return (
	// 		<div className="flex items-center justify-center h-screen">
	// 			Loading...
	// 		</div>
	// 	);
	// }

	if (!retailer) {
		return (
			<div className="flex items-center justify-center h-screen">
				Please log in to view your dashboard
			</div>
		);
	}

	return (
		<>
			<div className="mb-8">
				<h1 className="text-3xl font-bold">
					{retailer.brandName} Dashboard
				</h1>
				<p className="text-gray-600">Welcome back, {retailer.name}!</p>
			</div>

			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
				<div className="bg-white p-4 rounded-lg shadow">
					<h3 className="text-gray-500">Total Sales</h3>
					<p className="text-2xl font-bold">
						₹{transactionStats.totalSales.toFixed(2)}
					</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<h3 className="text-gray-500">Total Commission</h3>
					<p className="text-2xl font-bold">
						₹{transactionStats.totalCommission.toFixed(2)}
					</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<h3 className="text-gray-500">Pending Commission</h3>
					<p className="text-2xl font-bold">
						₹{transactionStats.pendingCommission.toFixed(2)}
					</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<h3 className="text-gray-500">Total Customers</h3>
					<p className="text-2xl font-bold">
						{transactionStats.customerCount}
					</p>
				</div>
			</div>

			{/* Affiliate Link */}
			<div className="bg-white p-4 rounded-lg shadow mb-8">
				<h2 className="text-xl font-bold mb-2">Your Affiliate Link</h2>
				<div className="flex items-center gap-2">
					<input
						type="text"
						readOnly
						value={`${window.location.origin}/store/?affiliate_id=${retailer.uniqueId}`}
						className="flex-1 p-2 border rounded"
					/>
					<button
						onClick={() => {
							navigator.clipboard.writeText(
								`${window.location.origin}/store/?affiliate_id=${retailer.uniqueId}`
							);
							toast.success("Link copied to clipboard!");
						}}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Copy
					</button>
				</div>
			</div>

			<h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
			{/* <SalesTable sales={sales} /> */}
			<TransactionList
				transactions={sales}
				onProcessPayment={handleProcessPayment}
			/>
		</>
	);
};

export default RetailerDashboard;
