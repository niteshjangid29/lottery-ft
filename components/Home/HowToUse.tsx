const HowToUse = () => {
	return (
		<div className="max-w-2xl mx-auto my-8 p-4 bg-transparent rounded-lg ">
			<h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
				How to Use
			</h2>
			<div className="space-y-6">
				<div className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center">
					<div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
						1
					</div>
					<div className="ml-4">
						<h3 className="text-xl font-semibold text-gray-800">
							Choose Your Lottery
						</h3>
						<p className="text-gray-600">
							Browse through the list of available lotteries and
							pick the one that excites you the most.
						</p>
					</div>
				</div>

				<div className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center">
					<div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
						2
					</div>
					<div className="ml-4">
						<h3 className="text-xl font-semibold text-gray-800">
							Select Numbers and Quantity
						</h3>
						<p className="text-gray-600">
							Choose your lottery numbers and decide how many
							tickets you'd like to purchase.
						</p>
					</div>
				</div>

				<div className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center">
					<div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
						3
					</div>
					<div className="ml-4">
						<h3 className="text-xl font-semibold text-gray-800">
							Click "Buy Tickets"
						</h3>
						<p className="text-gray-600">
							Complete the payment process securely and easily by
							clicking on the "Buy Tickets" button.
						</p>
					</div>
				</div>
				<div className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center">
					<div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
						4
					</div>
					<div className="ml-4">
						<h3 className="text-xl font-semibold text-gray-800">
							Wait for Draw
						</h3>
						<p className="text-gray-600">
							After a successful payment, your ticket will be
							available in your My-Tickets section. Relax and get
							ready to participate!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HowToUse;
