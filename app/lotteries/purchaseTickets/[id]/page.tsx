"use client";

import NumberPicker from "@/components/NumberPicker";
import { deductFunds } from "@/redux/slices/walletSlice";
import { SOLD_TICKETS_DATA } from "@/utils/data/SoldTicketsData";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaDice, FaMinus, FaPencilAlt, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

/* eslint-disable  @typescript-eslint/no-explicit-any */

interface TicketOption {
	id: string;
	type: "random" | "custom";
	numbers: string;
	price: number;
}

export default function PurchaseTicketsPage() {
	const [activeTab, setActiveTab] = useState<"random" | "custom">("random");
	const [quantity, setQuantity] = useState(1);
	const [customNumber, setCustomNumber] = useState<string>("");
	const [selectedTickets, setSelectedTickets] = useState<TicketOption[]>([]);
	const { balance } = useSelector((state: any) => state.wallet);
	const router = useRouter();
	const dispatch = useDispatch();

	const searchParams = useSearchParams();

	// Mock lottery details (replace with actual data)
	const lotteryDetails = {
		name: searchParams.get("name") || "Lottery Name",
		ticketPrice: parseInt(searchParams.get("ticketPrice") || "0"),
		digitLength: parseInt(searchParams.get("digitLength") || "4"),
		drawDate: searchParams.get("drawDate") || "YYYY-MM-DD",
	};

	const [numbers, setNumbers] = useState<string[]>(
		Array(lotteryDetails.digitLength).fill("")
	);

	const [suggestions, setSuggestions] = useState<string[]>([]);

	const handleNumberChange = (index: number, value: string) => {
		const newNumbers = [...numbers];
		newNumbers[index] = value;
		setNumbers(newNumbers);
		setCustomNumber(newNumbers.join(""));
	};

	const generateRandomTicket = () => {
		let randomNum = Math.random()
			.toString()
			.slice(2, 2 + lotteryDetails.digitLength);

		while (randomNum[0] === "0") {
			randomNum = Math.random()
				.toString()
				.slice(2, 2 + lotteryDetails.digitLength);
		}

		if (
			SOLD_TICKETS_DATA.some((data) =>
				data.purchasedTickets.includes(parseInt(randomNum))
			) ||
			selectedTickets.some((ticket) => ticket.numbers === randomNum)
		) {
			toast.error("Ticket not available");
			return "";
		}
		return randomNum;
	};

	const handleQuantityChange = (increment: boolean) => {
		setQuantity((prev) => (increment ? prev + 1 : Math.max(1, prev - 1)));
	};

	const getSuggestedTickets = (requestedNumber: string): string[] => {
		// Get all unavailable numbers
		const unavailableNumbers = [
			...selectedTickets.map((ticket) => ticket.numbers),
			...SOLD_TICKETS_DATA.filter(
				(data) => data.lotteryName === lotteryDetails.name
			).flatMap((data) =>
				data.purchasedTickets.map((num) => num.toString())
			),
		];

		const suggestions: string[] = [];
		const requestedNum = parseInt(requestedNumber);
		const digitLength = lotteryDetails.digitLength;

		// Generate variations
		const variations = [
			// Increment
			...Array(5)
				.fill(0)
				.map((_, i) =>
					(requestedNum + i + 1).toString().padStart(digitLength, "1")
				),
			// Decrement
			...Array(5)
				.fill(0)
				.map((_, i) =>
					(requestedNum - i - 1).toString().padStart(digitLength, "1")
				),
			// Pattern match (keep first/last digits)
			requestedNumber[0] +
				Math.random()
					.toString()
					.slice(2, digitLength + 1),
			Math.random().toString().slice(2, digitLength) +
				requestedNumber[digitLength - 1],
		];

		// Filter valid suggestions
		for (const num of variations) {
			if (
				num.length === digitLength &&
				num[0] !== "0" && // No leading zeros
				!unavailableNumbers.includes(num) &&
				!suggestions.includes(num)
			) {
				suggestions.push(num);
				if (suggestions.length >= 5) break;
			}
		}

		return suggestions;
	};

	const addRandomTickets = () => {
		const newTickets = [];

		for (let i = 0; i < quantity; i++) {
			const randomNumber = generateRandomTicket();

			if (randomNumber === "") {
				toast.error("Failed to generate valid ticket");
				continue;
			}

			newTickets.push({
				id: Math.random().toString(),
				type: "random" as const,
				numbers: randomNumber,
				price: lotteryDetails.ticketPrice,
			});
		}

		if (newTickets.length > 0) {
			setSelectedTickets([...selectedTickets, ...newTickets]);
			toast.success(`Added ${newTickets.length} tickets`);
		}

		setQuantity(1);
	};

	// do not add tickets if they are already selected or purchased
	const addCustomTicket = () => {
		if (customNumber.length === lotteryDetails.digitLength) {
			if (
				selectedTickets.some(
					(ticket) => ticket.numbers === customNumber
				)
			) {
				toast.error("Ticket already selected");
				setSuggestions(getSuggestedTickets(customNumber));
				return;
			}

			if (
				SOLD_TICKETS_DATA.some(
					(data) =>
						data.lotteryName === lotteryDetails.name &&
						data.purchasedTickets.includes(parseInt(customNumber))
				)
			) {
				toast.error("Ticket not available");
				setSuggestions(getSuggestedTickets(customNumber));
				return;
			}

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
			setSuggestions([]);
			toast.success("Added 1 ticket");
		}
	};

	const totalPrice = selectedTickets.reduce(
		(sum, ticket) => sum + ticket.price,
		0
	);

	const handleCheckout = () => {
		if (balance < totalPrice) {
			toast.error("Insufficient balance");
			router.push("/wallet");
		}

		dispatch(deductFunds(totalPrice));
	};

	const deleteTicket = (ticket: TicketOption) => {
		setSelectedTickets(selectedTickets.filter((t) => t.id !== ticket.id));
	};

	return (
		<div className="min-h-screen py-16 bg-gray-100 md:pb-0">
			<div className="max-w-7xl mx-auto h-full p-4">
				{/* Lottery Details Header */}
				<div className="bg-white rounded-lg shadow-md p-6 mb-6">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						{lotteryDetails.name}
					</h1>
					<div className="flex gap-2 justify-between">
						<p className="text-gray-600 text-xs">
							Ticket Price:{" "}
							<span className="font-bold">
								₹ {lotteryDetails.ticketPrice}
							</span>
						</p>
						<p className="text-gray-600 text-xs">
							Draw Date:{" "}
							<span className="font-bold">
								{lotteryDetails.drawDate}
							</span>
						</p>
					</div>
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
								<div className="flex items-center justify-center space-x-4">
									{Array.from(
										{ length: lotteryDetails.digitLength },
										(_, i) => (
											<NumberPicker
												key={i}
												index={i}
												value={numbers[i]}
												onChange={handleNumberChange}
												totalDigits={
													lotteryDetails.digitLength
												}
											/>
										)
									)}
								</div>

								{suggestions.length > 0 && (
									<div>
										<p className="text-gray-600">
											Ticket not available. Try these
											numbers:
										</p>
										<div className="flex flex-row flex-wrap mt-2 gap-2">
											{suggestions.map((num) => (
												<button
													key={num}
													className="block text-center px-2 py-1 hover:bg-blue-200 bg-gray-100 rounded"
													onClick={() =>
														setCustomNumber(num)
													}
												>
													{num}
												</button>
											))}
										</div>
									</div>
								)}

								<button
									className="w-full bg-blue-500 text-white py-3 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
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
									<span>₹{totalPrice}</span>
								</div>
								<button
									className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg"
									onClick={handleCheckout}
								>
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
