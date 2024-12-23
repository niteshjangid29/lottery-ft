interface StatCardProps {
	title: string;
	value: string | number;
	trend?: number;
	variant?: "default" | "success" | "warning";
}

const StatCard: React.FC<StatCardProps> = ({
	title,
	value,
	trend,
	variant = "default",
}) => {
	const variants = {
		default: "bg-white",
		success: "bg-green-50",
		warning: "bg-yellow-50",
	};

	return (
		<div className={`${variants[variant]} p-6 rounded-lg shadow-sm`}>
			<div className="flex justify-between items-start">
				<div>
					<p className="text-gray-500 text-sm">{title}</p>
					<h3 className="text-2xl font-bold mt-2">{value}</h3>
				</div>
			</div>
			{trend && (
				<p
					className={`text-sm mt-2 ${
						trend > 0 ? "text-green-500" : "text-red-500"
					}`}
				>
					{trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
				</p>
			)}
		</div>
	);
};

export default StatCard;
