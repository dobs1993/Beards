"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BeardForm() {
  const router = useRouter();
  
  const [beardInfo, setBeardInfo] = useState({
    name: '',
    email: '',
    phone: '',
    digitalSignature: '',
  });
  
  const [paypalInfo, setPaypalInfo] = useState({
    email: '',
    name: '',
    username: '',
    password: '',
  });
  
  // For adding multiple sportsbook accounts
  const [sportsbooks, setSportsbooks] = useState([
    { id: 1, name: '', username: '', password: '' }
  ]);
  
  const [submitted, setSubmitted] = useState(false);
  const [showInfoSheet, setShowInfoSheet] = useState(false);
  const [earnings, setEarnings] = useState({
    paypal: 600,
    sportsbooks: {
      'Bet365': 200,
      'TheScore': 200,
      'BetMGM': 200,
      'Betano': 200,
      'DraftKings': 200,
      'FanDuel': 200,
      'BetRivers': 200,
      'Other': 200
    }
  });
  
  // Calculate sportsbook earnings
  const calculateSportsbookEarnings = () => {
    let total = 0;
    
    sportsbooks.forEach(sb => {
      if (sb.name) {
        if (earnings.sportsbooks[sb.name]) {
          total += earnings.sportsbooks[sb.name];
        } else {
          total += earnings.sportsbooks['Other'];
        }
      }
    });
    
    return total;
  };
  
  // Calculate total earnings
  const calculateTotalEarnings = () => {
    return earnings.paypal + calculateSportsbookEarnings();
  };
  
  // Handle beard info changes
  const handleBeardInfoChange = (e) => {
    const { name, value } = e.target;
    setBeardInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle PayPal info changes
  const handlePaypalInfoChange = (e) => {
    const { name, value } = e.target;
    setPaypalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle sportsbook info changes
  const handleSportsbookChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSportsbooks = [...sportsbooks];
    updatedSportsbooks[index] = {
      ...updatedSportsbooks[index],
      [name]: value
    };
    setSportsbooks(updatedSportsbooks);
  };
  
  // Add a new sportsbook entry
  const addSportsbook = () => {
    setSportsbooks([
      ...sportsbooks,
      { id: sportsbooks.length + 1, name: '', username: '', password: '' }
    ]);
  };
  
  // Remove a sportsbook entry
  const removeSportsbook = (index) => {
    if (sportsbooks.length === 1) return; // Don't remove the last one
    const updatedSportsbooks = sportsbooks.filter((_, i) => i !== index);
    setSportsbooks(updatedSportsbooks);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send this data to your backend
    console.log('Form submitted:', {
      beardInfo,
      paypalInfo,
      sportsbooks,
      totalEarnings: calculateTotalEarnings()
    });
    
    // In a real application you would handle API calls here
    // For now, just show success message
    setSubmitted(true);
    
    // You could redirect to a success page or login page after a delay
    // setTimeout(() => router.push('/success'), 3000);
  };
  
  // Toggle info sheet visibility
  const toggleInfoSheet = () => {
    setShowInfoSheet(!showInfoSheet);
  };
  
  // List of available sportsbooks
  const availableSportsbooks = [
    'Bet365',
    'TheScore',
    'BetMGM',
    'Betano',
    'DraftKings',
    'FanDuel',
    'BetRivers',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-[#0f1729] text-white">
      {/* Header */}
      <header className="bg-[#1a2236] shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#1a2236] border-2 border-gray-700 flex items-center justify-center mr-3">
              <span className="text-white text-xl font-bold">B</span>
            </div>
            <h1 className="text-2xl font-bold">Betting Partner Setup</h1>
          </div>
          <button 
            onClick={toggleInfoSheet}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
          >
            View Info Sheet
          </button>
        </div>
      </header>
      
      {/* Info Sheet Modal */}
      {showInfoSheet && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2236] rounded-lg shadow-lg p-6 max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">🎯 Betting Partner Setup — Info Sheet</h2>
              <button 
                onClick={toggleInfoSheet}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg">Hi! Below are the details to help get everything set up for our partnership. This quick process allows you to earn <strong>$2,000 today</strong> for about 1–2 hours of work — no experience required.</p>
              
              <h3 className="text-xl font-bold mt-6">✅ Accounts to Set Up</h3>
              <p>Please create accounts on the following platforms using your real name and ID. Once complete, you'll send us the logins — <strong>you don't fund anything, we handle all deposits.</strong></p>
              
              <table className="w-full border-collapse mt-2">
                <thead>
                  <tr className="bg-[#0f1729]">
                    <th className="border border-gray-700 px-4 py-2 text-left">Platform</th>
                    <th className="border border-gray-700 px-4 py-2 text-right">Payout to You</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2">Bet365</td>
                    <td className="border border-gray-700 px-4 py-2 text-right">$200</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2">The Score</td>
                    <td className="border border-gray-700 px-4 py-2 text-right">$200</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2">MGM</td>
                    <td className="border border-gray-700 px-4 py-2 text-right">$200</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2">Betano</td>
                    <td className="border border-gray-700 px-4 py-2 text-right">$200</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2">DraftKings</td>
                    <td className="border border-gray-700 px-4 py-2 text-right">$200</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2">Fanduel</td>
                    <td className="border border-gray-700 px-4 py-2 text-right">$200</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2">Betrivers</td>
                    <td className="border border-gray-700 px-4 py-2 text-right">$200</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-700 px-4 py-2"><strong>PayPal</strong> (with your bank card attached, not used)</td>
                    <td className="border border-gray-700 px-4 py-2 text-right">$600</td>
                  </tr>
                  <tr className="bg-green-900 font-bold">
                    <td className="border border-gray-700 px-4 py-2">TOTAL EARNABLE TODAY:</td>
                    <td className="border border-gray-700 px-4 py-2 text-right">$2,000</td>
                  </tr>
                </tbody>
              </table>
              
              <h3 className="text-xl font-bold mt-6">🔐 Important Notes</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>If you've already created any of these accounts (or they are limited), just skip that one.</li>
                <li>Most sportsbooks will ask for ID during setup — this is normal.</li>
                <li>Your job is done after the accounts + PayPal are created and verified — you will <strong>not be asked to place bets or manage anything.</strong></li>
              </ul>
              
              <h3 className="text-xl font-bold mt-6">💸 Why PayPal?</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>It allows us to move money instantly between accounts — <strong>you never touch the money.</strong></li>
                <li>We send funds from <strong>our PayPal</strong> to the new one you create — you don't deposit anything yourself.</li>
                <li>The only reason we ask for your bank card is that PayPal needs it to verify the account. We <strong>do not</strong> use it.</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-6">🧾 How You Get Paid</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>50% of your total ($1,000)</strong> is paid once your accounts are verified and working.</li>
                <li>The <strong>remaining 50% ($1,000)</strong> is paid after the accounts run cleanly through the full betting cycle (2–4 months).</li>
              </ul>
            </div>
            
            <button 
              onClick={toggleInfoSheet}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
            >
              Close Info Sheet
            </button>
          </div>
        </div>
      )}
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success message */}
        {submitted ? (
          <div className="bg-green-500 rounded-lg shadow p-6 mb-8 text-center">
            <svg className="w-16 h-16 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-bold mb-2">Information Submitted Successfully!</h2>
            <p className="text-lg">Thank you for providing your account information. Our team will review it shortly.</p>
            <p className="mt-4">You will receive your initial payment of <strong>${calculateTotalEarnings() / 2}</strong> once your accounts are verified.</p>
            <p className="mt-2">The remaining <strong>${calculateTotalEarnings() / 2}</strong> will be paid after the accounts run through the full betting cycle (2-4 months).</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Earnings Summary */}
            <div className="bg-green-900 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Your Earnings
              </h2>
              
              <div className="flex justify-between mb-4">
                <div>
                  <p>PayPal Account Setup:</p>
                  <p>Sportsbook Accounts: <span className="text-sm">({sportsbooks.filter(sb => sb.name).length})</span></p>
                  <p className="font-bold text-xl mt-2">Total Earnings:</p>
                </div>
                <div className="text-right">
                  <p>${earnings.paypal}</p>
                  <p>${calculateSportsbookEarnings()}</p>
                  <p className="font-bold text-xl mt-2 text-green-400">${calculateTotalEarnings()}</p>
                </div>
              </div>
              
              <div className="mt-2 bg-black bg-opacity-30 p-3 rounded-lg">
                <p className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>You'll receive <strong>50% (${calculateTotalEarnings() / 2})</strong> once accounts are verified and the remaining <strong>50% (${calculateTotalEarnings() / 2})</strong> after the accounts run through the full betting cycle (2-4 months).</span>
                </p>
              </div>
            </div>
            
            {/* Beard Personal Information */}
            <div className="bg-[#1a2236] rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={beardInfo.name}
                    onChange={handleBeardInfoChange}
                    className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={beardInfo.email}
                    onChange={handleBeardInfoChange}
                    className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={beardInfo.phone}
                    onChange={handleBeardInfoChange}
                    className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* PayPal Information */}
            <div className="bg-[#1a2236] rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <svg className="h-6 w-6 mr-2 text-blue-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
                </svg>
                PayPal Information ($600)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">PayPal Email</label>
                  <input
                    type="email"
                    name="email"
                    value={paypalInfo.email}
                    onChange={handlePaypalInfoChange}
                    className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name on PayPal Account 
                    <span className="text-red-400 ml-1 font-normal">(must match sportsbook name)</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={paypalInfo.name}
                    onChange={handlePaypalInfoChange}
                    className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">PayPal Username</label>
                  <input
                    type="text"
                    name="username"
                    value={paypalInfo.username}
                    onChange={handlePaypalInfoChange}
                    className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">PayPal Password</label>
                  <input
                    type="password"
                    name="password"
                    value={paypalInfo.password}
                    onChange={handlePaypalInfoChange}
                    className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-4 bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-400 mb-2">Important Note</h3>
                <p className="text-sm text-white">
                  You must have a bank account attached to your PayPal account so we can move our own funds in and out of sportsbook accounts. We will not interact with your attached bank account. If you prefer, you can create a new bank account quickly at places like Presidents Choice specifically for this purpose.
                </p>
              </div>
            </div>
            
            {/* Sportsbook Accounts */}
            <div className="bg-[#1a2236] rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <svg className="h-6 w-6 mr-2 text-green-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" />
                  </svg>
                  Sportsbook Accounts ($200 each)
                </h2>
                <button
                  type="button"
                  onClick={addSportsbook}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm flex items-center"
                >
                  <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Account
                </button>
              </div>
              
              <div className="space-y-6">
                {sportsbooks.map((sportsbook, index) => (
                  <div key={sportsbook.id} className="p-4 border border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">
                        Sportsbook #{index + 1} 
                        {sportsbook.name && <span className="ml-2 text-green-400">(+$200)</span>}
                      </h3>
                      {sportsbooks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSportsbook(index)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Sportsbook</label>
                        <select
                          name="name"
                          value={sportsbook.name}
                          onChange={(e) => handleSportsbookChange(index, e)}
                          className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
                          required
                        >
                          <option value="">Select a sportsbook</option>
                          {availableSportsbooks.map((name) => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                        <input
                          type="text"
                          name="username"
                          value={sportsbook.username}
                          onChange={(e) => handleSportsbookChange(index, e)}
                          className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input
                          type="password"
                          name="password"
                          value={sportsbook.password}
                          onChange={(e) => handleSportsbookChange(index, e)}
                          className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-gray-400">
                <p>Please provide details for all sportsbook accounts you have created. Add as many as needed.</p>
              </div>
            </div>
            
            {/* Disclaimer and Submit */}
            <div className="bg-[#1a2236] rounded-lg shadow p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Terms & Agreement</h2>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-4">
                  <p className="text-sm text-gray-300 mb-2">
                    By replying "Yes, I agree" you confirm that you:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                    <li>Created the accounts truthfully and are the legal owner</li>
                    <li>Will not log back into any of these accounts once created unless specifically directed to do so</li>
                    <li>Understand that 50% of payment will be made once accounts are verified, and the remaining 50% after accounts run through the full betting cycle (2-4 months)</li>
                    <li>Have provided accurate account details and understand these will be used for agreed-upon purposes only</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Digital Signature (Type "Yes, I agree" followed by your full name)</label>
                <input
                  type="text"
                  name="digitalSignature"
                  value={beardInfo.digitalSignature}
                  onChange={handleBeardInfoChange}
                  placeholder="Yes, I agree - John Smith"
                  className="w-full bg-[#0f1729] border border-gray-700 rounded px-3 py-2 text-white"
                  required
                />
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="agreement"
                  required
                  className="mr-2"
                />
                <label htmlFor="agreement" className="text-sm">
                  I understand that I will not log back into these accounts unless specifically directed to do so
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded font-medium"
              >
                Submit Account Information
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}