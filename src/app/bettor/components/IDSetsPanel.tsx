"use client";

interface IDSet {
  id: string;
  name: string;
  kvmLink: string;
  color: string;
  dateIssued: string;
}

interface IDSetsPanelProps {
  idSets: IDSet[];
  activeSetId: string;
  setActiveSetId: (id: string) => void;
  getSportsbooksForSet: (setId: string) => string[];
}

const IDSetsPanel: React.FC<IDSetsPanelProps> = ({ 
  idSets, 
  activeSetId, 
  setActiveSetId,
  getSportsbooksForSet
}) => {
  return (
    <div className="bg-[#1a2236] rounded-lg shadow mb-8">
      <div className="px-6 py-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Your ID Sets</h2>
        <p className="text-sm text-gray-400 mt-1">
          IMPORTANT: Always use the correct KVM link for each set. Do NOT mix accounts from different sets.
        </p>
      </div>
      <div className="p-6">
        <div className="mb-6 flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveSetId('all')}
            className={`px-4 py-2 rounded-md ${activeSetId === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Show All Sets
          </button>
          {idSets.map(set => (
            <button 
              key={set.id} 
              onClick={() => setActiveSetId(set.id)}
              className={`px-4 py-2 rounded-md ${activeSetId === set.id ? `bg-${set.color}-600 text-white` : 'bg-gray-700 text-gray-300'}`}
              style={{backgroundColor: activeSetId === set.id ? (set.color === 'blue' ? '#2563eb' : '#16a34a') : ''}}
            >
              {set.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {idSets.map(set => (
            <div 
              key={set.id} 
              className={`rounded-lg p-5 ${activeSetId !== 'all' && activeSetId !== set.id ? 'opacity-50' : ''}`}
              style={{backgroundColor: set.color === 'blue' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(22, 163, 74, 0.1)', 
                      borderLeft: `4px solid ${set.color === 'blue' ? '#2563eb' : '#16a34a'}`}}
            >
              <h3 className="text-lg font-semibold mb-2">{set.name}</h3>
              <div className="mb-3">
                <span className="text-gray-400 text-sm">Date Issued: </span>
                <span>{set.dateIssued}</span>
              </div>
              <div className="mb-3">
                <span className="text-gray-400 text-sm">KVM/Tailscale Link: </span>
                <div className="flex items-center mt-1">
                  <input 
                    type="text" 
                    readOnly
                    value={set.kvmLink} 
                    className="flex-1 bg-[#0f1729] border border-gray-700 rounded-l px-3 py-1 text-white text-sm"
                  />
                  <button 
                    className={`bg-${set.color}-500 hover:bg-${set.color}-600 text-white px-3 py-1 rounded-r text-sm`}
                    style={{backgroundColor: set.color === 'blue' ? '#3b82f6' : '#22c55e'}}
                    onClick={() => {
                      navigator.clipboard.writeText(set.kvmLink);
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Sportsbooks in this set: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {getSportsbooksForSet(set.id).map((sportsbook, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                      {sportsbook}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IDSetsPanel;