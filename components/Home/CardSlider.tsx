"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useEffect } from "react";
import Slider from "react-slick";
import LotteryCard from "../TicketCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAllLotteries } from "@/redux/slices/lotterySlice";

interface CardSliderProps {
	affiliate_id?: string | null;
}

const CardSlider: React.FC<CardSliderProps> = ({ affiliate_id }) => {
	const settings = {
		dots: true,
		className: "mx-auto",
		infinite: true,
		slidesToShow: 4,
		swipeToSlide: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					// slidesToScroll: 2,
				},
			},
		],
	};

	const { lotteries } = useSelector(
		(state: RootState) => state.lottery
	) as any;

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchAllLotteries());
	}, [dispatch]);

	console.log("lotteries", lotteries);

	return (
		<div className="mb-10">
			<Slider {...settings}>
				{lotteries?.slice(0, 4).map((lottery: any) => (
					<LotteryCard
						key={lottery._id}
						lotteryData={lottery}
						affiliate_id={affiliate_id}
					/>
				))}
			</Slider>
		</div>
	);
};

export default CardSlider;
