"use client";

interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal';
  amount: number;
  sportsbook: string;
  accountName: string;
  date: string;
  status: 'completed' | 'pending';
  setId: string;
}

interface IDSet {
  id: string;
  name: string;
  color: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  idSets: IDSet[];
  onNewTransaction: () => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ 
  transactions, 
  idSets,
  onNewTransaction
}) => {
  return (
    <div className="bg-[#1a2236] rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold">Recent Transactions</h2>
        <button 
          onClick={onNewTransaction}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Transaction
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Set</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sportsbook</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Account</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-[#1a2236] divide-y divide-gray-700">
            {transactions.map((transaction) => {
              const set = idSets.find(s => s.id === transaction.setId);
              const setColor = set ? (set.color === 'blue' ? '#93c5fd' : '#86efac') : 'gray';
              const setBgColor = set ? (set.color === 'blue' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(22, 163, 74, 0.1)') : '';
              
              return (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === 'deposit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'}>
                      {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div 
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: setBgColor,
                        color: setColor,
                        borderLeft: `3px solid ${setColor}`
                      }}
                    >
                      {set?.name || 'Unknown Set'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.sportsbook}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.accountName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;