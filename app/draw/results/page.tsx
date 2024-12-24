"use client";

import TicketDetailModal from "@/components/TicketDetailModal";
import { useState } from "react";
import { FaHistory, FaSearch, FaTicketAlt } from "react-icons/fa";

export interface Ticket {
	id: string;
	lotteryName: string;
	number: string;
	drawDate: string;
	resultStatus: "pending" | "won" | "lost";
	prizeAmount?: number;
	purchasedDate: string;
}

interface DrawResult {
	id: string;
	lotteryName: string;
	drawDate: string;
	winningNumbers: string;
	prizeTiers: {
		tier: string;
		amount: number;
		winners: number;
	}[];
}

const Tickets: Ticket[] = [
	{
		id: "1",
		lotteryName: "Daily Jackpot",
		number: "1234",
		drawDate: "12-1-2025",
		resultStatus: "pending",
		prizeAmount: 1000,
		purchasedDate: "12-12-2024",
	},
	{
		id: "2",
		lotteryName: "Weekly Special",
		number: "34832",
		drawDate: "12-12-2024",
		resultStatus: "lost",
		prizeAmount: 500,
		purchasedDate: "10-12-2024",
	},
	{
		id: "3",
		lotteryName: "Weekly Special",
		number: "76423",
		drawDate: "21-12-2024",
		resultStatus: "won",
		prizeAmount: 200,
		purchasedDate: "10-12-2024",
	},
	{
		id: "4",
		lotteryName: "Daily Jackpot",
		number: "9012",
		drawDate: "12-12-2024",
		resultStatus: "lost",
		prizeAmount: 1000,
		purchasedDate: "9-12-2024",
	},
];

export default function ResultsPage() {
	const [activeTab, setActiveTab] = useState<"tickets" | "history">(
		"tickets"
	);
	const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

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
									/>
								</div>
								<select className="border rounded-lg px-4 py-2">
									<option value="all">All Status</option>
									<option value="pending">Pending</option>
									<option value="won">Won</option>
									<option value="lost">Lost</option>
								</select>
							</div>
							{/* Tickets List */}
							<div className="bg-white rounded-lg shadow">
								{Tickets.map((ticket) => (
									<div
										key={ticket.id}
										onClick={() =>
											setSelectedTicket(ticket)
										}
										className="p-4 border-b cursor-pointer hover:bg-gray-50"
									>
										<div className="flex justify-between items-center">
											<div>
												<h3 className="font-semibold">
													{ticket.lotteryName}
												</h3>
												<p className="text-sm text-gray-500">
													Draw Date: {ticket.drawDate}
												</p>
												<p className="mt-2 text-lg font-mono flex gap-2">
													#{ticket.number}
												</p>
											</div>
											<div className="text-right flex items-center justify-center">
												<span
													className={`px-3 py-1 rounded-full  ${
														ticket.resultStatus ===
														"pending"
															? "bg-yellow-100 text-yellow-800"
															: ticket.resultStatus ===
															  "won"
															? "bg-green-100 text-green-800"
															: "bg-red-100 text-red-800"
													}`}
												>
													{ticket.resultStatus}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					) : (
						<div className="space-y-4">
							{/* Date Range Filter */}
							<div className="flex gap-4 mb-6">
								<input
									type="date"
									className="border rounded-lg px-4 py-2"
								/>
								<select className="border rounded-lg px-4 py-2">
									<option value="all">All Lotteries</option>
									<option value="daily">Daily Jackpot</option>
									<option value="weekly">
										Weekly Special
									</option>
								</select>
							</div>

							{/* Results List */}
							<div className="bg-white rounded-lg shadow">
								{/* Map through draw results */}
								<div className="p-4 border-b">
									<div className="space-y-2">
										<div className="flex justify-between">
											<h3 className="font-semibold">
												Daily Jackpot
											</h3>
											<p className="text-gray-500">
												{"24-12-2024"}
											</p>
										</div>
										<div className="flex gap-2">
											{[1, 2, 3, 4, 5].map((num) => (
												<span
													key={num}
													className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold"
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
												<div className="flex justify-between text-sm">
													<span>Match 5</span>
													<span>
														₹1,000,000 (2 winners)
													</span>
												</div>
												<div className="flex justify-between text-sm">
													<span>Match 4</span>
													<span>
														₹10,000 (15 winners)
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
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
