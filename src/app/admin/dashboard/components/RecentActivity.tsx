"use client";

import React from 'react';

interface ActivityItem {
  id: number;
  type: 'deposit' | 'withdrawal' | 'assignment';
  title: string;
  description: string;
  timestamp: string;
}

const RecentActivity: React.FC = () => {
  // Sample activity data
  const activities: ActivityItem[] = [
    {
      id: 1,
      type: 'deposit',
      title: 'New Deposit',
      description: 'Ryker added $1,000 to FanDuel account',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'withdrawal',
      title: 'Withdrawal Initiated',
      description: 'Mike withdrew $500 from DraftKings',
      timestamp: 'Yesterday'
    },
    {
      id: 3,
      type: 'assignment',
      title: 'New Beard Assigned',
      description: 'John Smith assigned to Ryker',
      timestamp: '2 days ago'
    }
  ];

  // Get appropriate icon and color for activity type
  const getActivityStyles = (type: string) => {
    switch(type) {
      case 'deposit':
        return {
          bgColor: 'bg-green-500',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )
        };
      case 'withdrawal':
        return {
          bgColor: 'bg-red-500',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          )
        };
      case 'assignment':
        return {
          bgColor: 'bg-blue-500',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )
        };
      default:
        return {
          bgColor: 'bg-gray-500',
          icon: null
        };
    }
  };

  return (
    <div className="bg-[#1a2236] rounded-lg shadow p-6 mb-8">
      <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const { bgColor, icon } = getActivityStyles(activity.type);
          
          return (
            <div key={activity.id} className="flex items-start">
              <div className={`p-2 ${bgColor} bg-opacity-20 rounded-md mr-4`}>
                {icon}
              </div>
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-gray-400">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;