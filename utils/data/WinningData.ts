interface WinningData {
	lotteryName: string;
	winningTickets: number[];
	prizeAmount: number;
}

export const WINNING_DATA: WinningData[] = [
	{
		lotteryName: "Lotto G 100",
		winningTickets: [1122, 2432, 3987],
		prizeAmount: 1000,
	},
	{
		lotteryName: "Lotto G 200",
		winningTickets: [7682, 2987],
		prizeAmount: 500,
	},
	{
		lotteryName: "Lotto G 300",
		winningTickets: [57787, 63422],
		prizeAmount: 250,
	},
	{
		lotteryName: "Lotto G 500",
		winningTickets: [67573, 78963, 34683],
		prizeAmount: 1000,
	},
];
