export interface DrawResult {
	id: string;
	lotteryName: string;
	drawDate: string;
	winningNumbers: number[];
	prizeTiers: {
		tier: string;
		amount: string;
		winners: number[];
	}[];
}

export const DRAW_RESULTS_DATA: DrawResult[] = [
	{
		id: "1",
		lotteryName: "Lotto G 100",
		drawDate: "12-1-2025",
		winningNumbers: [1234, 3483, 7642, 9012],
		prizeTiers: [
			{
				tier: "1st",
				winners: [],
				amount: "2,00,000",
			},
			{
				tier: "2nd",
				winners: [3483],
				amount: "50,000",
			},
			{
				tier: "3rd",
				winners: [],
				amount: "25,000",
			},
			{
				tier: "4th",
				winners: [1234, 7642],
				amount: "10,000",
			},
			{
				tier: "5th",
				winners: [],
				amount: "5,000",
			},
			{
				tier: "6th",
				winners: [9012],
				amount: "1,000",
			},
		],
	},
	{
		id: "2",
		lotteryName: "Lotto G 200",
		drawDate: "12-1-2025",
		winningNumbers: [7673, 8372, 7542, 4322, 9809],
		prizeTiers: [
			{
				tier: "1st",
				winners: [],
				amount: "10,00,000",
			},
			{
				tier: "2nd",
				winners: [],
				amount: "1,00,000",
			},
			{
				tier: "3rd",
				winners: [7673],
				amount: "50,000",
			},
			{
				tier: "4th",
				winners: [],
				amount: "25,000",
			},
			{
				tier: "5th",
				winners: [8372],
				amount: "10,000",
			},
			{
				tier: "6th",
				winners: [7542],
				amount: "5,000",
			},
			{
				tier: "7th",
				winners: [4322, 9809],
				amount: "1,000",
			},
		],
	},
	{
		id: "3",
		lotteryName: "Lotto G 300",
		drawDate: "12-1-2025",
		winningNumbers: [89743, 34323, 76423],
		prizeTiers: [
			{
				tier: "1st",
				winners: [],
				amount: "10,00,000",
			},
			{
				tier: "2nd",
				winners: [34323],
				amount: "1,00,000",
			},
			{
				tier: "3rd",
				winners: [],
				amount: "50,000",
			},
			{
				tier: "4th",
				winners: [],
				amount: "25,000",
			},
			{
				tier: "5th",
				winners: [89743],
				amount: "10,000",
			},
			{
				tier: "6th",
				winners: [76423],
				amount: "5,000",
			},
			{
				tier: "7th",
				winners: [],
				amount: "1,000",
			},
		],
	},
	{
		id: "4",
		lotteryName: "Lotto G 500",
		drawDate: "12-1-2025",
		winningNumbers: [16516, 32646, 51196, 84815, 65161, 43452],
		prizeTiers: [
			{
				tier: "1st",
				winners: [16516],
				amount: "50,00,000",
			},
			{
				tier: "2nd",
				winners: [],
				amount: "10,00,000",
			},
			{
				tier: "3rd",
				winners: [],
				amount: "1,00,000",
			},
			{
				tier: "4th",
				winners: [32646, 51196],
				amount: "50,000",
			},
			{
				tier: "5th",
				winners: [],
				amount: "25,000",
			},
			{
				tier: "6th",
				winners: [84815],
				amount: "10,000",
			},
			{
				tier: "7th",
				winners: [65161, 43452],
				amount: "5,000",
			},
		],
	},
];
