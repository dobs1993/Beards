"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simple validation
      if (!email || !password) {
        throw new Error('Please provide both email and password');
      }
      
      // Mock login delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Redirect based on role
      switch (role) {
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'bettor':
          router.push('/bettor/dashboard');
          break;
        case 'beard':
          router.push('/beard/dashboard');
          break;
        default:
          router.push('/admin/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Determine which letter to show based on role
  const getLetter = () => {
    switch (role) {
      case 'admin':
        return 'A';
      case 'bettor':
        return 'B';
      case 'beard':
        return 'B';
      default:
        return 'A';
    }
  };

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
        <div className="w-24 h-24 rounded-full border-2 border-gray-700 bg-[#1a2236] flex items-center justify-center">
          <span className="text-white text-5xl font-bold">
            {getLetter()}
          </span>
        </div>
      </div>
      
      {/* Main content */}
      <div className="w-full max-w-md px-6 z-10">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Admin Login</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Select Role</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-2 px-4 rounded ${
                  role === 'admin' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-[#1a2236] text-gray-300'
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => setRole('bettor')}
                className={`py-2 px-4 rounded ${
                  role === 'bettor' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-[#1a2236] text-gray-300'
                }`}
              >
                Bettor
              </button>
              <button
                type="button"
                onClick={() => setRole('beard')}
                className={`py-2 px-4 rounded ${
                  role === 'beard' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-[#1a2236] text-gray-300'
                }`}
              >
                Beard
              </button>
            </div>
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-[#1a2236] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
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
          
          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
          
          {/* Forgot Password */}
          <div className="text-center">
            <button 
              type="button"
              className="text-gray-400 hover:text-white text-sm"
            >
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}