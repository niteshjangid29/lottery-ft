export interface prizeAmount {
  prize: string;
  winners: number;
  amount: string;
}

export interface LotteryItem {
  id: number;
  name: string;
  drawDate: string;
  drawTime: string;
  prizeAmounts: prizeAmount[];
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
    prizeAmounts: [
      {
        prize: "1st",
        winners: 2,
        amount: "2,00,000",
      },
      {
        prize: "2nd",
        winners: 5,
        amount: "50,000",
      },
      {
        prize: "3rd",
        winners: 10,
        amount: "25,000",
      },
      {
        prize: "4th",
        winners: 25,
        amount: "10,000",
      },
      {
        prize: "5th",
        winners: 45,
        amount: "5,000",
      },
      {
        prize: "6th",
        winners: 60,
        amount: "1,000",
      },
    ],
    ticketPrice: 100,
    category: "Daily",
    digitLength: 4,
  },
  {
    id: 2,
    name: "Lotto G 200",
    drawDate: "2024-03-30",
    drawTime: "4:30 PM",
    prizeAmounts: [
      {
        prize: "1st",
        winners: 1,
        amount: "10,00,000",
      },
      {
        prize: "2nd",
        winners: 2,
        amount: "1,00,000",
      },
      {
        prize: "3rd",
        winners: 5,
        amount: "50,000",
      },
      {
        prize: "4th",
        winners: 15,
        amount: "25,000",
      },
      {
        prize: "5th",
        winners: 30,
        amount: "10,000",
      },
      {
        prize: "6th",
        winners: 50,
        amount: "5,000",
      },
      {
        prize: "7th",
        winners: 60,
        amount: "1,000",
      },
    ],
    ticketPrice: 200,
    category: "Weekly",
    digitLength: 4,
  },
  {
    id: 3,
    name: "Lotto G 300",
    drawDate: "2024-03-30",
    drawTime: "8:00 PM",
    prizeAmounts: [
      {
        prize: "1st",
        winners: 1,
        amount: "20,00,000",
      },
      {
        prize: "2nd",
        winners: 4,
        amount: "1,00,000",
      },
      {
        prize: "3rd",
        winners: 10,
        amount: "50,000",
      },
      {
        prize: "4th",
        winners: 25,
        amount: "25,000",
      },
      {
        prize: "5th",
        winners: 55,
        amount: "10,000",
      },
      {
        prize: "6th",
        winners: 70,
        amount: "5,000",
      },
      {
        prize: "7th",
        winners: 100,
        amount: "1,000",
      },
    ],
    ticketPrice: 300,
    category: "Monthly",
    digitLength: 5,
  },
  {
    id: 4,
    name: "Lotto G 100",
    drawDate: "2024-03-30",
    drawTime: "1:00 PM",
    prizeAmounts: [
      {
        prize: "1st",
        winners: 2,
        amount: "2,00,000",
      },
      {
        prize: "2nd",
        winners: 5,
        amount: "50,000",
      },
      {
        prize: "3rd",
        winners: 10,
        amount: "25,000",
      },
      {
        prize: "4th",
        winners: 25,
        amount: "10,000",
      },
      {
        prize: "5th",
        winners: 45,
        amount: "5,000",
      },
      {
        prize: "6th",
        winners: 60,
        amount: "1,000",
      },
    ],
    ticketPrice: 100,
    category: "Daily",
    digitLength: 4,
  },
  {
    id: 5,
    name: "Lotto G 500",
    drawDate: "2024-03-30",
    drawTime: "10:00 AM",
    prizeAmounts: [
      {
        prize: "1st",
        winners: 1,
        amount: "50,00,000",
      },
      {
        prize: "2nd",
        winners: 2,
        amount: "10,00,000",
      },
      {
        prize: "3rd",
        winners: 3,
        amount: "1,00,000",
      },
      {
        prize: "4th",
        winners: 15,
        amount: "50,000",
      },
      {
        prize: "5th",
        winners: 30,
        amount: "₹25,000",
      },
      {
        prize: "6th",
        winners: 50,
        amount: "10,000",
      },
      {
        prize: "7th",
        winners: 60,
        amount: "5,000",
      },
    ],
    ticketPrice: 500,
    category: "Special",
    digitLength: 5,
  },
  {
    id: 6,
    name: "Lotto G 500",
    drawDate: "2024-03-30",
    drawTime: "10:00 AM",
    prizeAmounts: [
      {
        prize: "1st",
        winners: 1,
        amount: "50,00,000",
      },
      {
        prize: "2nd",
        winners: 2,
        amount: "10,00,000",
      },
      {
        prize: "3rd",
        winners: 3,
        amount: "1,00,000",
      },
      {
        prize: "4th",
        winners: 15,
        amount: "50,000",
      },
      {
        prize: "5th",
        winners: 30,
        amount: "25,000",
      },
      {
        prize: "6th",
        winners: 50,
        amount: "10,000",
      },
      {
        prize: "7th",
        winners: 60,
        amount: "5,000",
      },
    ],
    ticketPrice: 500,
    category: "Special",
    digitLength: 5,
  },
  {
    id: 7,
    name: "Lotto G 200",
    drawDate: "2024-03-30",
    drawTime: "4:30 PM",
    prizeAmounts: [
      {
        prize: "1st",
        winners: 1,
        amount: "10,00,000",
      },
      {
        prize: "2nd",
        winners: 2,
        amount: "1,00,000",
      },
      {
        prize: "3rd",
        winners: 5,
        amount: "50,000",
      },
      {
        prize: "4th",
        winners: 15,
        amount: "25,000",
      },
      {
        prize: "5th",
        winners: 30,
        amount: "10,000",
      },
      {
        prize: "6th",
        winners: 50,
        amount: "5,000",
      },
      {
        prize: "7th",
        winners: 60,
        amount: "1,000",
      },
    ],
    ticketPrice: 200,
    category: "weekly",
    digitLength: 4,
  },
];
