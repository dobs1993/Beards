"use client";

import React, { useState } from 'react';

interface BeardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: BeardData) => void;
}

interface BeardData {
  name: string;
  email: string;
  paidUpfront: boolean;
  paidFinal: boolean;
}

const BeardModal: React.FC<BeardModalProps> = ({ isOpen, onClose, onSave }) => {
  const [beardData, setBeardData] = useState<BeardData>({
    name: '',
    email: '',
    paidUpfront: false,
    paidFinal: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBeardData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(beardData);
    setBeardData({ name: '', email: '', paidUpfront: false, paidFinal: false });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a2236] rounded-lg p-6 w-full max-w-md text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Beard</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Beard Name</label>
            <input
              type="text"
              name="name"
              value={beardData.name}
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
              value={beardData.email}
              onChange={handleChange}
              className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Payment Status</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="paidUpfront"
                  checked={beardData.paidUpfront}
                  onChange={handleChange}
                  id="paidUpfront"
                  className="mr-2"
                />
                <label htmlFor="paidUpfront">50% Upfront Paid</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="paidFinal"
                  checked={beardData.paidFinal}
                  onChange={handleChange}
                  id="paidFinal"
                  className="mr-2"
                />
                <label htmlFor="paidFinal">50% Final Paid</label>
              </div>
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
              Save Beard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeardModal;