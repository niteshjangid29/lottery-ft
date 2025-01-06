// "use client";

const PlayResponsiblyPage = () => {
	return (
		<div className="max-w-4xl mx-auto py-20 p-4">
			<h1 className="text-2xl font-bold mb-6">Play Responsibly</h1>

			<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
				<h2 className="text-lg font-semibold text-yellow-700 mb-2">
					Important Notice
				</h2>
				<p className="text-yellow-600">
					<span>
						To promote responsible gaming, we monitor ticket
						purchases and implement temporary restrictions in case
						of:{" "}
					</span>
					<br />
					<span>
						- You purchase more than 20 tickets in 7 days without
						wins{" "}
					</span>
					<br />
					<span>- You exceed recommended spending limits </span>
					<br />
					<span>- Continuous losses are detected</span>
				</p>
			</div>

			<div className="space-y-6">
				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="font-semibold mb-3">
						Responsible Gaming Guidelines
					</h3>
					<ul className="list-disc pl-5 space-y-2">
						<li>Set a personal spending limit</li>
						<li>Only spend what you can afford to lose</li>
						<li>Take regular breaks from playing</li>
						<li>{`Don't chase losses`}</li>
						<li>Keep track of time and money spent</li>
					</ul>
				</div>

				<div className="bg-white p-6 rounded-lg shadow">
					<h3 className="font-semibold mb-3">Cooling Off Period</h3>
					<p>If restrictions are applied:</p>
					<ul className="list-disc pl-5 space-y-2">
						<li>3-day cooling period for excessive purchases</li>
						<li>7-day break after continuous losses</li>
						<li>Option for voluntary self-exclusion</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default PlayResponsiblyPage;
