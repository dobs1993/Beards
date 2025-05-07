"use client";

import { useState, useEffect } from 'react';

interface IDSet {
  id: string;
  name: string;
}

interface Account {
  id: number;
  sportsbook: string;
  accountName: string;
  status: string;
  setId: string;
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: {
    type: 'deposit' | 'withdrawal';
    amount: string;
    setId: string;
    sportsbook: string;
    accountName: string;
  }) => void;
  idSets: IDSet[];
  accounts: Account[];
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  idSets,
  accounts
}) => {
  const [transaction, setTransaction] = useState<{
    type: 'deposit' | 'withdrawal';
    amount: string;
    setId: string;
    sportsbook: string;
    accountName: string;
  }>({
    type: 'deposit',
    amount: '',
    setId: '',
    sportsbook: '',
    accountName: ''
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setTransaction({
        type: 'deposit',
        amount: '',
        setId: '',
        sportsbook: '',
        accountName: ''
      });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(transaction);
  };

  // Get sportsbooks for a specific ID set
  const getSportsbooksForSet = (setId: string) => {
    return [...new Set(accounts
      .filter(a => a.setId === setId && a.status !== 'dead')
      .map(a => a.sportsbook))];
  };
  
  // Get filtered list of accounts for the transaction dropdown
  const getAccountOptionsForSet = (setId: string, selectedSportsbook: string) => {
    return accounts
      .filter(account => 
        account.setId === setId && 
        account.sportsbook === selectedSportsbook && 
        account.status === 'active'
      )
      .map(account => ({ id: account.id, name: account.accountName }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a2236] rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">New Transaction</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Transaction Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="deposit"
                  checked={transaction.type === 'deposit'}
                  onChange={() => setTransaction({...transaction, type: 'deposit'})}
                  className="mr-2"
                />
                <span>Deposit</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="withdrawal"
                  checked={transaction.type === 'withdrawal'}
                  onChange={() => setTransaction({...transaction, type: 'withdrawal'})}
                  className="mr-2"
                />
                <span>Withdrawal</span>
              </label>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Amount</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={transaction.amount}
              onChange={(e) => setTransaction({...transaction, amount: e.target.value})}
              className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">ID Set</label>
            <select
              value={transaction.setId}
              onChange={(e) => {
                setTransaction({
                  ...transaction,
                  setId: e.target.value,
                  sportsbook: '',
                  accountName: ''
                });
              }}
              className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
              required
            >
              <option value="">Select an ID Set</option>
              {idSets.map(set => (
                <option key={set.id} value={set.id}>
                  {set.name}
                </option>
              ))}
            </select>
            {transaction.setId && (
              <div className="mt-1 text-sm text-yellow-400">
                Make sure you're using the correct KVM link for this set!
              </div>
            )}
          </div>
          
          {transaction.setId && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Sportsbook</label>
              <select
                value={transaction.sportsbook}
                onChange={(e) => {
                  setTransaction({
                    ...transaction, 
                    sportsbook: e.target.value,
                    accountName: '' // Reset account when sportsbook changes
                  })
                }}
                className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
                required
              >
                <option value="">Select a sportsbook</option>
                {getSportsbooksForSet(transaction.setId).map((sportsbook, index) => (
                  <option key={index} value={sportsbook}>
                    {sportsbook}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {transaction.setId && transaction.sportsbook && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Account</label>
              <select
                value={transaction.accountName}
                onChange={(e) => setTransaction({...transaction, accountName: e.target.value})}
                className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
                required
              >
                <option value="">Select an account</option>
                {getAccountOptionsForSet(transaction.setId, transaction.sportsbook).map(option => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;