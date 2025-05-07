"use client";

import React from 'react';

const FinancesSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Financial Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#1a2236] rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Income Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Deposits</span>
              <span className="font-medium">$15,240.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Withdrawals</span>
              <span className="font-medium">$8,750.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Net Balance</span>
              <span className="font-medium">$6,490.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Profit</span>
              <span className="font-medium text-green-500">$3,420.50</span>
            </div>
          </div>
        </div>
        
        <div className="bg-[#1a2236] rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Payout Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Player Cut (65%)</span>
              <span className="font-medium">$2,223.33</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Beard 50% Upfront</span>
              <span className="font-medium">$598.59</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Beard 50% Final</span>
              <span className="font-medium">$598.59</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Paid to Date</span>
              <span className="font-medium text-green-500">$2,821.92</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#1a2236] rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-xl font-bold">Recent Transactions</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <div className="flex items-start">
              <div className="bg-green-500 bg-opacity-20 p-2 rounded mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Deposit</p>
                <p className="text-sm text-gray-400">FanDuel - Ryker</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-green-500">+$1,000.00</p>
              <p className="text-xs text-gray-400">May 5, 2023</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <div className="flex items-start">
              <div className="bg-red-500 bg-opacity-20 p-2 rounded mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Withdrawal</p>
                <p className="text-sm text-gray-400">DraftKings - Mike</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-red-500">-$500.00</p>
              <p className="text-xs text-gray-400">May 4, 2023</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <div className="flex items-start">
              <div className="bg-blue-500 bg-opacity-20 p-2 rounded mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Payment to Beard</p>
                <p className="text-sm text-gray-400">John Smith - Upfront 50%</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-blue-500">-$350.00</p>
              <p className="text-xs text-gray-400">May 3, 2023</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-3">
            <div className="flex items-start">
              <div className="bg-purple-500 bg-opacity-20 p-2 rounded mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Payment to Player</p>
                <p className="text-sm text-gray-400">Ryker - 65% Cut</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-purple-500">-$780.00</p>
              <p className="text-xs text-gray-400">May 2, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancesSection;