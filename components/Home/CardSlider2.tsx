"use client";
import { useState } from "react";
import LotteryCard from "../TicketCard";
import { DUMMY_LOTTERIES } from "@/utils/data/lotteryData";

export default function CardCarousel() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const handlePrev = () => {
		setCurrentSlide((prev) =>
			prev === 0 ? DUMMY_LOTTERIES.length - 1 : prev - 1
		);
	};

	const handleNext = () => {
		setCurrentSlide((prev) =>
			prev === DUMMY_LOTTERIES.length - 1 ? 0 : prev + 1
		);
	};

	return (
		<div className="flex flex-col items-center pt-10  bg-gray-100">
			{/* Carousel Wrapper */}
			<div className="relative w-[350px]">
				{" "}
				{/* Adjusted width */}
				{/* Slide */}
				<div
					className={`flex items-center justify-between p-6 rounded-xl transition-transform duration-300`}
				>
					{/* <div>
						<h3 className="text-xl font-bold text-gray-800">
							{slides[currentSlide].title}
						</h3>
						<p className="text-sm text-gray-500">
							{slides[currentSlide].description}
						</p>
					</div>
					<div>
						<Image
							src={slides[currentSlide].image}
							alt={slides[currentSlide].title}
							width={100}
							height={100}
							className="rounded-full"
						/>
					</div> */}
					{DUMMY_LOTTERIES.map((lottery, index) => (
						<LotteryCard key={index} lotteryData={lottery} />
					))}
				</div>
				{/* Controls */}
				<div className="absolute top-1/2 -left-3 transform -translate-y-1/2">
					<button
						className="p-3 bg-white rounded-full shadow-md hover:bg-gray-200"
						onClick={handlePrev}
					>
						❮
					</button>
				</div>
				<div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
					<button
						className="p-3 bg-white rounded-full shadow-md hover:bg-gray-200"
						onClick={handleNext}
					>
						❯
					</button>
				</div>
			</div>

			{/* Dots */}
			<div className="flex space-x-2 mt-6">
				{DUMMY_LOTTERIES.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`h-3 w-3 rounded-full ${
							currentSlide === index
								? "bg-blue-500"
								: "bg-gray-300"
						}`}
					/>
				))}
			</div>
		</div>
	);
}
