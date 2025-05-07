"use client";

import React, { useState } from 'react';

interface BettorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: BettorData) => void;
  beardOptions: { id: number; name: string }[];
}

interface BettorData {
  name: string;
  email: string;
  beard: string;
  status: 'active' | 'inactive';
}

const BettorModal: React.FC<BettorModalProps> = ({ isOpen, onClose, onSave, beardOptions }) => {
  const [bettorData, setBettorData] = useState<BettorData>({
    name: '',
    email: '',
    beard: '',
    status: 'active'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBettorData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(bettorData);
    setBettorData({ name: '', email: '', beard: '', status: 'active' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a2236] rounded-lg p-6 w-full max-w-md text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Bettor</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Bettor Name</label>
            <input
              type="text"
              name="name"
              value={bettorData.name}
              onChange={handleChange}
              className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={bettorData.email}
              onChange={handleChange}
              className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Assigned Beard</label>
            <select
              name="beard"
              value={bettorData.beard}
              onChange={handleChange}
              className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
              required
            >
              <option value="">Select a beard...</option>
              {beardOptions.map(beard => (
                <option key={beard.id} value={beard.name}>
                  {beard.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Status</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={bettorData.status === 'active'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Active</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={bettorData.status === 'inactive'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Inactive</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Bettor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BettorModal;