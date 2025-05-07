"use client";

import { useState } from 'react';

interface BeardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBeard: (beardData: { 
    name: string; 
    email: string; 
    token: string;
    paidUpfront: boolean;
    paidFinal: boolean;
    players: number;
    accounts: number;
  }) => void;
}

export default function BeardModal({ isOpen, onClose, onAddBeard }: BeardModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showLinkCopy, setShowLinkCopy] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Generate a secure random token
      const tokenBytes = new Uint8Array(16);
      window.crypto.getRandomValues(tokenBytes);
      const token = Array.from(tokenBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .substring(0, 24); // Shortened for readability
      
      // Create the full link
      const baseUrl = window.location.origin;
      const link = `${baseUrl}/beard?token=${token}`;
      setGeneratedLink(link);
      
      // Show the link copy screen
      setShowLinkCopy(true);
      
      // Add beard to the admin dashboard
      onAddBeard({
        name: formData.name,
        email: formData.email,
        token: token,
        paidUpfront: false,
        paidFinal: false,
        players: 0,
        accounts: 0
      });
      
    } catch (error) {
      console.error('Error creating beard account:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    if (!navigator.clipboard) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generatedLink;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
      
      document.body.removeChild(textArea);
      return;
    }
    
    // Modern browsers
    navigator.clipboard.writeText(generatedLink)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy link:', err);
      });
  };
  
  const handleClose = () => {
    // Reset form state when closing
    setFormData({ name: '', email: '' });
    setShowLinkCopy(false);
    setGeneratedLink('');
    setLinkCopied(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#1a2236] rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Add Beard</h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {!showLinkCopy ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-white mb-2">Beard Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#0f1729] border border-gray-700 rounded text-white"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block text-white mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#0f1729] border border-gray-700 rounded text-white"
                placeholder="Optional"
              />
              <p className="text-xs text-gray-400 mt-1">
                You will need to manually share the generated link with the beard
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !formData.name}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Save Beard'}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-4">
              <p className="text-white mb-2">
                Beard account created successfully!
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Copy the link below to share with the beard:
              </p>
              
              <div className="flex">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="flex-1 px-3 py-2 bg-[#0f1729] border border-gray-700 rounded-l text-white text-sm break-all"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r flex items-center"
                >
                  {linkCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            
            <div className="bg-blue-900 bg-opacity-30 p-4 rounded border border-blue-800 mb-6">
              <p className="text-sm text-blue-300">
                <strong>Instructions:</strong> Send this link to the beard. When they access it, they'll be able to provide their payment details and information about sportsbook accounts they can manage.
              </p>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}