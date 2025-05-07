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

interface SportsbooksSectionProps {
  sportsbooks: Sportsbook[];
}

const SportsbooksSection: React.FC<SportsbooksSectionProps> = ({ sportsbooks }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Sportsbook Management</h2>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Sportsbook
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sportsbooks.map(book => (
          <div key={book.id} className="bg-[#1a2236] rounded-lg shadow overflow-hidden">
            <div className={`${book.color} h-2 w-full`}></div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{book.name}</h3>
                <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">3 accounts</div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Total Balance:</span>
                  <span className="font-medium">$8,245.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Total Profit:</span>
                  <span className="font-medium">$1,123.75</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Status:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                </div>
              </div>
              <div className="mt-6 flex space-x-2">
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded text-sm">View Details</button>
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded text-sm">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsbooksSection;