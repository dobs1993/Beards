"use client";

interface ProfitSummaryProps {
  userData: {
    name: string;
    email: string;
    beard: string;
    profitShare: number;
    totalProfit: number;
    pendingPayment: number;
    lastPaid: string;
  };
}

const ProfitSummary: React.FC<ProfitSummaryProps> = ({ userData }) => {
  return (
    <div className="bg-[#1a2236] rounded-lg shadow p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Welcome, {userData.name}</h2>
          <p className="text-gray-400 mb-2">Email: {userData.email}</p>
          <p className="text-gray-400 mb-2">Assigned Beard: {userData.beard}</p>
          <p className="text-gray-400 mb-2">Your Profit Share: {userData.profitShare}%</p>
        </div>
        <div className="bg-[#252e47] rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Profit Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Total Profit:</span>
            <span className="font-bold text-green-400">${userData.totalProfit.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Your Share:</span>
            <span className="font-bold text-green-400">${(userData.totalProfit * userData.profitShare / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Pending Payment:</span>
            <span className="font-bold text-yellow-400">${userData.pendingPayment.toFixed(2)}</span>
          </div>
          <div className="mt-2 text-xs text-gray-400">Last payment: {userData.lastPaid}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfitSummary;