"use client";

import React from 'react';

interface Sportsbook {
  id: number;
  name: string;
  color: string;
  accounts?: number;
  balance?: number;
  profit?: number;
  status?: string;
}

const SportsbookDistribution: React.FC = () => {
  // Sample sportsbook data
  const sportsbooks: Sportsbook[] = [
    { id: 1, name: 'Bet365', color: 'bg-green-500', accounts: 3, balance: 1520.25, profit: 300.75, status: 'active' },
    { id: 2, name: 'DK', color: 'bg-teal-500', accounts: 3, balance: 2340.50, profit: 450.25, status: 'active' },
    { id: 3, name: 'FanDuel', color: 'bg-blue-500', accounts: 3, balance: 1890.75, profit: 210.50, status: 'active' },
    { id: 4, name: 'BetMGM', color: 'bg-purple-500', accounts: 3, balance: 1750.30, profit: 125.80, status: 'active' },
    { id: 5, name: 'BetRivers', color: 'bg-orange-500', accounts: 3, balance: 980.45, profit: 95.20, status: 'active' },
    { id: 6, name: 'Caesars', color: 'bg-yellow-500', accounts: 3, balance: 1260.80, profit: 180.50, status: 'active' },
    { id: 7, name: 'PointsBet', color: 'bg-red-500', accounts: 3, balance: 850.60, profit: 75.30, status: 'active' },
    { id: 8, name: '888Sport', color: 'bg-pink-500', accounts: 3, balance: 720.35, profit: 85.45, status: 'active' },
  ];

  return (
    <div className="bg-[#1a2236] rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4">Sportsbook Distribution</h3>
      <div className="flex justify-between flex-wrap gap-4">
        {sportsbooks.map(book => (
          <div key={book.id} className="flex flex-col items-center">
            <div className={`w-16 h-16 ${book.color} rounded-lg flex items-center justify-center`}>
              <span className="text-2xl font-bold text-white">{book.name.substring(0, 2)}</span>
            </div>
            <span className="text-sm mt-2">{book.name}</span>
            <span className="text-xs text-gray-400">{book.accounts} accounts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsbookDistribution;