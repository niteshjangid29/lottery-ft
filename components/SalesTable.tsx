"use client";

import { useState } from "react";
// import { format } from 'date-fns';

interface Sale {
	id: string;
	customerName: string;
	amount: number;
	commission: number;
	status: "PENDING" | "PROCESSED";
	createdAt: string;
}

interface SalesTableProps {
	sales: Sale[];
}

const SalesTable = ({ sales }: SalesTableProps) => {
	const [sortBy, setSortBy] = useState("");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

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
						{sales.map((sale: Sale) => (
							<tr key={sale.id}>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{sale.createdAt}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{sale.customerName}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{sale.amount}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									₹{sale.commission}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									<span
										className={`${
											sale.status === "PENDING"
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
			</div>
		</div>
	);
};

export default SalesTable;
