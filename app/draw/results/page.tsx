import NumberPicker from "@/components/NumberPicker";

export default function ResultsPage() {
	return (
		<div className="min-h-screen pt-16 bg-gray-100">
			<div className="max-w-7xl mx-auto h-full p-4">
				<h1 className="text-4xl font-bold text-gray-800">Results</h1>
				<p className="text-gray-600 mt-2">
					Check your tickets and see the results
				</p>
				<div className="mt-8">
					<h2 className="text-2xl font-bold text-gray-800">
						Your Tickets
					</h2>
					<div className="mt-4">
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-2">
								<div className="w-16 h-16 bg-blue-500 rounded-full"></div>
								<div className="text-gray-600">
									<p className="text-lg font-semibold">
										Daily Jackpot
									</p>
									<p className="text-sm">
										Draw Date: 25 March 2024
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
