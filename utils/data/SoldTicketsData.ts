interface SoldTickets {
	lotteryName: string;
	purchasedTickets: number[];
}

export const SOLD_TICKETS_DATA: SoldTickets[] = [
	{
		lotteryName: "Lotto G 100",
		purchasedTickets: [1122, 2432, 3987],
	},
	{
		lotteryName: "Lotto G 200",
		purchasedTickets: [7682, 2978],
	},
	{
		lotteryName: "Lotto G 300",
		purchasedTickets: [57787, 63422],
	},
	{
		lotteryName: "Lotto G 500",
		purchasedTickets: [67573, 78963, 34683],
	},
];
