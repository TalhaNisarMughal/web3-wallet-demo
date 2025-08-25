/**
 * Web3 Wallet Demo - Main Page
 * @author Sajid Rajput
 */

'use client';

import { useWallet } from '@/hooks/useWallet';
import { WalletConnection, SendTransaction, TransactionHistory, ErrorDisplay } from '@/components';

export default function Home() {
  const {
    address,
    isConnected,
    isConnecting,
    chainId,
    balance,
    transactions,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
    sendTransaction,
    refreshBalance,
    clearError,
  } = useWallet();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">Web3 Wallet Demo</h1>
              </div>
              <div className="ml-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Sepolia Testnet
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/TalhaNisarMughal/web3-wallet-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        <ErrorDisplay error={error} onClear={clearError} />

        {/* Hero Section */}
        {!isConnected && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Web3 Wallet Demo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A demonstration of Web3 wallet integration using MetaMask and ethers.js on the Sepolia testnet.
              Connect your wallet to start sending ETH transactions and tracking your transaction history.
            </p>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Wallet Connection */}
            <WalletConnection
              address={address}
              isConnected={isConnected}
              isConnecting={isConnecting}
              chainId={chainId}
              balance={balance}
              onConnect={connectWallet}
              onDisconnect={disconnectWallet}
              onRefreshBalance={refreshBalance}
            />

            {/* Send Transaction */}
            <SendTransaction
              onSendTransaction={sendTransaction}
              isLoading={isLoading}
              isConnected={isConnected}
              balance={balance}
            />
          </div>

          {/* Right Column */}
          <div>
            {/* Transaction History */}
            <TransactionHistory
              transactions={transactions}
              isConnected={isConnected}
            />
          </div>
        </div>

        {/* Features Section */}
        {!isConnected && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Features</h3>
              <p className="text-gray-600">
                This demo showcases enterprise-level Web3 integration capabilities
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure Wallet Connection</h4>
                <p className="text-gray-600">
                  Connect securely with MetaMask and automatically switch to Sepolia testnet
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Send ETH Transactions</h4>
                <p className="text-gray-600">
                  Send ETH to any address with built-in validation and error handling
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 6h6m-6 4h6" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Transaction History</h4>
                <p className="text-gray-600">
                  Track all transactions with real-time status updates and Etherscan links
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-600">
            <p>
              Built with ❤️ by{' '}
              <a
                href="https://github.com/TalhaNisarMughal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Sajid Rajput
              </a>
              {' '}using Next.js, TypeScript, ethers.js, and TailwindCSS
            </p>
            <p className="mt-2 text-sm">
              ⚠️ This is a demo application for educational purposes. Only use on Sepolia testnet.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
