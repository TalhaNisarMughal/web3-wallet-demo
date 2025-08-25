/**
 * Transaction history component
 * @author Sajid Rajput
 */

'use client';

import { Transaction } from '@/types/wallet';
import { formatAddress, getEtherscanUrl, formatTimestamp } from '@/utils/web3';

interface TransactionHistoryProps {
  transactions: Transaction[];
  isConnected: boolean;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  isConnected,
}) => {
  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return (
          <svg
            className="animate-spin h-4 w-4 text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        );
      case 'confirmed':
        return (
          <svg
            className="h-4 w-4 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'failed':
        return (
          <svg
            className="h-4 w-4 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  const getStatusText = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'failed':
        return 'Failed';
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-700 bg-yellow-100';
      case 'confirmed':
        return 'text-green-700 bg-green-100';
      case 'failed':
        return 'text-red-700 bg-red-100';
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="text-center">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Transaction History</h3>
          <p className="text-gray-600">Connect your wallet to view transaction history</p>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Transaction History</h2>
        <div className="text-center py-8">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 6h6m-6 4h6"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Transactions Yet</h3>
          <p className="text-gray-600">Your transaction history will appear here after you send your first transaction</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Transaction History</h2>
      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.hash}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon(transaction.status)}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    transaction.status
                  )}`}
                >
                  {getStatusText(transaction.status)}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {formatTimestamp(transaction.timestamp)}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <label className="block text-gray-600 font-medium mb-1">To</label>
                <p className="font-mono text-gray-900">{formatAddress(transaction.to)}</p>
              </div>
              
              <div>
                <label className="block text-gray-600 font-medium mb-1">Amount</label>
                <p className="font-bold text-gray-900">{transaction.amount} ETH</p>
              </div>
              
              <div>
                <label className="block text-gray-600 font-medium mb-1">Transaction Hash</label>
                <a
                  href={getEtherscanUrl(transaction.hash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center space-x-1"
                  title="View on Sepolia Etherscan"
                >
                  <span>{formatAddress(transaction.hash)}</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {transactions.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};
