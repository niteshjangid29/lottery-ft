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
							Customer Purchases Ticket Online
						</h3>
						<p className="text-gray-600">
							Customers visit the official Punjab Government
							Portal. They choose a ticket number or have one
							randomly assigned.
						</p>
					</div>
				</div>

				<div className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center">
					<div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
						2
					</div>
					<div className="ml-4">
						<h3 className="text-xl font-semibold text-gray-800">
							Payment is Directed to State Treasury
						</h3>
						<p className="text-gray-600">
							All payments from the purchase go directly to the
							state government account.
						</p>
					</div>
				</div>

				<div className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center">
					<div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
						3
					</div>
					<div className="ml-4">
						<h3 className="text-xl font-semibold text-gray-800">
							Winning Ticket Verification
						</h3>
						<p className="text-gray-600">
							The system automatically verifies and validates the
							winning ticket.
						</p>
					</div>
				</div>
				<div className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center">
					<div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
						4
					</div>
					<div className="ml-4">
						<h3 className="text-xl font-semibold text-gray-800">
							Affiliate Link Commissioning
						</h3>
						<p className="text-gray-600">
							Prize payouts are directly processed through the
							platform.
						</p>
					</div>
				</div>
				<div className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center">
					<div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
						5
					</div>
					<div className="ml-4">
						<h3 className="text-xl font-semibold text-gray-800">
							Retailers share their affiliate links
						</h3>
						<p className="text-gray-600">
							They earn a commission for each successful sale made
							via their referral.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HowToUse;
