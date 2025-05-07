"use client";

import React from 'react';

const KVMSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">KVM Access Management</h2>
      
      <div className="bg-[#1a2236] rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-xl font-bold">Access Links</h3>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold">Ryker's Access</h4>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
            </div>
            <div className="flex items-center">
              <input 
                type="text" 
                value="http://192.168.1.221:3000/kvm/ryker" 
                disabled
                className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-l border border-gray-700"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r">Copy</button>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              Last accessed: May 5, 2023 at 2:34 PM
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold">Mike's Access</h4>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
            </div>
            <div className="flex items-center">
              <input 
                type="text" 
                value="http://192.168.1.221:3000/kvm/mike" 
                disabled
                className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-l border border-gray-700"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r">Copy</button>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              Last accessed: May 4, 2023 at 5:12 PM
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold">Sarah's Access</h4>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Inactive</span>
            </div>
            <div className="flex items-center">
              <input 
                type="text" 
                value="http://192.168.1.221:3000/kvm/sarah" 
                disabled
                className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-l border border-gray-700"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r">Copy</button>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              Last accessed: April 28, 2023 at 10:23 AM
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-[#1a2236] rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-xl font-bold">Create New Access</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Select Player</label>
              <select className="w-full bg-gray-800 border border-gray-700 rounded py-2 px-3 text-white">
                <option>Select a player...</option>
                <option>Ryker</option>
                <option>Mike Jones</option>
                <option>Sarah Williams</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Access Duration</label>
              <select className="w-full bg-gray-800 border border-gray-700 rounded py-2 px-3 text-white">
                <option>24 hours</option>
                <option>48 hours</option>
                <option>1 week</option>
                <option>1 month</option>
                <option>Permanent</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Restrictions</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="view_only" className="mr-2" />
                  <label htmlFor="view_only">View Only</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="limited_hours" className="mr-2" />
                  <label htmlFor="limited_hours">Limited Hours (9AM - 5PM)</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="ip_restriction" className="mr-2" />
                  <label htmlFor="ip_restriction">IP Restriction</label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
              Generate Access Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KVMSection;