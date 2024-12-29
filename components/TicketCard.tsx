import Link from "next/link";
import React from "react";

interface LotteryCardProps {
	lotteryData: any;
	affiliate_id?: string | null;
}

const LotteryCard: React.FC<LotteryCardProps> = ({
	lotteryData,
	affiliate_id,
}) => {
	const grandPrize = lotteryData.prizeTiers[0].amount / 100000;

	return (
		<div>
			<div className="flex flex-col justify-center gap-2 items-center bg-[#526799] p-2 md:p-4 rounded-t-xl w-[150px] h-auto md:w-[230px]">
				<p className="text-white text-xl font-semibold border-b w-full border-gray-200">
					{lotteryData.name}
				</p>
				<div className="flex flex-col items-center h-3/4">
					<p className="text-white text-md font-semibold">
						{"Win First Prize"}
					</p>
					<p className="text-white text-2xl font-bold">
						₹{grandPrize} Lakhs
					</p>
				</div>
				<div className="flex flex-wrap items-center justify-around gap-2 w-full">
					<div className="flex flex-col items-center gap-1 md:gap-2">
						<p className="text-white text-xs md:text-sm">Draw</p>
						<p className="text-white text-xs md:text-sm">
							{lotteryData.draw_date}
						</p>
					</div>
					<div className="flex flex-col items-center gap-1 md:gap-2">
						<p className="text-white text-xs md:text-sm">Time</p>
						<p className="text-white text-xs md:text-sm">
							{lotteryData.draw_time}
						</p>
					</div>
				</div>
			</div>
			<div className="flex justify-between items-center relative bg-[#F37B67] p-2 md:p-4 rounded-b-xl w-[150px] h-auto md:w-[230px] border-t-2 border-dashed border-white">
				<div className="absolute top-0 left-0 w-[10px] h-[20px] -translate-y-[50%] rounded-e-full bg-gray-100"></div>
				<div className="absolute top-0 right-0 w-[10px] h-[20px] rounded-s-full -translate-y-[50%] bg-gray-100"></div>
				<div className="flex flex-col items-center justify-between gap-2 w-full">
					<Link
						href={`/lotteries/purchaseTickets/${lotteryData._id}/?affiliate_id=${affiliate_id}`}
						className="bg-white text-gray-600 hover:text-white hover:outline hover:outline-white hover:bg-[#F37B67] py-1 md:py-2 px-4 md:px-6 rounded-full text-sm md:text-base transition-colors"
					>
						Buy Ticket
					</Link>

					<p className="text-white text-xs md:text-lg font-semibold">
						Ticket Price: ₹ {lotteryData.ticket_price}
					</p>
				</div>
			</div>
		</div>
	);
};

export default LotteryCard;
