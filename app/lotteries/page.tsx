"use client";

import LotteryCard from "@/components/TicketCard";
import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAllLotteries } from "@/redux/slices/lotterySlice";
import { useSearchParams } from "next/navigation";

export default function LotteriesPage(): React.ReactElement {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
	const [searchQuery, setSearchQuery] = useState("");
	const dispatch = useDispatch<AppDispatch>();

	const { lotteries } = useSelector(
		(state: RootState) => state.lottery
	) as any;

	const [currentPage, setCurrentPage] = useState(1);

	const query = useSearchParams();
	const affiliate_id = query.get("affiliate_id");

	const itemsPerPage = 6;

	useEffect(() => {
		dispatch(fetchAllLotteries())
			.unwrap()
			.then((data) => {
				console.log("Lotteries fetched successfully:", data);
			})
			.catch((error) => {
				console.error("Failed to fetch lotteries:", error);
			});
	}, [dispatch]);

	// Filter Logic
	const filteredLotteries = lotteries.filter((lottery: any) => {
		const categoryMatch =
			selectedCategory === "all" ||
			lottery.category.toLowerCase() === selectedCategory;
		const priceMatch =
			lottery.ticket_price >= priceRange[0] &&
			lottery.ticket_price <= priceRange[1];
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
									<option value="all">All Categories</option>
									<option value="daily">Daily</option>
									<option value="weekly">Weekly</option>
									<option value="monthly">Monthly</option>
									<option value="special">Special</option>
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
									<div className="grid grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
										{paginatedLotteries?.map(
											(lottery: any) => (
												<LotteryCard
													lotteryData={lottery}
													affiliate_id={affiliate_id}
													key={lottery._id}
												/>
											)
										)}
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
