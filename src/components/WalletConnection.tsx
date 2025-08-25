/**
 * Wallet connection component
 * @author Sajid Rajput
 */

'use client';

import { formatAddress } from '@/utils/web3';
import { SEPOLIA_NETWORK } from '@/constants';

interface WalletConnectionProps {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: string | null;
  balance: string;
  onConnect: () => void;
  onDisconnect: () => void;
  onRefreshBalance: () => void;
}

export const WalletConnection: React.FC<WalletConnectionProps> = ({
  address,
  isConnected,
  isConnecting,
  chainId,
  balance,
  onConnect,
  onDisconnect,
  onRefreshBalance,
}) => {
  const isOnSepolia = chainId === SEPOLIA_NETWORK.chainId;

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-6">
              Connect your MetaMask wallet to start using the Web3 Wallet Demo
            </p>
          </div>
          
          <button
            onClick={onConnect}
            disabled={isConnecting}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isConnecting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Connecting...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Connect MetaMask
              </>
            )}
          </button>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>Make sure you have MetaMask installed and are on the Sepolia testnet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Wallet Connected</h2>
        <button
          onClick={onDisconnect}
          className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200"
        >
          Disconnect
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Address */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <div>
            <label className="text-sm font-medium text-gray-700">Address</label>
            <p className="text-sm text-gray-900 font-mono">{formatAddress(address!)}</p>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        
        {/* Network */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <div>
            <label className="text-sm font-medium text-gray-700">Network</label>
            <p className={`text-sm font-medium ${isOnSepolia ? 'text-green-600' : 'text-red-600'}`}>
              {isOnSepolia ? SEPOLIA_NETWORK.name : 'Wrong Network'}
            </p>
          </div>
          {!isOnSepolia && (
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </div>
        
        {/* Balance */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">Balance</label>
            <p className="text-lg font-bold text-gray-900">{parseFloat(balance).toFixed(6)} ETH</p>
          </div>
          <button
            onClick={onRefreshBalance}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            title="Refresh balance"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
        
        {!isOnSepolia && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
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
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Wrong Network Detected
                </h3>
                <div className="mt-1 text-sm text-red-700">
                  <p>Please switch to Sepolia testnet to use this application.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
