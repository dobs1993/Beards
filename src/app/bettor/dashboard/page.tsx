"use client";

import { useState } from 'react';
import BettorHeader from '../components/BettorHeader';
import ProfitSummary from '../components/ProfitSummary';
import IDSetsPanel from '../components/IDSetsPanel';
import AccountsTable from '../components/AccountsTable';
import SportsbookMetrics from '../components/SportsbookMetrics';
import TransactionsTable from '../components/TransactionsTable';
import TransactionModal from '../components/TransactionModal';

// Types for data
interface Account {
  id: number;
  sportsbook: string;
  accountName: string;
  username: string;
  password: string;
  balance: number;
  profit: number;
  startDate: string;
  status: 'active' | 'limited' | 'dead';
  endDate?: string;
  setId: string; // Which ID set this account belongs to
}

interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal';
  amount: number;
  sportsbook: string;
  accountName: string;
  date: string;
  status: 'completed' | 'pending';
  setId: string; // Which ID set this transaction is for
}

// New interface for ID Sets
interface IDSet {
  id: string;
  name: string;
  kvmLink: string;
  color: string; // For visual distinction
  dateIssued: string;
}

interface SportsbookMetric {
  sportsbook: string;
  totalDeposits: number;
  totalWithdrawals: number;
  totalProfit: number;
  accountCount: number;
  averageLifespan: number;
  activeAccounts: number;
}

export default function BettorDashboard() {
  // Mock data - would be fetched from API in real implementation
  const [userData] = useState({
    name: 'Sportz',
    email: 'sportz@example.com',
    beard: 'John Smith',
    totalProfit: 3420.50,
    profitShare: 65, // Percentage the bettor receives
    pendingPayment: 780.25,
    lastPaid: '04/28/2023',
  });
  
  // ID Sets that have been assigned to this bettor
  const [idSets] = useState<IDSet[]>([
    { 
      id: 'set1', 
      name: 'Set 1 - Primary', 
      kvmLink: 'tailscale.example.com/kvm/sportz-set1',
      color: 'blue',
      dateIssued: '12/01/2022' 
    },
    { 
      id: 'set2', 
      name: 'Set 2 - Secondary', 
      kvmLink: 'tailscale.example.com/kvm/sportz-set2',
      color: 'green',
      dateIssued: '03/01/2023' 
    }
  ]);
  
  // Accounts organized by ID sets
  const [accounts, setAccounts] = useState<Account[]>([
    // Set 1 accounts
    { id: 1, sportsbook: 'FanDuel', accountName: 'FanDuel 1', username: 'sportz_fd1', password: '•••••••••••', balance: 1250.75, profit: 420.50, startDate: '01/15/2023', status: 'active', setId: 'set1' },
    { id: 2, sportsbook: 'DraftKings', accountName: 'DraftKings 1', username: 'sportz_dk1', password: '•••••••••••', balance: 850.25, profit: 215.75, startDate: '03/01/2023', status: 'active', setId: 'set1' },
    { id: 3, sportsbook: 'BetMGM', accountName: 'BetMGM 1', username: 'sportz_mgm1', password: '•••••••••••', balance: 1100.50, profit: 325.00, startDate: '02/15/2023', status: 'limited', setId: 'set1' },
    { id: 4, sportsbook: 'Caesars', accountName: 'Caesars 1', username: 'sportz_csr1', password: '•••••••••••', balance: 2200.00, profit: 560.25, startDate: '01/05/2023', status: 'active', setId: 'set1' },
    { id: 5, sportsbook: 'PayPal', accountName: 'PayPal 1', username: 'sportz_pp1', password: '•••••••••••', balance: 3500.00, profit: 0, startDate: '01/05/2023', status: 'active', setId: 'set1' },
    
    // Set 2 accounts
    { id: 6, sportsbook: 'FanDuel', accountName: 'FanDuel 2', username: 'sportz_fd2', password: '•••••••••••', balance: 980.50, profit: 310.25, startDate: '03/03/2023', status: 'active', setId: 'set2' },
    { id: 7, sportsbook: 'FanDuel', accountName: 'FanDuel 3', username: 'sportz_fd3', password: '•••••••••••', balance: 0, profit: 1200.75, startDate: '12/10/2022', status: 'dead', endDate: '01/25/2023', setId: 'set2' },
    { id: 8, sportsbook: 'PointsBet', accountName: 'PointsBet 1', username: 'sportz_pb1', password: '•••••••••••', balance: 950.00, profit: 180.00, startDate: '03/10/2023', status: 'active', setId: 'set2' },
    { id: 9, sportsbook: 'BetRivers', accountName: 'BetRivers 1', username: 'sportz_br1', password: '•••••••••••', balance: 750.00, profit: 120.00, startDate: '03/15/2023', status: 'active', setId: 'set2' },
    { id: 10, sportsbook: 'PayPal', accountName: 'PayPal 2', username: 'sportz_pp2', password: '•••••••••••', balance: 2800.00, profit: 0, startDate: '03/01/2023', status: 'active', setId: 'set2' },
  ]);
  
  // Transaction history
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: 'deposit', amount: 1000.00, sportsbook: 'FanDuel', accountName: 'FanDuel 1', date: '05/05/2023', status: 'completed', setId: 'set1' },
    { id: 2, type: 'withdrawal', amount: 500.00, sportsbook: 'DraftKings', accountName: 'DraftKings 1', date: '05/02/2023', status: 'completed', setId: 'set1' },
    { id: 3, type: 'deposit', amount: 750.00, sportsbook: 'BetMGM', accountName: 'BetMGM 1', date: '04/28/2023', status: 'completed', setId: 'set1' },
    { id: 4, type: 'withdrawal', amount: 300.00, sportsbook: 'Caesars', accountName: 'Caesars 1', date: '04/25/2023', status: 'completed', setId: 'set1' },
    { id: 5, type: 'deposit', amount: 500.00, sportsbook: 'PointsBet', accountName: 'PointsBet 1', date: '04/20/2023', status: 'completed', setId: 'set2' },
    { id: 6, type: 'deposit', amount: 1000.00, sportsbook: 'FanDuel', accountName: 'FanDuel 2', date: '04/15/2023', status: 'completed', setId: 'set2' },
    { id: 7, type: 'withdrawal', amount: 2500.00, sportsbook: 'FanDuel', accountName: 'FanDuel 3', date: '01/20/2023', status: 'completed', setId: 'set2' },
    { id: 8, type: 'deposit', amount: 1500.00, sportsbook: 'FanDuel', accountName: 'FanDuel 3', date: '12/15/2022', status: 'completed', setId: 'set2' },
  ]);
  
  // Active ID set for filtering
  const [activeSetId, setActiveSetId] = useState<string>('all');
  
  // State for the new transaction modal
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  
  // Calculate lifetime metrics for each sportsbook
  const calculateSportsbookMetrics = (): SportsbookMetric[] => {
    // Get unique sportsbooks
    const uniqueSportsbooks = [...new Set(accounts.map(account => account.sportsbook))];
    
    return uniqueSportsbooks.map(sportsbook => {
      // Get all accounts for this sportsbook
      const sportsbookAccounts = accounts.filter(a => a.sportsbook === sportsbook);
      
      // Get all transactions for this sportsbook
      const sportsbookTransactions = transactions.filter(t => t.sportsbook === sportsbook);
      
      // Calculate deposits and withdrawals
      const deposits = sportsbookTransactions
        .filter(t => t.type === 'deposit')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const withdrawals = sportsbookTransactions
        .filter(t => t.type === 'withdrawal')
        .reduce((sum, t) => sum + t.amount, 0);
      
      // Calculate total profit
      const totalProfit = sportsbookAccounts.reduce((sum, account) => sum + account.profit, 0);
      
      // Calculate average lifespan
      const lifespans = sportsbookAccounts.map(account => {
        const start = new Date(account.startDate);
        const end = account.status === 'dead' && account.endDate 
          ? new Date(account.endDate) 
          : new Date();
        return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)); // days
      });
      
      const totalLifespan = lifespans.reduce((sum, days) => sum + days, 0);
      const averageLifespan = sportsbookAccounts.length > 0 
        ? Math.round(totalLifespan / sportsbookAccounts.length) 
        : 0;
      
      // Count active accounts
      const activeAccounts = sportsbookAccounts.filter(a => a.status === 'active').length;
      
      return {
        sportsbook,
        totalDeposits: deposits,
        totalWithdrawals: withdrawals,
        totalProfit,
        accountCount: sportsbookAccounts.length,
        averageLifespan,
        activeAccounts
      };
    });
  };
  
  // Get metrics data
  const sportsbookMetrics = calculateSportsbookMetrics();
  
  // Handle new transaction
  const handleNewTransaction = (transactionData: any) => {
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      type: transactionData.type,
      amount: parseFloat(transactionData.amount),
      sportsbook: transactionData.sportsbook,
      accountName: transactionData.accountName,
      date: new Date().toLocaleDateString('en-US'),
      status: 'pending',
      setId: transactionData.setId
    };
    
    setTransactions([newTransaction, ...transactions]);
    setIsTransactionModalOpen(false);
  };
  
  // Get filtered accounts based on active set
  const filteredAccounts = activeSetId === 'all' 
    ? accounts 
    : accounts.filter(account => account.setId === activeSetId);
  
  // Get filtered transactions based on active set
  const filteredTransactions = activeSetId === 'all'
    ? transactions
    : transactions.filter(tx => tx.setId === activeSetId);
  
  // Get sportsbooks for a specific ID set
  const getSportsbooksForSet = (setId: string) => {
    return [...new Set(accounts
      .filter(a => a.setId === setId && a.status !== 'dead')
      .map(a => a.sportsbook))];
  };

  return (
    <div className="min-h-screen bg-[#0f1729] text-white">
      <BettorHeader userName={userData.name} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfitSummary userData={userData} />
        
        <IDSetsPanel 
          idSets={idSets} 
          activeSetId={activeSetId} 
          setActiveSetId={setActiveSetId}
          getSportsbooksForSet={getSportsbooksForSet}
        />
        
        <AccountsTable 
          accounts={filteredAccounts}
          idSets={idSets}
        />
        
        <SportsbookMetrics metrics={sportsbookMetrics} />
        
        <TransactionsTable 
          transactions={filteredTransactions}
          idSets={idSets}
          onNewTransaction={() => setIsTransactionModalOpen(true)}
        />
      </main>
      
      {/* Transaction Modal */}
      <TransactionModal 
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onSubmit={handleNewTransaction}
        idSets={idSets}
        accounts={accounts}
      />
    </div>
  );
}