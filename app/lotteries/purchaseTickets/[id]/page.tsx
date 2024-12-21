"use client";

import { useSearchParams } from "next/navigation";
import { useState, use } from "react";
import { FaDice, FaMinus, FaPencilAlt, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface TicketOption {
	id: string;
	type: "random" | "custom";
	numbers: string;
	price: number;
}

export default function PurchaseTicketsPage() {
	const [activeTab, setActiveTab] = useState<"random" | "custom">("random");
	const [quantity, setQuantity] = useState(1);
	const [customNumber, setCustomNumber] = useState("");
	const [selectedTickets, setSelectedTickets] = useState<TicketOption[]>([]);

	const searchParams = useSearchParams();

	// Mock lottery details (replace with actual data)
	const lotteryDetails = {
		name: searchParams.get("name") || "Lottery Name",
		ticketPrice: parseInt(searchParams.get("ticketPrice") || "0"),
		digitLength: parseInt(searchParams.get("digitLength") || "4"),
	};

	const generateRandomTicket = () => {
		const randomNum = Math.random()
			.toString()
			.slice(2, 2 + lotteryDetails.digitLength);
		return randomNum;
	};

	const handleQuantityChange = (increment: boolean) => {
		setQuantity((prev) => (increment ? prev + 1 : Math.max(1, prev - 1)));
	};

	const addRandomTickets = () => {
		const newTickets = Array(quantity)
			.fill(null)
			.map(() => ({
				id: Math.random().toString(),
				type: "random" as const,
				numbers: generateRandomTicket(),
				price: lotteryDetails.ticketPrice,
			}));
		setSelectedTickets([...selectedTickets, ...newTickets]);
		setQuantity(1);
	};

	const addCustomTicket = () => {
		if (customNumber.length === lotteryDetails.digitLength) {
			setSelectedTickets([
				...selectedTickets,
				{
					id: Math.random().toString(),
					type: "custom",
					numbers: customNumber,
					price: lotteryDetails.ticketPrice,
				},
			]);
			setCustomNumber("");
		}
	};

	const deleteTicket = (ticket: TicketOption) => {
		setSelectedTickets(selectedTickets.filter((t) => t.id !== ticket.id));
	};

	return (
		<div className="min-h-screen pt-16 bg-gray-100">
			<div className="max-w-7xl mx-auto h-full p-4">
				{/* Lottery Details Header */}
				<div className="bg-white rounded-lg shadow-md p-6 mb-6">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						{lotteryDetails.name}
					</h1>
					<p className="text-gray-600">
						Ticket Price:{" "}
						<span className="font-bold">
							₹ {lotteryDetails.ticketPrice}
						</span>
					</p>
				</div>

				{/* Tab Selection */}
				<div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
					<div className="flex border-b">
						<button
							className={`flex-1 p-4 ${
								activeTab === "random"
									? "bg-blue-500 text-white"
									: "text-gray-600"
							}`}
							onClick={() => setActiveTab("random")}
						>
							<FaDice className="inline mr-2" /> Random Tickets
						</button>
						<button
							className={`flex-1 p-4 ${
								activeTab === "custom"
									? "bg-blue-500 text-white"
									: "text-gray-600"
							}`}
							onClick={() => setActiveTab("custom")}
						>
							<FaPencilAlt className="inline mr-2" /> Choose your
							own number
						</button>
					</div>

					<div className="p-6">
						{activeTab === "random" ? (
							<div className="space-y-4">
								<div className="flex items-center justify-center space-x-4">
									<button
										className="p-2 rounded-full bg-gray-200"
										onClick={() =>
											handleQuantityChange(false)
										}
									>
										<FaMinus />
									</button>
									<span className="text-2xl font-bold">
										{quantity}
									</span>
									<button
										className="p-2 rounded-full bg-gray-200"
										onClick={() =>
											handleQuantityChange(true)
										}
									>
										<FaPlus />
									</button>
								</div>
								<button
									className="w-full bg-blue-500 text-white py-3 rounded-lg"
									onClick={addRandomTickets}
								>
									Generate Random Tickets
								</button>
							</div>
						) : (
							<div className="space-y-4">
								<input
									type="number"
									value={customNumber}
									onChange={(e) =>
										setCustomNumber(e.target.value)
									}
									placeholder={`Enter ${lotteryDetails.digitLength} digits`}
									maxLength={lotteryDetails.digitLength}
									className="w-full p-3 border rounded-lg"
								/>
								<button
									className="w-full bg-blue-500 text-white py-3 rounded-lg"
									onClick={addCustomTicket}
									disabled={
										customNumber.length !==
										lotteryDetails.digitLength
									}
								>
									Add Custom Ticket
								</button>
							</div>
						)}
					</div>
				</div>

				{/* Selected Tickets */}
				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-2xl font-bold mb-4">
						Selected Tickets
					</h2>
					{selectedTickets.length === 0 ? (
						<p className="text-gray-600">No tickets selected yet</p>
					) : (
						<div className="space-y-4">
							{selectedTickets.map((ticket) => (
								<div
									key={ticket.id}
									className="flex justify-between items-center p-3 bg-gray-50 rounded"
								>
									<span>{ticket.numbers}</span>
									<span>₹{ticket.price}</span>
									<button
										className="p-1 rounded-full"
										onClick={() => deleteTicket(ticket)}
									>
										<MdDelete className="text-red-500 size-6" />
									</button>
								</div>
							))}
							<div className="border-t pt-4">
								<div className="flex justify-between font-bold">
									<span>Total:</span>
									<span>
										₹
										{selectedTickets.reduce(
											(sum, ticket) => sum + ticket.price,
											0
										)}
									</span>
								</div>
								<button className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg">
									Proceed to Checkout
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
