"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TokenGenerator() {
  const [userType, setUserType] = useState('bettor');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    notes: ''
  });
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Function to generate secure random token
  const generateSecureToken = () => {
    // In a real implementation, you would use a secure method
    // This is just for illustration
    const randomBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randomBytes);
    return Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .substring(0, 32);
  };
  
  const generateLink = async () => {
    // Validate input
    if (!userData.name || !userData.email) {
      alert('Please fill in the required fields');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Generate a secure token
      const token = generateSecureToken();
      
      // In a real implementation, you would save this to your database
      // Example API call:
      /*
      const response = await fetch('/api/create-user-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userType,
          name: userData.name,
          email: userData.email,
          notes: userData.notes,
          token
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save token');
      }
      */
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine which route to use based on userType
      const route = userType === 'bettor' ? 'bettor-setup' : 'admin-login';
      
      // Generate link
      // In production, this would be your actual domain
      const baseUrl = window.location.origin;
      const link = `${baseUrl}/${route}?token=${token}`;
      
      setGeneratedLink(link);
    } catch (error) {
      console.error('Error generating link:', error);
      alert('Failed to generate link. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  
  return (
    <div className="bg-[#1a2236] rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Secure Access Link Generator
      </h2>
      
      <div className="mb-6">
        <label className="block text-gray-300 text-sm mb-2">User Type</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setUserType('bettor')}
            className={`py-2 px-4 rounded ${
              userType === 'bettor' 
                ? 'bg-green-500 text-white' 
                : 'bg-[#0f1729] text-gray-300 hover:bg-gray-800'
            } transition-colors duration-200`}
          >
            Bettor
          </button>
          <button
            type="button"
            onClick={() => setUserType('admin')}
            className={`py-2 px-4 rounded ${
              userType === 'admin' 
                ? 'bg-green-500 text-white' 
                : 'bg-[#0f1729] text-gray-300 hover:bg-gray-800'
            } transition-colors duration-200`}
          >
            Admin
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-400">
          {userType === 'bettor' 
            ? 'Generate a unique link for a bettor to set up their account and access dashboard.' 
            : 'Generate a link for admin access.'}
        </p>
      </div>
      
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="name" className="block text-gray-300 text-sm mb-2">Name *</label>
          <input
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            type="text"
            className="w-full px-3 py-2 bg-[#0f1729] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter user's name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-gray-300 text-sm mb-2">Email *</label>
          <input
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            type="email"
            className="w-full px-3 py-2 bg-[#0f1729] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter user's email"
            required
          />
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-gray-300 text-sm mb-2">Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={userData.notes}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 bg-[#0f1729] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Add any additional notes about this user"
          ></textarea>
        </div>
      </div>
      
      <div className="mb-6">
        <button
          type="button"
          onClick={generateLink}
          disabled={isGenerating}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
        >
          {isGenerating ? 'Generating...' : 'Generate Secure Link'}
        </button>
      </div>
      
      {generatedLink && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-300 text-sm mb-2">Secure access link generated:</p>
          <div className="flex">
            <input
              type="text"
              value={generatedLink}
              readOnly
              className="flex-1 px-3 py-2 bg-[#0f1729] text-white rounded-l focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r flex items-center"
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 00-.697 1.717L10.586 6H6a1 1 0 100 2h6a1 1 0 001-1V2a1 1 0 00-1-1H9z" />
                    <path fillRule="evenodd" d="M9 4a1 1 0 011-1h5a1 1 0 011 1v8a1 1 0 01-1 1h-5a1 1 0 01-1-1V4z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          
          <div className="mt-4 bg-yellow-900 bg-opacity-30 border border-yellow-800 rounded p-3">
            <p className="text-sm text-yellow-300">
              <span className="font-bold block mb-1">Security Notice:</span>
              This link contains a secure token that gives access to the user's account. Share it securely via encrypted email or messaging.
              {userType === 'bettor' && " The user will set up their credentials on first access."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}