"use client";

import SalesTable from "@/components/SalesTable";
import StatCard from "@/components/StatCard";
import { useState, useEffect, useMemo } from "react";

interface Sale {
	id: string;
	customerName: string;
	amount: number;
	commission: number;
	status: "PENDING" | "PROCESSED";
	createdAt: string;
}

const DUMMY_SALES: Sale[] = [
	{
		id: "1",
		customerName: "Prince Singh",
		amount: 1000,
		commission: 100,
		status: "PENDING",
		createdAt: "2024-12-10",
	},
	{
		id: "2",
		customerName: "Divya Kumar",
		amount: 500,
		commission: 50,
		status: "PENDING",
		createdAt: "2024-11-30",
	},
	{
		id: "3",
		customerName: "Nitesh",
		amount: 200,
		commission: 20,
		status: "PROCESSED",
		createdAt: "2024-12-17",
	},
];

export default function RetailerDashboard() {
	const [stats, setStats] = useState({
		totalSales: 1700,
		pendingCommission: 150,
		totalCommission: 170,
		customerCount: 3,
	});
	const [page, setPage] = useState(1);

	const itemsPerPage = 10;

	// Pagination Logic
	const totalPages = Math.ceil(DUMMY_SALES.length / itemsPerPage);
	const paginatedSales = useMemo(() => {
		const startIndex = (page - 1) * itemsPerPage;
		return DUMMY_SALES.slice(startIndex, startIndex + itemsPerPage);
	}, [DUMMY_SALES, page]);

	return (
		<div className="min-h-screen bg-gray-100 py-16 md:pb-0">
			<div className="max-w-7xl mx-auto p-4">
				<h1 className="text-2xl font-bold mb-6">Retailer Dashboard</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<StatCard
						title="Total Sales"
						value={`₹${stats.totalSales}`}
						trend={50}
					/>
					<StatCard
						title="Pending Commission"
						value={`₹${stats.pendingCommission}`}
					/>
					<StatCard
						title="Total Commission"
						value={`₹${stats.totalCommission}`}
						trend={20}
					/>
					<StatCard
						title="Total Customers"
						value={stats.customerCount}
						trend={-10}
					/>
				</div>

				<div className="mt-8">
					<h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
					<SalesTable sales={paginatedSales} />
				</div>

				{/* Pagination controls */}
				{totalPages > 1 && (
					<div className="mt-8 flex justify-center">
						<nav className="flex items-center gap-2">
							<button
								className="px-3 py-1 border rounded"
								onClick={() =>
									setPage((prev) => Math.max(prev - 1, 1))
								}
								disabled={page === 1}
							>
								Previous
							</button>
							{Array.from({ length: totalPages }, (_, i) => (
								<button
									key={i + 1}
									className={`px-3 py-1 rounded ${
										page === i + 1
											? "bg-blue-500 text-white"
											: "border"
									}`}
									onClick={() => setPage(i + 1)}
								>
									{i + 1}
								</button>
							))}
							<button
								className="px-3 py-1 border rounded"
								onClick={() =>
									setPage((prev) =>
										Math.min(prev + 1, totalPages)
									)
								}
								disabled={page === totalPages}
							>
								Next
							</button>
						</nav>
					</div>
				)}
			</div>
		</div>
	);
}
