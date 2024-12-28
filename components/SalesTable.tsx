"use client";

import { format } from "date-fns";
import { useMemo, useState } from "react";

interface SalesTableProps {
  sales: any[];
}

const SalesTable = ({ sales }: SalesTableProps) => {
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  // Pagination Logic
  const totalPages = Math.ceil(sales.length / itemsPerPage);
  const paginatedSales = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return sales.slice(startIndex, startIndex + itemsPerPage);
  }, [page, sales]);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Commission
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Map through sales data */}
            {paginatedSales.map((sale: any) => (
              <tr key={sale._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {format(sale.createdAt, "dd-MM-yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap capitalize text-sm text-gray-500">
                  {sale.customerId.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹{sale.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹{sale.commission}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`${
                      sale.status === "pending"
                        ? "text-red-500"
                        : "text-green-500"
                    } font-medium`}
                  >
                    {sale.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-3 py-1 rounded ${
                    page === i + 1 ? "bg-blue-500 text-white" : "border"
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 border rounded"
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesTable;
