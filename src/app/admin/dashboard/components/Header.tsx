"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const router = useRouter();
  
  return (
    <header className="bg-[#1a2236] shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#1a2236] border-2 border-gray-700 flex items-center justify-center mr-3">
            <span className="text-white text-xl font-bold">A</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        </div>
        <button 
          onClick={() => router.push('/login')}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded flex items-center text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 00-1 1v6a1 1 0 002 0V9a1 1 0 00-1-1z" clipRule="evenodd" />
            <path d="M14 7V5.586l-2-2H5a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V7h-2z" />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;