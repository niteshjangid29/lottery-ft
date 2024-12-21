"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

interface LotteryItem {
	id: number;
	name: string;
	drawDate: string;
	drawTime: string;
	prizeAmount: string;
	ticketPrice: number;
	category: string;
	digitLength: number;
}

const DUMMY_LOTTERIES: LotteryItem[] = [
	{
		id: 1,
		name: "Lotto G 100",
		drawDate: "2024-03-25",
		drawTime: "1:00 PM",
		prizeAmount: "₹1,000,000",
		ticketPrice: 100,
		category: "Daily",
		digitLength: 4,
	},
	{
		id: 2,
		name: "Lotto G 200",
		drawDate: "2024-03-30",
		drawTime: "4:30 PM",
		prizeAmount: "₹5,000,000",
		ticketPrice: 200,
		category: "Weekly",
		digitLength: 4,
	},
	{
		id: 3,
		name: "Lotto G 300",
		drawDate: "2024-03-30",
		drawTime: "8:00 PM",
		prizeAmount: "₹5,000,000",
		ticketPrice: 300,
		category: "Monthly",
		digitLength: 5,
	},
	{
		id: 4,
		name: "Lotto G 100",
		drawDate: "2024-03-30",
		drawTime: "1:00 PM",
		prizeAmount: "₹1,000,000",
		ticketPrice: 100,
		category: "Daily",
		digitLength: 4,
	},
	{
		id: 5,
		name: "Lotto G 500",
		drawDate: "2024-03-30",
		drawTime: "10:00 AM",
		prizeAmount: "₹10,000,000",
		ticketPrice: 500,
		category: "Special",
		digitLength: 5,
	},
	{
		id: 6,
		name: "Lotto G 500",
		drawDate: "2024-03-30",
		drawTime: "10:00 AM",
		prizeAmount: "₹10,000,000",
		ticketPrice: 500,
		category: "Special",
		digitLength: 5,
	},
	{
		id: 7,
		name: "Lotto G 200",
		drawDate: "2024-03-30",
		drawTime: "4:30 PM",
		prizeAmount: "₹5,000,000",
		ticketPrice: 200,
		category: "weekly",
		digitLength: 4,
	},
];

export default function LotteriesPage() {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
	const [searchQuery, setSearchQuery] = useState("");

	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = 6;

	// Filter Logic
	const filteredLotteries = DUMMY_LOTTERIES.filter((lottery) => {
		const categoryMatch =
			selectedCategory === "All" || lottery.category === selectedCategory;
		const priceMatch =
			lottery.ticketPrice >= priceRange[0] &&
			lottery.ticketPrice <= priceRange[1];
		const searchMatch = lottery.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		return categoryMatch && priceMatch && searchMatch;
	});

	// Pagination Logic
	const totalPages = Math.ceil(filteredLotteries.length / itemsPerPage);
	const paginatedLotteries = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredLotteries.slice(startIndex, startIndex + itemsPerPage);
	}, [filteredLotteries, currentPage]);

	return (
		<div className="min-h-screen pt-16 bg-gray-100 pb-16 md:pb-0">
			<div className="max-w-7xl mx-auto h-full p-4">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-gray-800">
						Available Lotteries
					</h1>
					<p className="text-gray-600 mt-2">
						Choose from our wide selection of lotteries
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-6 flex-1">
					{/* Filters Sidebar */}
					<div className="sm:w-1/4 bg-white p-4 rounded-lg shadow-md h-fit">
						<div className="mb-6">
							<h3 className="font-semibold mb-3 flex items-center gap-2">
								<FaFilter className="text-gray-600" />
								Filters
							</h3>

							<div className="mb-4">
								<label className="block sm:text-sm text-xs font-medium text-gray-700 mb-2">
									Category
								</label>
								<select
									className="w-full p-2 border rounded"
									value={selectedCategory}
									onChange={(e) =>
										setSelectedCategory(e.target.value)
									}
								>
									<option value="All">All Categories</option>
									<option value="Daily">Daily</option>
									<option value="Weekly">Weekly</option>
									<option value="Monthly">Monthly</option>
									<option value="Special">Special</option>
								</select>
							</div>

							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Price Range
								</label>
								<div className="flex items-center gap-2">
									<input
										type="range"
										min="0"
										max="1000"
										value={priceRange[0]}
										onChange={(e) =>
											setPriceRange([
												parseInt(e.target.value),
												priceRange[1],
											])
										}
										className="w-full"
									/>
								</div>
								<div className="text-sm text-gray-600 mt-1">
									₹{priceRange[0]} - ₹{priceRange[1]}
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-4 flex-1">
						{/* Search Input */}
						<div className="mb-4 sm:w-1/2">
							<div className="relative">
								<input
									type="text"
									placeholder="Search lotteries..."
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									className="w-full p-2 pl-8 border rounded"
								/>
								<FaSearch className="absolute left-2 top-3 text-gray-400" />
							</div>
						</div>

						{/* Lotteries Grid */}
						<div className="flex flex-col gap-2 justify-between">
							<>
								{paginatedLotteries.length === 0 ? (
									<div className="text-center text-gray-600 text-sm">
										No lotteries found
									</div>
								) : (
									<div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
										{paginatedLotteries.map((lottery) => (
											<div
												key={lottery.id}
												className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
											>
												<div className="flex flex-col p-4 gap-y-2">
													<h3 className="text-xl font-semibold">
														{lottery.name}
													</h3>
													<div className="flex flex-col gap-y-2">
														<p className="text-gray-600">
															Draw Date:{" "}
															{new Date(
																lottery.drawDate
															).toLocaleDateString()}
														</p>
														<p className="text-gray-600">
															Draw Time:{" "}
															{lottery.drawTime}
														</p>
														<p className="text-green-600 font-semibold">
															Prize:{" "}
															{
																lottery.prizeAmount
															}
														</p>
														<p className="text-gray-600">
															Ticket Price: ₹
															{
																lottery.ticketPrice
															}
														</p>
													</div>
													<Link
														href={{
															pathname: `/lotteries/purchaseTickets/${lottery.id}`,
															query: {
																id: lottery.id,
																name: lottery.name,
																drawDate:
																	lottery.drawDate,
																drawTime:
																	lottery.drawTime,
																prizeAmount:
																	lottery.prizeAmount,
																ticketPrice:
																	lottery.ticketPrice,
																category:
																	lottery.category,
																digitLength:
																	lottery.digitLength,
															},
														}}
														className="w-max bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
													>
														Buy Ticket
													</Link>
												</div>
											</div>
										))}
									</div>
								)}
							</>

							{/* Pagination */}
							<div className="mt-8 flex justify-center">
								<nav className="flex items-center gap-2">
									<button
										className="px-3 py-1 border rounded"
										onClick={() =>
											setCurrentPage((prev) =>
												Math.max(prev - 1, 1)
											)
										}
										disabled={currentPage === 1}
									>
										Previous
									</button>
									{Array.from(
										{ length: totalPages },
										(_, i) => (
											<button
												key={i + 1}
												className={`px-3 py-1 rounded ${
													currentPage === i + 1
														? "bg-blue-500 text-white"
														: "border"
												}`}
												onClick={() =>
													setCurrentPage(i + 1)
												}
											>
												{i + 1}
											</button>
										)
									)}
									<button
										className="px-3 py-1 border rounded"
										onClick={() =>
											setCurrentPage((prev) =>
												Math.min(prev + 1, totalPages)
											)
										}
										disabled={currentPage === totalPages}
									>
										Next
									</button>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
