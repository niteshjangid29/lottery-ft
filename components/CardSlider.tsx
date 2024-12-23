"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import LotteryCard from "./TicketCard";
import { DUMMY_LOTTERIES } from "@/utils/data/lotteryData";

const CardSlider: React.FC = () => {
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		speed: 4000,
		autoplaySpeed: 3000,
		pauseOnHover: true,
		initialSlide: 0,
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
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className="px-4 mb-10">
			<Slider {...settings} className="center">
				{DUMMY_LOTTERIES.map((lottery, index) => (
					<LotteryCard key={index} lotteryData={lottery} />
				))}
			</Slider>
		</div>
	);
};

export default CardSlider;
