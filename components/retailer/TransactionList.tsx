import React from "react";
import { format } from "date-fns";

// interface Transaction {
// 	_id: string;
// 	amount: number;
// 	commission: number;
// 	status: "pending" | "processed";
// 	createdAt: string;
// 	orderId: {
// 		orderNumber: string;
// 		totalAmount: number;
// 	};
// 	customerId: {
// 		name: string;
// 		email: string;
// 	};
// }

interface TransactionListProps {
	transactions: any[];
	onProcessPayment: (transactionIds: string[]) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
	transactions,
	onProcessPayment,
}) => {
	const [selectedTransactions, setSelectedTransactions] = React.useState<
		string[]
	>([]);

	const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setSelectedTransactions(
				transactions
					.filter((t) => t.status === "pending")
					.map((t) => t._id)
			);
		} else {
			setSelectedTransactions([]);
		}
	};

	const handleSelect = (id: string) => {
		setSelectedTransactions((prev) =>
			prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
		);
	};

	const totalCommission = React.useMemo(
		() =>
			transactions
				.filter((t) => selectedTransactions.includes(t._id))
				.reduce((sum, t) => sum + t.commission, 0),
		[selectedTransactions, transactions]
	);

	return (
		<div className="bg-white rounded-lg shadow">
			<div className="p-4 border-b">
				<div className="flex items-center justify-end">
					<button
						onClick={() => onProcessPayment(selectedTransactions)}
						disabled={selectedTransactions.length === 0}
						className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-500`}
					>
						Process Selected (₹{totalCommission.toFixed(2)})
					</button>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left">
								<input
									type="checkbox"
									onChange={handleSelectAll}
									checked={
										selectedTransactions.length ===
										transactions.filter(
											(t) => t.status === "pending"
										).length
									}
									disabled={
										transactions.filter(
											(t) => t.status === "pending"
										).length === 0
									}
								/>
							</th>
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
						{transactions.map((transaction) => (
							<tr key={transaction._id}>
								<td className="px-6 py-4">
									{transaction.status === "pending" && (
										<input
											type="checkbox"
											checked={selectedTransactions.includes(
												transaction._id
											)}
											onChange={() =>
												handleSelect(transaction._id)
											}
										/>
									)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{format(
										new Date(transaction.createdAt),
										"MMM d, yyyy"
									)}
								</td>
								<td className="px-6 py-4">
									<div className="text-sm font-medium capitalize text-gray-900">
										{transaction.customerId.name}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									₹{transaction.amount.toFixed(2)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									₹{transaction.commission.toFixed(2)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											transaction.status === "processed"
												? "bg-green-100 text-green-800"
												: "bg-yellow-100 text-yellow-800"
										}`}
									>
										{transaction.status}
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

export default TransactionList;
