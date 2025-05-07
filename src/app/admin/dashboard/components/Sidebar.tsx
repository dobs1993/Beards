"use client";

import React from 'react';

// Dashboard sections
export type Section = 'overview' | 'players' | 'beards' | 'sportsbooks' | 'finances' | 'kvm';

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="w-64 bg-[#1a2236] text-white h-full">
      <nav className="mt-5 px-2">
        <button
          className={`w-full flex items-center px-4 py-3 rounded-md mb-1 ${activeSection === 'overview' ? 'bg-[#0f1729] text-white' : 'text-gray-300 hover:bg-[#0f1729]'}`}
          onClick={() => setActiveSection('overview')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Overview
        </button>
        <button
          className={`w-full flex items-center px-4 py-3 rounded-md mb-1 ${activeSection === 'players' ? 'bg-[#0f1729] text-white' : 'text-gray-300 hover:bg-[#0f1729]'}`}
          onClick={() => setActiveSection('players')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          Bettors
        </button>
        <button
          className={`w-full flex items-center px-4 py-3 rounded-md mb-1 ${activeSection === 'beards' ? 'bg-[#0f1729] text-white' : 'text-gray-300 hover:bg-[#0f1729]'}`}
          onClick={() => setActiveSection('beards')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          Beards
        </button>
        <button
          className={`w-full flex items-center px-4 py-3 rounded-md mb-1 ${activeSection === 'sportsbooks' ? 'bg-[#0f1729] text-white' : 'text-gray-300 hover:bg-[#0f1729]'}`}
          onClick={() => setActiveSection('sportsbooks')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
          </svg>
          Sportsbooks
        </button>
        <button
          className={`w-full flex items-center px-4 py-3 rounded-md mb-1 ${activeSection === 'finances' ? 'bg-[#0f1729] text-white' : 'text-gray-300 hover:bg-[#0f1729]'}`}
          onClick={() => setActiveSection('finances')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Finances
        </button>
        <button
          className={`w-full flex items-center px-4 py-3 rounded-md mb-1 ${activeSection === 'kvm' ? 'bg-[#0f1729] text-white' : 'text-gray-300 hover:bg-[#0f1729]'}`}
          onClick={() => setActiveSection('kvm')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
          </svg>
          KVM Access
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;