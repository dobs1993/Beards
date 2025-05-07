"use client";

import { useState } from 'react';
import Header from './components/Header';
import Sidebar, { Section } from './components/Sidebar';
import BettorsSection from './components/BettorsSection';
import RecentActivity from './components/RecentActivity';
import SportsbookDistribution from './components/SportsbookDistribution';
import SportsbooksSection from './components/SportsbooksSection';
import FinancesSection from './components/FinancesSection';
import KVMSection from './components/KVMSection';
import BeardModal from './components/BeardModal';
import TokenGenerator from './components/TokenGenerator';

// Interface definitions
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
  token?: string; // New field to store the token
}

interface Sportsbook {
  id: number;
  name: string;
  color: string;
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [activeTab, setActiveTab] = useState('overview');
  const [showTokenGenerator, setShowTokenGenerator] = useState(false);
  const [showBeardModal, setShowBeardModal] = useState(false);
  const [showNewBeardForm, setShowNewBeardForm] = useState(false);
  
  // Data state
  const [bettors, setBettors] = useState<Bettor[]>([
    { id: 1, name: 'Ryker', email: 'ryker@example.com', beard: 'John Smith', accounts: 5, profit: 3420.50, status: 'active' },
    { id: 2, name: 'Mike Jones', email: 'mike@example.com', beard: 'David Brown', accounts: 3, profit: 1250.75, status: 'active' },
    { id: 3, name: 'Sarah Williams', email: 'sarah@example.com', beard: 'John Smith', accounts: 4, profit: 2100.25, status: 'inactive' },
  ]);
  
  const [beards, setBeards] = useState<Beard[]>([
    { id: 1, name: 'John Smith', email: 'john@example.com', players: 2, accounts: 9, paidUpfront: true, paidFinal: false },
    { id: 2, name: 'David Brown', email: 'david@example.com', players: 1, accounts: 3, paidUpfront: true, paidFinal: true },
    { id: 3, name: 'Lisa Johnson', email: 'lisa@example.com', players: 0, accounts: 0, paidUpfront: false, paidFinal: false },
  ]);
  
  const [sportsbooks, setSportsbooks] = useState<Sportsbook[]>([
    { id: 1, name: 'Bet365', color: 'bg-green-500' },
    { id: 2, name: 'DK', color: 'bg-teal-500' },
    { id: 3, name: 'FanDuel', color: 'bg-blue-500' },
    { id: 4, name: 'BetMGM', color: 'bg-purple-500' },
    { id: 5, name: 'BetRivers', color: 'bg-orange-500' },
    { id: 6, name: 'Caesars', color: 'bg-yellow-500' },
    { id: 7, name: 'PointsBet', color: 'bg-red-500' },
    { id: 8, name: '888Sport', color: 'bg-pink-500' },
  ]);
  
  // Stats
  const stats = {
    totalBeards: beards.length,
    activeBettors: bettors.filter(b => b.status === 'active').length,
    pendingAccounts: 5,
    pendingPayouts: 8,
    totalProfitMTD: bettors.reduce((sum, bettor) => sum + bettor.profit, 0),
  };
  
  // Handler for adding a new bettor
  const handleAddBettor = (bettorData: any) => {
    const newBettor = {
      id: bettors.length ? Math.max(...bettors.map(b => b.id)) + 1 : 1,
      accounts: 0,
      profit: 0,
      ...bettorData
    };
    setBettors([...bettors, newBettor]);
  };

  // Handler for adding a new beard
  const handleAddBeard = (beardData: any) => {
    // Create a new beard object
    const newBeard = {
      id: beards.length ? Math.max(...beards.map(b => b.id)) + 1 : 1,
      name: beardData.name,
      email: beardData.email,
      players: 0,
      accounts: 0,
      paidUpfront: false,
      paidFinal: false,
      token: beardData.token // Store the token
    };
    
    // Update the beards array with the new beard
    setBeards(prevBeards => [...prevBeards, newBeard]);
    
    // Add to recent activity (you would implement this if you have recent activity tracking)
    // For now, we'll just log it
    console.log(`New beard created: ${beardData.name}`);
  };
  
  // Toggle functions
  const toggleBeardModal = () => {
    setShowBeardModal(!showBeardModal);
  };
  
  const toggleTokenGenerator = () => {
    setShowTokenGenerator(!showTokenGenerator);
  };
  
  const toggleNewBeardForm = () => {
    setShowNewBeardForm(!showNewBeardForm);
  };
  
  return (
    <div className="min-h-screen bg-[#0f1729] text-white">
      <Header />
      
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <main className="flex-1 overflow-y-auto bg-[#0f1729]">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
            <div className="bg-[#1a2236] rounded-lg shadow p-4">
              <h3 className="text-gray-400 text-sm">Total Beards</h3>
              <p className="text-2xl font-bold mt-1">{stats.totalBeards}</p>
              <div className="text-green-400 text-xs mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                +{beards.length > 3 ? beards.length - 3 : 0} this week
              </div>
            </div>
            
            <div className="bg-[#1a2236] rounded-lg shadow p-4">
              <h3 className="text-gray-400 text-sm">Active Bettors</h3>
              <p className="text-2xl font-bold mt-1">{stats.activeBettors}</p>
              <div className="text-green-400 text-xs mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                +2 this week
              </div>
            </div>
            
            <div className="bg-[#1a2236] rounded-lg shadow p-4">
              <h3 className="text-gray-400 text-sm">Pending Accounts</h3>
              <p className="text-2xl font-bold mt-1">{stats.pendingAccounts}</p>
              <div className="text-yellow-400 text-xs mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
                Needs attention
              </div>
            </div>
            
            <div className="bg-[#1a2236] rounded-lg shadow p-4">
              <h3 className="text-gray-400 text-sm">Pending Payouts</h3>
              <p className="text-2xl font-bold mt-1">{stats.pendingPayouts}</p>
              <div className="text-orange-400 text-xs mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Due this week
              </div>
            </div>
            
            <div className="bg-[#1a2236] rounded-lg shadow p-4">
              <h3 className="text-gray-400 text-sm">Profit (MTD)</h3>
              <p className="text-2xl font-bold mt-1">${stats.totalProfitMTD.toLocaleString()}</p>
              <div className="text-green-400 text-xs mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                +18% from last month
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-800 mx-4">
            <div className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 font-medium border-b-2 ${
                  activeTab === 'overview'
                    ? 'text-blue-500 border-blue-500'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('beards')}
                className={`px-6 py-3 font-medium border-b-2 ${
                  activeTab === 'beards'
                    ? 'text-blue-500 border-blue-500'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                Beard Accounts
              </button>
              <button
                onClick={() => setActiveTab('bettors')}
                className={`px-6 py-3 font-medium border-b-2 ${
                  activeTab === 'bettors'
                    ? 'text-blue-500 border-blue-500'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                Bettor Accounts
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="bg-[#1a2236] rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6">Dashboard Overview</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-lg font-medium mb-3 border-b border-gray-700 pb-2">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-green-500 p-2 rounded-full mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">New beard account created</p>
                          <p className="text-sm text-gray-400">Michael Johnson registered as a new beard</p>
                          <p className="text-xs text-gray-500 mt-1">Today, 10:23 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-500 p-2 rounded-full mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Payment processed</p>
                          <p className="text-sm text-gray-400">Initial payment sent to Sarah Wilson</p>
                          <p className="text-xs text-gray-500 mt-1">Yesterday, 3:45 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-purple-500 p-2 rounded-full mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Account verification complete</p>
                          <p className="text-sm text-gray-400">Alex James verified all account credentials</p>
                          <p className="text-xs text-gray-500 mt-1">May 5, 2025, 11:20 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pending Tasks & Quick Stats */}
                  <div>
                    <h3 className="text-lg font-medium mb-3 border-b border-gray-700 pb-2">Pending Tasks</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-gray-800 bg-opacity-50 p-3 rounded">
                        <div className="flex items-center">
                          <div className="bg-yellow-500 p-1 rounded mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>Review new beard applications (5)</span>
                        </div>
                        <button className="text-sm bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">
                          View
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between bg-gray-800 bg-opacity-50 p-3 rounded">
                        <div className="flex items-center">
                          <div className="bg-red-500 p-1 rounded mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>Process pending payouts (8)</span>
                        </div>
                        <button className="text-sm bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">
                          View
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between bg-gray-800 bg-opacity-50 p-3 rounded">
                        <div className="flex items-center">
                          <div className="bg-blue-500 p-1 rounded mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                          </div>
                          <span>Generate new bettor access links (3)</span>
                        </div>
                        <button 
                          className="text-sm bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                          onClick={() => {
                            setActiveTab('bettors');
                            setShowTokenGenerator(true);
                          }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3 border-b border-gray-700 pb-2">Quick Stats</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Conversion Rate:</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Active Accounts:</span>
                          <span className="font-medium">42</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Avg. Earnings Per Beard:</span>
                          <span className="font-medium">$1,650</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Total Accounts Value:</span>
                          <span className="font-medium">$46,200</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sportsbook Distribution */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3 border-b border-gray-700 pb-2">Sportsbook Distribution</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                    {sportsbooks.map(book => (
                      <div key={book.id} className="flex flex-col items-center">
                        <div className={`w-16 h-16 ${book.color} rounded-lg flex items-center justify-center mb-2`}>
                          <span className="text-2xl font-bold text-white">
                            {book.name.substring(0, 2)}
                          </span>
                        </div>
                        <span className="text-sm font-medium">{book.name}</span>
                        <span className="text-xs text-gray-400">3 accounts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Beard Accounts Tab */}
            {activeTab === 'beards' && (
              <div className="bg-[#1a2236] rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Beard Accounts</h2>
                  <button
                    onClick={toggleBeardModal}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Beard
                  </button>
                </div>
                
                <h3 className="text-lg font-medium mb-3">Beard Management</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Players</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Accounts</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Payment Status</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {beards.map((beard) => (
                        <tr key={beard.id} className="hover:bg-gray-800">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center mr-3 text-lg font-medium">
                                {beard.name.charAt(0)}
                              </div>
                              <span className="font-medium">{beard.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">{beard.email}</td>
                          <td className="px-4 py-4 whitespace-nowrap">{beard.players}</td>
                          <td className="px-4 py-4 whitespace-nowrap">{beard.accounts}</td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center">
                                <span className={`h-2 w-2 rounded-full ${beard.paidUpfront ? 'bg-green-500' : 'bg-gray-500'} mr-2`}></span>
                                <span className="text-sm">50% Upfront</span>
                              </div>
                              <div className="flex items-center">
                                <span className={`h-2 w-2 rounded-full ${beard.paidFinal ? 'bg-green-500' : 'bg-gray-500'} mr-2`}></span>
                                <span className="text-sm">50% Final</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right">
                            <button className="text-blue-400 hover:text-blue-300 mx-1">Edit</button>
                            <button className="text-blue-400 hover:text-blue-300 mx-1">View</button>
                            {beard.token && (
                              <button 
                                className="text-purple-400 hover:text-purple-300 mx-1"
                                onClick={() => {
                                  // Copy link to clipboard
                                  const link = `${window.location.origin}/beard?token=${beard.token}`;
                                  navigator.clipboard.writeText(link);
                                  alert("Beard link copied to clipboard");
                                }}
                                title="Copy invitation link"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                </svg>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Bettors Tab */}
            {activeTab === 'bettors' && (
              <div className="bg-[#1a2236] rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Bettor Accounts</h2>
                  <button
                    onClick={toggleTokenGenerator}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Generate Access Link
                  </button>
                </div>
                
                {showTokenGenerator && (
                  <div className="mb-6">
                    <TokenGenerator />
                  </div>
                )}
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Assigned Beard</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Accounts</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Profit</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {bettors.map((bettor) => (
                        <tr key={bettor.id} className="hover:bg-gray-800">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center mr-3 text-lg font-medium">
                                {bettor.name.charAt(0)}
                              </div>
                              <span className="font-medium">{bettor.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">{bettor.email}</td>
                          <td className="px-4 py-4 whitespace-nowrap">{bettor.beard}</td>
                          <td className="px-4 py-4 whitespace-nowrap">{bettor.accounts}</td>
                          <td className="px-4 py-4 whitespace-nowrap">${bettor.profit.toFixed(2)}</td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              bettor.status === 'active' 
                                ? 'bg-green-900 text-green-300' 
                                : 'bg-red-900 text-red-300'
                            }`}>
                              {bettor.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right">
                            <button className="text-blue-400 hover:text-blue-300 mx-1">Edit</button>
                            <button className="text-blue-400 hover:text-blue-300 mx-1">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* BeardModal Component */}
      <BeardModal 
        isOpen={showBeardModal}
        onClose={toggleBeardModal}
        onAddBeard={handleAddBeard}
      />
    </div>
  );
}