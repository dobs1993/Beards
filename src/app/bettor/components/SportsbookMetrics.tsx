"use client";

interface SportsbookMetric {
  sportsbook: string;
  totalDeposits: number;
  totalWithdrawals: number;
  totalProfit: number;
  accountCount: number;
  averageLifespan: number;
  activeAccounts: number;
}

interface SportsbookMetricsProps {
  metrics: SportsbookMetric[];
}

const SportsbookMetrics: React.FC<SportsbookMetricsProps> = ({ metrics }) => {
  return (
    <div className="bg-[#1a2236] rounded-lg shadow mb-8">
      <div className="px-6 py-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Sportsbook Metrics</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sportsbook</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Deposited</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Withdrawn</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Profit</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Accounts</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Avg. Lifespan</th>
            </tr>
          </thead>
          <tbody className="bg-[#1a2236] divide-y divide-gray-700">
            {metrics.map((metric, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{metric.sportsbook}</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-400">${metric.totalDeposits.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-red-400">${metric.totalWithdrawals.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-400">${metric.totalProfit.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {metric.activeAccounts} active / {metric.accountCount} total
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{metric.averageLifespan} days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SportsbookMetrics;