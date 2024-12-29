"use client";

import TicketDetailModal from "@/components/TicketDetailModal";
import { DRAW_RESULTS_DATA } from "@/utils/data/DrawResultsData";
import { Ticket } from "@/utils/data/TicketsData";
import { useEffect, useState } from "react";
import { FaHistory, FaSearch, FaTicketAlt } from "react-icons/fa";
import { format, parse } from "date-fns";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getUserTickets } from "@/redux/slices/userSlice";

export default function ResultsPage() {
	const [activeTab, setActiveTab] = useState<"tickets" | "history">(
		"tickets"
	);
	const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
	// const [selectedDrawResult, setSelectedDrawResult] =
	// 	useState<DrawResult | null>(null);

	const dispatch = useDispatch<AppDispatch>();
	const { userTickets } = useSelector((state: RootState) => state.user);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const { profile: retailer, authRetailer } = useSelector(
		(state: RootState) => state.retailer
	);

	const router = useRouter();

	useEffect(() => {
		dispatch(getUserTickets());
	}, [dispatch]);

	console.log("userTickets", userTickets);

	// Filter States
	const [searchQuery, setSearchQuery] = useState("");
	const [ticketFilter, setTicketFilter] = useState("all");
	const [drawResultFilter, setDrawResultFilter] = useState("all");
	const [dateFilter, setDateFilter] = useState("");

	// Filter logic
	const filteredTickets = userTickets?.filter((ticket) => {
		const filterMatch =
			ticketFilter === "all" || ticket.status === ticketFilter;
		const searchMatch =
			ticket.ticket_number.toString().includes(searchQuery) ||
			ticket.lotteryName.includes(searchQuery);
		return filterMatch && searchMatch;
	});

	// there is a bug in the filter logic for draw results date filter
	const filteredDrawResults = DRAW_RESULTS_DATA.filter((result) => {
		// Parse the date string to Date object first
		const parsedDrawDate = parse(result.drawDate, "d-M-yyyy", new Date());
		const drawDate = format(parsedDrawDate, "dd-MM-yyyy");

		const filterDate = dateFilter
			? format(new Date(dateFilter), "dd-MM-yyyy")
			: "";

		const filterMatch =
			drawResultFilter === "all" ||
			result.lotteryName.toLowerCase() === drawResultFilter;
		const dateMatch = !dateFilter || drawDate === filterDate;
		return filterMatch && dateMatch;
	});

	// Calculate pagination for tickets
	const totalTicketPages = Math.ceil(filteredTickets?.length / itemsPerPage);
	const ticketStartIndex = (currentPage - 1) * itemsPerPage;
	const ticketEndIndex = ticketStartIndex + itemsPerPage;
	const currentTickets = filteredTickets?.slice(
		ticketStartIndex,
		ticketEndIndex
	);

	// Calculate pagination for draw results
	const totalDrawResultPages = Math.ceil(
		filteredDrawResults?.length / itemsPerPage
	);
	const drawResultStartIndex = (currentPage - 1) * itemsPerPage;
	const drawResultEndIndex = drawResultStartIndex + itemsPerPage;
	const currentDrawResults = filteredDrawResults?.slice(
		drawResultStartIndex,
		drawResultEndIndex
	);

	//   const resetFilters = () => {
	//     setSearchQuery("");
	//     setTicketFilter("all");
	//     setDrawResultFilter("all");
	//     setDateFilter("");
	//   };

	console.log("filteredTickets", filteredTickets);

	if (authRetailer) {
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

	return (
		<div className="min-h-screen py-16 bg-gray-100 md:pb-0">
			<div className="max-w-7xl mx-auto h-full p-4">
				<h1 className="text-4xl font-bold text-gray-800">Results</h1>
				<p className="text-gray-600 mt-2">
					Check your tickets and see the results
				</p>

				{/* Tab Navigation */}
				<div className="flex gap-4 mt-8 border-b">
					<button
						className={`px-6 py-3 font-medium ${
							activeTab === "tickets"
								? "text-blue-600 border-b-2 border-blue-600"
								: "text-gray-500"
						}`}
						onClick={() => setActiveTab("tickets")}
					>
						<FaTicketAlt className="inline mr-2" />
						Purchased Tickets
					</button>
					<button
						className={`px-6 py-3 font-medium ${
							activeTab === "history"
								? "text-blue-600 border-b-2 border-blue-600"
								: "text-gray-500"
						}`}
						onClick={() => setActiveTab("history")}
					>
						<FaHistory className="inline mr-2" />
						Draw History
					</button>
				</div>

				{/* Tab Content */}
				<div className="mt-6">
					{activeTab === "tickets" ? (
						<div className="space-y-4">
							{/* Search and Filter */}
							<div className="flex gap-4 mb-6">
								<div className="relative flex-1">
									<FaSearch className="absolute left-3 top-3 text-gray-400" />
									<input
										type="text"
										placeholder="Search tickets..."
										className="w-full pl-10 pr-4 py-2 border rounded-lg"
										value={searchQuery}
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
									/>
								</div>
								<select
									className="border rounded-lg px-4 py-2"
									value={ticketFilter}
									onChange={(e) =>
										setTicketFilter(e.target.value)
									}
								>
									<option value="all">All Status</option>
									<option value="active">Pending</option>
									<option value="winning">Won</option>
								</select>
							</div>
							{/* Tickets List */}
							<div className="space-y-4">
								{!filteredTickets ||
								filteredTickets.length === 0 ? (
									<div className="text-center text-gray-600 text-sm">
										No tickets found
									</div>
								) : (
									<div className="bg-white rounded-lg shadow">
										{currentTickets.map((ticket: any) => (
											<div
												key={ticket._id}
												onClick={() =>
													setSelectedTicket(ticket)
												}
												className="p-4 border-b cursor-pointer hover:bg-gray-50"
											>
												<div className="flex justify-between items-center">
													<div>
														<h3 className="font-semibold">
															{
																ticket
																	.lottery_id
																	.name
															}
														</h3>
														<p className="text-sm text-gray-500">
															Draw Date:{" "}
															{format(
																parse(
																	ticket
																		.lottery_id
																		.draw_date,
																	"d-M-yyyy",
																	new Date()
																),
																"dd-MM-yyyy"
															)}
														</p>
														<p className="mt-2 text-lg font-mono flex gap-2">
															#
															{
																ticket.ticket_number
															}
														</p>
													</div>
													<div className="text-right flex items-center justify-center">
														<span
															className={`px-3 py-1 rounded-full  ${
																ticket.status ===
																"active"
																	? "bg-yellow-100 text-yellow-800"
																	: ticket.status ===
																	  "winning"
																	? "bg-green-100 text-green-800"
																	: "bg-red-100 text-red-800"
															}`}
														>
															{ticket.status ===
															"winning"
																? "Won"
																: ticket.status}
														</span>
													</div>
												</div>
											</div>
										))}
									</div>
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
											{ length: totalTicketPages },
											(_, i) => i + 1
										).map((page) => (
											<button
												key={page}
												onClick={() =>
													setCurrentPage(page)
												}
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
												Math.min(
													prev + 1,
													totalTicketPages
												)
											)
										}
										disabled={
											currentPage === totalTicketPages
										}
										className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50"
									>
										Next
									</button>
								</div>
							</div>
						</div>
					) : (
						<div className="space-y-4">
							{/* Date Range Filter */}
							<div className="flex gap-4 mb-6">
								<input
									type="date"
									className="border rounded-lg px-4 py-2"
									value={dateFilter}
									onChange={(e) =>
										setDateFilter(e.target.value)
									}
								/>
								<select
									className="border rounded-lg px-4 py-2"
									value={drawResultFilter}
									onChange={(e) =>
										setDrawResultFilter(e.target.value)
									}
								>
									<option value="all">All Lotteries</option>
									<option value="dear 100">Dear 100</option>
									<option value="pb lottery">
										PB Lottery
									</option>
									<option value="rakhi special">
										Rakhi Special
									</option>
									<option value="dear special">
										Dear Special
									</option>
								</select>
							</div>

							{/* Results List */}
							<div className="bg-white rounded-lg shadow">
								{/* Map through draw results */}
								{currentDrawResults.map((result) => (
									<div
										className="p-4 border-b cursor-pointer hover:bg-gray-50"
										key={result.id}
										onClick={() => {
											// setSelectedDrawResult(result);
											router.push(
												`/draw/details?id=${result.id}&affiliate_id=${retailer?.uniqueId}`
											);
										}}
									>
										<div className="space-y-2">
											<div className="flex justify-between">
												<h3 className="font-semibold">
													{result.lotteryName}
												</h3>
												<p className="text-gray-500">
													{format(
														parse(
															result.drawDate,
															"d-M-yyyy",
															new Date()
														),
														"dd-MM-yyyy"
													)}
												</p>
											</div>
											<div className="flex gap-2">
												{result.winningNumbers
													.slice(0, 5)
													.map((num) => (
														<span
															key={num}
															className="w-max h-10 rounded-full px-2 py-1 bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm"
														>
															{num}
														</span>
													))}
											</div>
											<div className="mt-4">
												<h4 className="font-medium">
													Prize Tiers
												</h4>
												<div className="mt-2 space-y-2">
													{result.prizeTiers
														.slice(0, 2)
														.map((prize) => (
															<div
																className="flex justify-between text-sm"
																key={prize.tier}
															>
																<span>
																	{prize.tier}
																</span>
																<span>
																	₹
																	{
																		prize.amount
																	}{" "}
																	(
																	{
																		prize
																			.winners
																			.length
																	}{" "}
																	winners)
																</span>
															</div>
														))}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>

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
										{ length: totalDrawResultPages },
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
											Math.min(
												prev + 1,
												totalDrawResultPages
											)
										)
									}
									disabled={
										currentPage === totalDrawResultPages
									}
									className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50"
								>
									Next
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Modal */}
				{selectedTicket && (
					<TicketDetailModal
						ticket={selectedTicket}
						onClose={() => setSelectedTicket(null)}
					/>
				)}
			</div>
		</div>
	);
}
