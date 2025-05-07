"use client";

import React, { useState } from 'react';
import BettorModal from '@/app/admin/dashboard/components/BettorModal';

interface Bettor {
  id: number;
  name: string;
  email: string;
  beard: string;
  accounts: number;
  profit: number;
  status: string;
}

interface Beard {
  id: number;
  name: string;
  email: string;
  players: number;
  accounts: number;
  paidUpfront: boolean;
  paidFinal: boolean;
}

interface BettorsSectionProps {
  bettors: Bettor[];
  beards: Beard[];
  onAddBettor: (bettor: any) => void;
}

const BettorsSection: React.FC<BettorsSectionProps> = ({ bettors, beards, onAddBettor }) => {
  const [isBettorModalOpen, setIsBettorModalOpen] = useState(false);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Bettor Management</h2>
        <button 
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
          onClick={() => setIsBettorModalOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Bettor
        </button>
      </div>
      
      <div className="bg-[#1a2236] rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Assigned Beard</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Accounts</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Profit</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#1a2236] divide-y divide-gray-700">
            {bettors.map((bettor) => (
              <tr key={bettor.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-lg font-medium text-white">{bettor.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">{bettor.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{bettor.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{bettor.beard}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{bettor.accounts}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${bettor.profit.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bettor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {bettor.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  <button className="text-indigo-400 hover:text-indigo-300 mr-3">Edit</button>
                  <button className="text-indigo-400 hover:text-indigo-300">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Bettor Modal */}
      <BettorModal 
        isOpen={isBettorModalOpen}
        onClose={() => setIsBettorModalOpen(false)}
        onSave={onAddBettor}
        beardOptions={beards.map(beard => ({ id: beard.id, name: beard.name }))}
      />
    </div>
  );
};

export default BettorsSection;