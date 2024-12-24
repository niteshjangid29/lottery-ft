import { Ticket } from "@/app/draw/results/page";
import { FaQrcode, FaTimes } from "react-icons/fa";

interface TicketDetailModalProps {
	ticket: Ticket;
	onClose: () => void;
}

const TicketDetailModal: React.FC<TicketDetailModalProps> = ({
	ticket,
	onClose,
}) => {
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
							{ticket.lotteryName}
						</h3>
						<p className="text-gray-500">Ticket #{ticket.number}</p>
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
							<span>{ticket.drawDate}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600">
								Purchase Date:
							</span>
							<span>{ticket.purchasedDate}</span>
						</div>
						<div className="flex justify-between items-center">
							<span className="text-gray-600">Status:</span>
							<span
								className={`px-3 py-1 rounded-full ${
									ticket.resultStatus === "won"
										? "bg-green-100 text-green-800"
										: ticket.resultStatus === "lost"
										? "bg-red-100 text-red-800"
										: "bg-yellow-100 text-yellow-800"
								}`}
							>
								{ticket.resultStatus.toUpperCase()}
							</span>
						</div>

						{/* Prize Amount if Won */}
						{ticket.resultStatus === "won" && (
							<div className="mt-6 text-center">
								<p className="text-gray-600">Prize Won</p>
								<p className="text-3xl font-bold text-green-600">
									₹{ticket.prizeAmount?.toLocaleString()}
								</p>
							</div>
						)}

						{/* QR Code */}
						{/* <div className="flex justify-center mt-6">
							<div className="p-4 bg-gray-100 rounded-lg">
								<FaQrcode className="w-32 h-32" />
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TicketDetailModal;
