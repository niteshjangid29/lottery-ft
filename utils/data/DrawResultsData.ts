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
		id: "676e528381795ffa5284ddb1",
		lotteryName: "Dear 100",
		drawDate: "27-12-2024",
		winningNumbers: [1234, 3483, 8402, 9012],
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
				winners: [1234, 8402],
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
		id: "6770a02924dd8dc25456263d",
		lotteryName: "PB Lottery",
		drawDate: "20-12-2024",
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
		id: "6770a07e24dd8dc25456263e",
		lotteryName: "Rakhi Special",
		drawDate: "21-12-2024",
		winningNumbers: [89743, 34323, 76423, 56616],
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
				winners: [76423, 56616],
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
		id: "676e54c281795ffa5284ddd2",
		lotteryName: "Dear Special",
		drawDate: "12-12-2024",
		winningNumbers: [16516, 32646, 51196, 84815, 65161, 43452],
		prizeTiers: [
			{
				tier: "1st",
				winners: [],
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
				winners: [32646],
				amount: "50,000",
			},
			{
				tier: "5th",
				winners: [51196],
				amount: "25,000",
			},
			{
				tier: "6th",
				winners: [84815],
				amount: "10,000",
			},
			{
				tier: "7th",
				winners: [65161, 43452, 16516],
				amount: "5,000",
			},
		],
	},
];
