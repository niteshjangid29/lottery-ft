interface LotteryItem {
	id: number;
	name: string;
	drawDate: string;
	drawTime: string;
	prizeAmount: string;
	ticketPrice: number;
	category: string;
	digitLength: number;
}

export const DUMMY_LOTTERIES: LotteryItem[] = [
	{
		id: 1,
		name: "Lotto G 100",
		drawDate: "2024-03-25",
		drawTime: "1:00 PM",
		prizeAmount: "₹1,000,000",
		ticketPrice: 100,
		category: "Daily",
		digitLength: 4,
	},
	{
		id: 2,
		name: "Lotto G 200",
		drawDate: "2024-03-30",
		drawTime: "4:30 PM",
		prizeAmount: "₹5,000,000",
		ticketPrice: 200,
		category: "Weekly",
		digitLength: 4,
	},
	{
		id: 3,
		name: "Lotto G 300",
		drawDate: "2024-03-30",
		drawTime: "8:00 PM",
		prizeAmount: "₹5,000,000",
		ticketPrice: 300,
		category: "Monthly",
		digitLength: 5,
	},
	{
		id: 4,
		name: "Lotto G 100",
		drawDate: "2024-03-30",
		drawTime: "1:00 PM",
		prizeAmount: "₹1,000,000",
		ticketPrice: 100,
		category: "Daily",
		digitLength: 4,
	},
	{
		id: 5,
		name: "Lotto G 500",
		drawDate: "2024-03-30",
		drawTime: "10:00 AM",
		prizeAmount: "₹10,000,000",
		ticketPrice: 500,
		category: "Special",
		digitLength: 5,
	},
	{
		id: 6,
		name: "Lotto G 500",
		drawDate: "2024-03-30",
		drawTime: "10:00 AM",
		prizeAmount: "₹10,000,000",
		ticketPrice: 500,
		category: "Special",
		digitLength: 5,
	},
	{
		id: 7,
		name: "Lotto G 200",
		drawDate: "2024-03-30",
		drawTime: "4:30 PM",
		prizeAmount: "₹5,000,000",
		ticketPrice: 200,
		category: "weekly",
		digitLength: 4,
	},
];
