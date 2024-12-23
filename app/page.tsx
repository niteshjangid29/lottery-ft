import CardSlider from "@/components/CardSlider";
import Slider from "@/components/slider";
import { DUMMY_LOTTERIES } from "@/utils/data/lotteryData";
import Link from "next/link";

export default function Home() {
	return (
		<div className="text-primary bg-gray-100 min-h-screen py-16 md:pb-0">
			<div className="max-w-7xl mx-auto p-4">
				{/* Hero Section */}
				<div className="text-center mb-10">
					<h1 className="text-5xl font-bold mb-2">
						Welcome to Lotto G!
					</h1>
					<p className="text-xl mb-4">
						Your chance to win big starts here!
					</p>
					<Link
						href={"/login"}
						className="bg-blue-500 text-white py-3 px-6 rounded text-lg"
					>
						Get Started
					</Link>
				</div>

				{/* Current Lottery Info */}
				<div className="mb-6">
					<h2 className="text-3xl pl-4 font-semibold mb-4">
						Top Lotteries
					</h2>
					<CardSlider />
				</div>

				{/* <Slider data={DUMMY_LOTTERIES.slice(0, 4)} /> */}

				{/* Promotional Banner */}
				<div className="bg-yellow-300 text-black text-center p-4 rounded mb-6">
					<h2 className="text-2xl font-semibold">
						Special Promotion!
					</h2>
					<p>Buy 2 tickets and get 1 free! Limited time offer.</p>
				</div>

				{/* Recent Winners Section */}
				<div className="bg-white shadow-md rounded p-6">
					<h2 className="text-3xl font-semibold mb-4">
						Recent Winners
					</h2>
					<ul className="list-disc pl-5">
						<li>James Potter - ₹ 1,000,000</li>
						<li>Harry Potter - ₹ 500,000</li>
						<li>Lilly Potter - ₹ 250,000</li>
					</ul>
				</div>

				{/* Contact Us Section */}
				<div className="p-6">
					<h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
					<p className="text-gray-600 mt-2">
						Have any questions? Reach out to us at
					</p>
					<p className="text-gray-600 mt-2">
						<a href="mailto:support@lotterygame.com">
							support@lotterygame.com
						</a>
					</p>
				</div>

				{/* Footer Links */}
				<footer className="mt-10 text-center">
					<p>Learn more about our games:</p>
					<div className="flex justify-center space-x-4">
						<Link href="/help" className="text-blue-500">
							How to Play
						</Link>
						<Link href="/rules" className="text-blue-500">
							Rules
						</Link>
					</div>
				</footer>
			</div>
		</div>
	);
}
