"use client";

import { useSearchParams } from "next/navigation";
import { DRAW_RESULTS_DATA } from "@/utils/data/DrawResultsData";
import { format, parse } from "date-fns";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchTicketsByLotteryId } from "@/redux/slices/userSlice";

function DrawDetailsContent() {
  const searchParams = useSearchParams();
  const drawId = searchParams.get("id");
  const [searchTicket, setSearchTicket] = useState("");
  const { purchasedTickets: soldTickets } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  const drawResult = DRAW_RESULTS_DATA.find((result) => result.id === drawId);
  const searchedTicket =
    (soldTickets.find((ticket) => ticket.number === searchTicket) as any) ||
    ([] as any);

  console.log("searched ticket - ", searchedTicket);
  console.log("search for ticket - ", searchTicket);

  useEffect(() => {
    dispatch(fetchTicketsByLotteryId(""));
  }, [dispatch]);

  if (!drawResult) {
    return <div>Draw result not found</div>;
  }

  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">{drawResult.lotteryName}</h1>
          <p className="mt-2">
            Draw Date:{" "}
            {format(
              parse(drawResult.drawDate, "d-M-yyyy", new Date()),
              "dd-MM-yyyy"
            )}
          </p>
        </div>

        {/* Winning Numbers */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-4">Winning Numbers</h2>
          <div className="flex gap-3">
            {drawResult.winningNumbers.slice(0, 5).map((num, index) => (
              <span
                key={index}
                className="w-max h-10 rounded-full px-2 py-1 bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm"
              >
                {num}
              </span>
            ))}
          </div>
        </div>

        {/* Search your tickets */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Search your tickets</h2>
          <div className="flex gap-4 items-center justify-center">
            <input
              type="text"
              placeholder="Enter ticket number"
              className="w-[80%] p-3 border rounded-lg"
              value={searchTicket}
              onChange={(e) => setSearchTicket(e.target.value)}
            />
            <button className="bg-green-500 text-white p-3 rounded-lg">
              Search
            </button>
          </div>
        </div>

        {/* Ticket Details */}
        {!searchedTicket || searchedTicket.length === 0 ? (
          <div className="p-4">
            <p>Sorry! No ticket found for this number</p>
          </div>
        ) : (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Ticket Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Number:</span>
                <span className="font-mono font-bold">
                  {searchedTicket.number}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Draw Date:</span>
                <span>{searchedTicket.drawDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Purchase Date:</span>
                <span>{searchedTicket.purchasedDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full ${
                    searchedTicket.resultStatus === "won"
                      ? "bg-green-100 text-green-800"
                      : searchedTicket.resultStatus === "lost"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {searchedTicket.resultStatus.toUpperCase()}
                </span>
              </div>

              {/* Prize Amount if Won */}
              {searchedTicket.resultStatus === "won" && (
                <div className="mt-6 text-center">
                  <p className="text-gray-600">Prize Won</p>
                  <p className="text-3xl font-bold text-green-600">
                    ₹{searchedTicket.prizeAmount?.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Prize Breakdown */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Prize Breakdown</h2>
          <div className="space-y-2">
            {drawResult.prizeTiers.map((prize, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-200 rounded"
              >
                <div>
                  <p className="font-medium">{prize.tier}</p>
                  <p className="text-sm text-gray-500">
                    {prize.winners.length} Winner
                    {prize.winners.length > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹{prize.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DrawDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DrawDetailsContent />
    </Suspense>
  );
}
