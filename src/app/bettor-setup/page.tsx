"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BettorSetup() {
  const router = useRouter();
  
  // Get token from URL parameter
  const [token, setToken] = useState('');
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  
  // User credentials
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Get token from URL on page load
  useEffect(() => {
    // In a real implementation, you'd use router.query.token
    // For this example, we'll simulate checking the URL
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    
    if (urlToken) {
      setToken(urlToken);
      // Simulate token validation
      validateToken(urlToken);
    } else {
      setTokenChecked(true);
      setError('Invalid access. Please use the link provided to you.');
    }
  }, []);
  
  // Validate token (in a real implementation, this would call your API)
  const validateToken = async (tokenToCheck) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to validate token
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, let's assume the token is valid
      // In a real app, you would check against your database
      setTokenValid(true);
    } catch (err) {
      setError('Invalid or expired link. Please contact support.');
      setTokenValid(false);
    } finally {
      setTokenChecked(true);
      setIsLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Validate passwords match
    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      // Simple validation
      if (!credentials.username || !credentials.email || !credentials.password) {
        throw new Error('Please fill out all required fields');
      }
      
      // In a real app, you would make an API call here to create the account
      // Example API call:
      /*
      const response = await fetch('/api/setup-bettor-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          username: credentials.username,
          email: credentials.email,
          password: credentials.password
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create account');
      }
      */
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // If successful, redirect to the dashboard
      router.push(`/bettor/dashboard?token=${token}`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Account creation failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Show loading state while checking token
  if (!tokenChecked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f1729]">
        <div className="w-16 h-16 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-white">Validating your access...</p>
      </div>
    );
  }
  
  // Show error if token is invalid
  if (!tokenValid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f1729] px-4">
        <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">Access Error</h1>
        <p className="text-gray-300 text-center mb-6">{error}</p>
        <p className="text-gray-400 text-center text-sm">If you believe this is a mistake, please contact the administrator.</p>
      </div>
    );
  }
  
  // Main setup form
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f1729] relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 opacity-10">
        {/* Horizontal grid lines */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={`h-${i}`} 
            className="absolute w-full h-px bg-gray-500"
            style={{ top: `${i * 5}%` }}
          />
        ))}
        
        {/* Vertical grid lines */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={`v-${i}`} 
            className="absolute h-full w-px bg-gray-500"
            style={{ left: `${i * 5}%` }}
          />
        ))}
      </div>
      
      {/* Simple Letter Logo */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full border-2 border-gray-700 bg-[#1a2236] flex items-center justify-center">
          <span className="text-white text-4xl font-bold">B</span>
        </div>
      </div>
      
      {/* Main content */}
      <div className="w-full max-w-md px-6 z-10">
        <h1 className="text-2xl font-bold text-white text-center mb-2">Create Your Account</h1>
        <p className="text-gray-400 text-center mb-6">Set up your credentials for future access</p>
        
        {error && (
          <div className="bg-red-900 border border-red-800 text-white px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-gray-300 text-sm mb-2">Username</label>
            <input
              id="username"
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full px-3 py-2 bg-[#1a2236] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Choose a username"
              required
            />
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              className="w-full px-3 py-2 bg-[#1a2236] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>
          
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-300 text-sm mb-2">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-3 py-2 bg-[#1a2236] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Create a password"
                required
              />
              <button 
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 focus:outline-none"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-300 text-sm mb-2">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={credentials.confirmPassword}
                onChange={(e) => setCredentials({...credentials, confirmPassword: e.target.value})}
                className="w-full px-3 py-2 bg-[#1a2236] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>
          
          {/* Password requirements */}
          <div className="text-xs text-gray-400 space-y-1">
            <p>Password requirements:</p>
            <ul className="list-disc list-inside pl-2">
              <li>At least 8 characters long</li>
              <li>Contains at least one uppercase letter</li>
              <li>Contains at least one number</li>
              <li>Contains at least one special character</li>
            </ul>
          </div>
          
          {/* Important Notice */}
          <div className="bg-blue-900 bg-opacity-30 border border-blue-800 rounded p-3">
            <p className="text-sm text-blue-300">
              <span className="font-bold block mb-1">Important:</span>
              Save your login details securely. You'll need them every time you access your dashboard through your unique link.
            </p>
          </div>
          
          {/* Create Account Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>
      </div>
    </div>
  );
}