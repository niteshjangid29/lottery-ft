export interface Ticket {
	id: string;
	lotteryName: string;
	number: string;
	drawDate: string;
	resultStatus: "pending" | "won" | "lost";
	prizeAmount?: number;
	purchasedDate: string;
}

export const TICKETS_DATA: Ticket[] = [
	{
		id: "1",
		lotteryName: "Lotto G 100",
		number: "1234",
		drawDate: "12-1-2025",
		resultStatus: "pending",
		purchasedDate: "12-12-2024",
	},
	{
		id: "2",
		lotteryName: "Lotto G 200",
		number: "3482",
		drawDate: "12-12-2024",
		resultStatus: "lost",
		purchasedDate: "10-12-2024",
	},
	{
		id: "3",
		lotteryName: "Lotto G 300",
		number: "76423",
		drawDate: "21-12-2024",
		resultStatus: "won",
		prizeAmount: 5000,
		purchasedDate: "10-12-2024",
	},
	{
		id: "4",
		lotteryName: "Lotto G 100",
		number: "9123",
		drawDate: "12-12-2024",
		resultStatus: "lost",
		purchasedDate: "9-12-2024",
	},
];
