import { DRAW_RESULTS_DATA } from "@/utils/data/DrawResultsData";
import { format, parse } from "date-fns";
import { FaTimes } from "react-icons/fa";

const TicketDetailModal: React.FC<any> = ({ ticket, onClose }) => {
	console.log("ticket", ticket);

	const result = DRAW_RESULTS_DATA.find(
		(result) => result.lotteryName === ticket.lottery_id.name
	);

	console.log("result", result);

	const prizeAmount = result?.winningNumbers.includes(ticket.ticket_number)
		? result.prizeTiers.find((prize) =>
				prize.winners.includes(ticket.ticket_number)
		  )?.amount
		: 0;

	console.log("prizeAmount", prizeAmount);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg w-[80%] max-w-md p-6 relative">
				<button
					onClick={onClose}
					className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
				>
					<FaTimes />
				</button>

				<div className="space-y-6">
					{/* Ticket Header */}
					<div className="text-center border-b pb-4">
						<h3 className="text-2xl font-bold">
							{ticket.lottery_id.name}
						</h3>
						<p className="text-gray-500">
							Ticket #{ticket.ticket_number}
						</p>
					</div>

					{/* Ticket Details */}
					<div className="space-y-4">
						{/* <div className="flex justify-between">
							<span className="text-gray-600">Number:</span>
							<span className="font-mono font-bold">
								{ticket.number}
							</span>
						</div> */}
						<div className="flex justify-between">
							<span className="text-gray-600">Draw Date:</span>
							<span>
								{format(
									parse(
										ticket.lottery_id.draw_date,
										"d-M-yyyy",
										new Date()
									),
									"dd-MM-yyyy"
								)}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600">
								Purchase Date:
							</span>
							<span>
								{format(ticket.purchase_date, "dd-MM-yyyy")}
							</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-gray-600">Status:</span>
							<span
								className={`px-3 py-1 rounded-full ${
									ticket.status === "winning"
										? "bg-green-100 text-green-800"
										: ticket.status === "cancelled"
										? "bg-red-100 text-red-800"
										: "bg-yellow-100 text-yellow-800"
								}`}
							>
								{ticket.status.toUpperCase()}
							</span>
						</div>

						{/* Prize Amount if Won */}
						{ticket.status === "winning" && (
							<div className="mt-6 text-center">
								<p className="text-gray-600">Prize Won</p>
								<p className="text-3xl font-bold text-green-600">
									₹{prizeAmount}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TicketDetailModal;
