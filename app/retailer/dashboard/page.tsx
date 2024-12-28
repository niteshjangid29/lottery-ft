import Dashboard from "@/components/retailer/Dashboard";

export default function RetailerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 py-16 md:pb-0">
      <div className="max-w-7xl mx-auto p-4">
        {/* <h1 className="text-2xl font-bold mb-6">Retailer Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Sales"
            value={`₹${stats.totalSales}`}
            trend={50}
          />
          <StatCard
            title="Pending Commission"
            value={`₹${stats.pendingCommission}`}
          />
          <StatCard
            title="Total Commission"
            value={`₹${stats.totalCommission}`}
            trend={20}
          />
          <StatCard
            title="Total Customers"
            value={stats.customerCount}
            trend={-10}
          />
        </div> */}

        <Dashboard />
      </div>
    </div>
  );
}
