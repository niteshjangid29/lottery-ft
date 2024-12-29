"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
	fetchRetailerDetails,
	getTransactionStats,
	processAffiliatePayment,
	setLoading,
} from "../../redux/slices/retailerSlice";
import toast from "react-hot-toast";
// import SalesTable from "../SalesTable";
import TransactionList from "./TransactionList";

const RetailerDashboard: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { profile, stats, sales, transactionStats } = useSelector(
		(state: RootState) => state.retailer
	) as any;

	console.log("profile", profile);
	console.log("stats", stats);
	console.log("sales", sales);
	console.log("transactionStats", transactionStats);

	useEffect(() => {
		dispatch(fetchRetailerDetails());

		dispatch(
			getTransactionStats({
				retailerId: profile?._id,
			})
		)
			.unwrap()
			.then((data) => {
				console.log("Stats fetched successfully:", data);
			})
			.catch((error) => {
				console.error("Failed to fetch stats:", error);
			});
	}, [dispatch, profile?._id]);

	const handleProcessPayment = async (transactionIds: string[]) => {
		try {
			await dispatch(
				processAffiliatePayment({
					transactionIds,
					retailerId: profile?._id,
				})
			);
			toast.success("Payments processed successfully");
			dispatch(fetchRetailerDetails());
		} catch (error) {
			toast.error("Failed to process payments");
			console.error("Failed to process payments:", error);
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

	if (!profile) {
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
					{profile.brandName} Dashboard
				</h1>
				<p className="text-gray-600">Welcome back, {profile.name}!</p>
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
						value={`${window.location.origin}/store/?affiliate_id=${profile.uniqueId}`}
						className="flex-1 p-2 border rounded"
					/>
					<button
						onClick={() => {
							navigator.clipboard.writeText(
								`${window.location.origin}/store/?affiliate_id=${profile.uniqueId}`
							);
							toast.success("Link copied to clipboard!");
						}}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Copy
					</button>
				</div>
			</div>

			<h2 className="text-xl font-bold mb-4">Recent Sales</h2>
			{/* <SalesTable sales={sales} /> */}
			<TransactionList
				transactions={sales}
				onProcessPayment={handleProcessPayment}
			/>
		</>
	);
};

export default RetailerDashboard;
