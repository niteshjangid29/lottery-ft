"use client";

import NumberPicker from "@/components/NumberPicker";
import {
	fetchAllLotteries,
	fetchLotteryById,
	LotteryDetails,
} from "@/redux/slices/lotterySlice";
import { createAffiliateTransaction } from "@/redux/slices/retailerSlice";
import {
	addToCart,
	clearCart,
	fetchTicketsByLotteryId,
	purchaseTicket,
	recordTransaction,
	removeFromCart,
	setCartTickets,
} from "@/redux/slices/userSlice";
import { getWalletBalance, setBalance } from "@/redux/slices/walletSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { SOLD_TICKETS_DATA } from "@/utils/data/SoldTicketsData";
import { stat } from "fs";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaDice, FaMinus, FaPencilAlt, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

interface TicketOption {
	id: string;
	type: "random" | "custom";
	number: string;
	price: number;
}

export default function PurchaseTicketsPage() {
	const [activeTab, setActiveTab] = useState<"random" | "custom">("random");
	const [quantity, setQuantity] = useState(1);
	const [customNumber, setCustomNumber] = useState<string>("");
	const [selectedTickets, setSelectedTickets] = useState<TicketOption[]>([]);
	const { balance } = useSelector((state: RootState) => state.wallet);
	const [lotteryDetails, setLotteryDetails] = useState<any>({});
	const [soldTickets, setSoldTickets] = useState<any>([]);
	const { profile: retailer } = useSelector(
		(state: RootState) => state.retailer
	) as any;

	const [transactionId, setTransactionId] = useState("");

	const { cartTickets } = useSelector((state: RootState) => state.user);

	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();

	const { id } = useParams();
	const query = useSearchParams();
	const affiliate_id = query.get("affiliate_id");

	console.log("lotteryDetails", lotteryDetails);

	useEffect(() => {
		if (id) {
			dispatch(fetchLotteryById(id))
				.unwrap()
				.then((data) => {
					setLotteryDetails(data);
				})
				.catch((error) => {
					console.error("Failed to fetch lottery:", error);
				});
			dispatch(fetchTicketsByLotteryId(id))
				.unwrap()
				.then((data) => {
					setSoldTickets(data);
				})
				.catch((error) => {
					console.error("Failed to fetch tickets:", error);
				});
		}
		dispatch(getWalletBalance());
		setSelectedTickets(cartTickets);
	}, [dispatch, id]);

	const [numbers, setNumbers] = useState<string[]>(
		Array(lotteryDetails.digit_length).fill("")
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
			.slice(2, 2 + lotteryDetails.digit_length);

		while (randomNum[0] === "0") {
			randomNum = Math.random()
				.toString()
				.slice(2, 2 + lotteryDetails.digit_length);
		}

		if (
			soldTickets.some(
				(data: any) => data.ticket_number === parseInt(randomNum)
			) ||
			selectedTickets.some((ticket) => ticket.number === randomNum)
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
			...selectedTickets.map((ticket) => ticket.number),
			...soldTickets
				.filter((data: any) => data.lotteryName === lotteryDetails.name)
				.flatMap((data: any) =>
					data.purchasedTickets.map((num: any) => num.toString())
				),
		];

		const suggestions: string[] = [];
		const requestedNum = parseInt(requestedNumber);
		const digitLength = lotteryDetails.digit_length;

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
				number: randomNumber,
				price: lotteryDetails.ticket_price,
			});
			dispatch(
				addToCart({
					id: Math.random().toString(),
					type: "random" as const,
					number: randomNumber,
					price: lotteryDetails.ticket_price,
				})
			);
		}

		if (newTickets.length > 0) {
			setSelectedTickets([...selectedTickets, ...newTickets]);

			toast.success(`Added ${newTickets.length} tickets`);
		}

		setQuantity(1);
	};

	// do not add tickets if they are already selected or purchased
	const addCustomTicket = () => {
		if (customNumber.length === lotteryDetails.digit_length) {
			if (
				selectedTickets.some((ticket) => ticket.number === customNumber)
			) {
				toast.error("Ticket already selected");
				setSuggestions(getSuggestedTickets(customNumber));
				return;
			}

			if (
				soldTickets.some(
					(data: any) =>
						data.lotteryName === lotteryDetails.name &&
						data.ticket_number === parseInt(customNumber)
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
					number: customNumber,
					price: lotteryDetails.ticket_price,
				},
			]);
			setCustomNumber("");
			setSuggestions([]);
			dispatch(
				addToCart({
					id: Math.random().toString(),
					type: "custom",
					number: customNumber,
					price: lotteryDetails.ticket_price,
				})
			);
			toast.success("Added 1 ticket");
		}
	};

	const totalPrice = selectedTickets.reduce(
		(sum, ticket) => sum + ticket.price,
		0
	);

	console.log("balance", balance);
	console.log("totalPrice", totalPrice);
	console.log("selectedTickets", selectedTickets);
	console.log("cartTickets", cartTickets);
	console.log("retailer_id", retailer?._id);
	console.log("transactionId", transactionId);

	const ticketNumbers = selectedTickets.map((ticket) => ticket.number);
	console.log("ticketNumbers", ticketNumbers);

	const handleCheckout = async () => {
		if (balance < totalPrice) {
			toast.error("Insufficient balance");
			router.push("/credit");
		}

		// const ticketNumbers = selectedTickets.map((ticket) => ticket.number);
		// console.log("ticketNumbers", ticketNumbers);

		// dispatch(
		// 	recordTransaction({
		// 		amount: totalPrice,
		// 		transaction_type: "purchase",
		// 		lottery_id: lotteryDetails._id,
		// 		operation: "subtract",
		// 		ticket_numbers: ticketNumbers,
		// 	})
		// )
		// 	.unwrap()
		// 	.then((data) => {
		// 		toast.success("Tickets Purchased!");
		// 		console.log("Transaction", data.transaction);
		// 		setTransactionId(data.transaction._id);
		// 		dispatch(setBalance(data.updatedBalance));
		// 	})
		// 	.catch((error) => {
		// 		console.error("Transaction Failed", error);
		// 		toast.error("Transaction Failed");
		// 	});

		const transaction = await dispatch(
			recordTransaction({
				amount: totalPrice,
				transaction_type: "purchase",
				lottery_id: lotteryDetails?._id,
				operation: "subtract",
				ticket_numbers: ticketNumbers,
			})
		).unwrap();

		dispatch(setBalance(transaction.updatedBalance));

		if (affiliate_id) {
			// create affiliate transaction
			dispatch(
				createAffiliateTransaction({
					retailerId: retailer?._id,
					transactionId: transaction.transaction?._id,
					amount: totalPrice,
				})
			)
				.unwrap()
				.then((data) => {
					console.log(
						"Affiliate Transaction created successfully",
						data
					);
				})
				.catch((error) => {
					console.error(
						"Failed to create affiliate transaction",
						error
					);
				});
		}

		dispatch(
			purchaseTicket({
				tickets: ticketNumbers,
				lottery_id: lotteryDetails._id,
			})
		)
			.then(() => {
				console.log("purchaseTicket Success");
				toast.success("Tickets Purchased!");
				setSelectedTickets([]);
				dispatch(clearCart());
			})
			.catch((error) => {
				console.error("Error in purchaseTicket", error);
				// toast.error("Transaction Failed");
			});
	};

	const deleteTicket = (ticket: TicketOption) => {
		setSelectedTickets(selectedTickets.filter((t) => t.id !== ticket.id));
		dispatch(removeFromCart(ticket.id));
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
								₹ {lotteryDetails.ticket_price}
							</span>
						</p>
						<p className="text-gray-600 text-xs">
							Draw Date:{" "}
							<span className="font-bold">
								{lotteryDetails.draw_date}
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
										{ length: lotteryDetails.digit_length },
										(_, i) => (
											<NumberPicker
												key={i}
												index={i}
												value={numbers[i]}
												onChange={handleNumberChange}
												totalDigits={
													lotteryDetails.digit_length
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
										lotteryDetails.digit_length
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
									<span>{ticket.number}</span>
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
