"use client";
import React, { useState } from "react";
import LotteryCard from "./TicketCard";
import { LotteryItem } from "@/utils/data/lotteryData";

interface SliderProps {
	data: LotteryItem[];
}

const Slider = ({ data }: SliderProps) => {
	const [startIndex, setStartIndex] = useState(0);
	const cardsPerFrame = 2;

	const handleNext = () => {
		if (startIndex + cardsPerFrame < data.length) {
			setStartIndex(startIndex + cardsPerFrame);
		}
	};

	const handlePrev = () => {
		if (startIndex - cardsPerFrame >= 0) {
			setStartIndex(startIndex - cardsPerFrame);
		}
	};

	const visibleTickets = data.slice(startIndex, startIndex + cardsPerFrame);

	return (
		<div className="flex justify-center items-center py-5">
			<div className="w-full max-w-5xl border-3 border-yellow-500 rounded-lg px-4 relative">
				{/* Heading */}
				<h2 className="text-2xl font-bold text-center text-yellow-600 mb-4">
					Best Seller
				</h2>

				<div className="flex justify-between items-center relative">
					{/* Left Arrow */}
					<button
						className="p-3 bg-white rounded-full shadow-md hover:bg-gray-200 absolute disabled:opacity-50 left-2 transform -translate-x-full"
						onClick={handlePrev}
						disabled={startIndex <= 0}
					>
						❮
					</button>

					<div className="flex space-x-2 justify-center items-stretch w-full">
						{visibleTickets.map(
							(data: LotteryItem, index: number) => (
								<LotteryCard lotteryData={data} key={index} />
							)
						)}
					</div>

					{/* Right Arrow */}

					<button
						className="p-3 bg-white rounded-full shadow-md hover:bg-gray-200 absolute right-2 disabled:opacity-50 transform translate-x-full"
						onClick={handleNext}
						disabled={startIndex + cardsPerFrame >= data.length}
					>
						❯
					</button>
				</div>
			</div>
		</div>
	);
};

export default Slider;
