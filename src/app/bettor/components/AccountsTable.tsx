"use client";

import { useState } from 'react';

interface Account {
  id: number;
  sportsbook: string;
  accountName: string;
  username: string;
  password: string;
  balance: number;
  profit: number;
  startDate: string;
  status: 'active' | 'limited' | 'dead';
  endDate?: string;
  setId: string;
}

interface IDSet {
  id: string;
  name: string;
  color: string;
}

interface AccountsTableProps {
  accounts: Account[];
  idSets: IDSet[];
}

const AccountsTable: React.FC<AccountsTableProps> = ({ accounts, idSets }) => {
  const [visiblePasswords, setVisiblePasswords] = useState<{[key: number]: boolean}>({});
  
  const togglePasswordVisibility = (accountId: number) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  return (
    <div className="bg-[#1a2236] rounded-lg shadow mb-8">
      <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Accounts</h2>
        <button 
          onClick={() => {}} 
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
        >
          Need Help?
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Set</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sportsbook</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Account</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Username</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Password</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Start Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Balance</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Profit</th>
            </tr>
          </thead>
          <tbody className="bg-[#1a2236] divide-y divide-gray-700">
            {accounts.map((account) => {
              const set = idSets.find(s => s.id === account.setId);
              const setColor = set ? (set.color === 'blue' ? '#93c5fd' : '#86efac') : 'gray';
              const setBgColor = set ? (set.color === 'blue' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(22, 163, 74, 0.1)') : '';
              
              return (
                <tr 
                  key={account.id} 
                  className={account.status === 'dead' ? 'opacity-60' : ''}
                  style={{backgroundColor: account.id % 2 === 0 ? 'rgba(30, 41, 59, 0.3)' : ''}}
                >
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{account.sportsbook}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.accountName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="mr-2">
                        {visiblePasswords[account.id] ? 'password123' : account.password}
                      </span>
                      <button 
                        onClick={() => togglePasswordVisibility(account.id)}
                        className="text-gray-400 hover:text-white"
                        disabled={account.status === 'dead'}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          {visiblePasswords[account.id] ? (
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                          ) : (
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          )}
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      account.status === 'active' ? 'bg-green-100 text-green-800' : 
                      account.status === 'limited' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${account.balance.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-400">${account.profit.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountsTable;