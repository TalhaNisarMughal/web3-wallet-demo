/**
 * Send transaction component
 * @author Sajid Rajput
 */

'use client';

import { useState } from 'react';
import { validateAddress, validateEthAmount } from '@/utils/web3';

interface SendTransactionProps {
  onSendTransaction: (params: { to: string; amount: string }) => Promise<string>;
  isLoading: boolean;
  isConnected: boolean;
  balance: string;
}

export const SendTransaction: React.FC<SendTransactionProps> = ({
  onSendTransaction,
  isLoading,
  isConnected,
  balance,
}) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState<{ recipient?: string; amount?: string }>({});
  const [txHash, setTxHash] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: { recipient?: string; amount?: string } = {};

    // Validate recipient address
    if (!recipient.trim()) {
      newErrors.recipient = 'Recipient address is required';
    } else if (!validateAddress(recipient)) {
      newErrors.recipient = 'Invalid Ethereum address';
    }

    // Validate amount
    if (!amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else {
      const amountValidation = validateEthAmount(amount);
      if (!amountValidation.isValid) {
        newErrors.amount = amountValidation.error;
      } else {
        // Check if user has enough balance
        const numAmount = parseFloat(amount);
        const numBalance = parseFloat(balance);
        if (numAmount > numBalance) {
          newErrors.amount = 'Insufficient balance';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setTxHash(null);
      const hash = await onSendTransaction({ to: recipient, amount });
      setTxHash(hash);
      
      // Clear form on success
      setRecipient('');
      setAmount('');
      setErrors({});
    } catch (error) {
      // Error is handled by the parent component
      console.error('Transaction failed:', error);
    }
  };

  const handleMaxClick = () => {
    // Leave some ETH for gas fees (approximate)
    const maxAmount = Math.max(0, parseFloat(balance) - 0.002);
    setAmount(maxAmount.toFixed(6));
    setErrors(prev => ({ ...prev, amount: undefined }));
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Wallet Not Connected</h3>
          <p className="text-gray-600">Connect your wallet to send transactions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Send ETH</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipient Address */}
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => {
              setRecipient(e.target.value);
              setErrors(prev => ({ ...prev, recipient: undefined }));
            }}
            className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.recipient ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="0x742d35Cc6634C0532925a3b8D0F447ED2D8C4"
            disabled={isLoading}
          />
          {errors.recipient && (
            <p className="mt-1 text-sm text-red-600">{errors.recipient}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount (ETH)
          </label>
          <div className="relative">
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setErrors(prev => ({ ...prev, amount: undefined }));
              }}
              className={`w-full px-3 py-2 pr-16 border rounded-md shadow-sm placeholder-gray-400 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.amount ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="0.001"
              step="0.000001"
              min="0"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleMaxClick}
              className="absolute inset-y-0 right-0 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
              disabled={isLoading}
            >
              MAX
            </button>
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
          )}
          <p className="mt-1 text-sm text-gray-600">
            Available: {parseFloat(balance).toFixed(6)} ETH
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !recipient || !amount}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? (
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
              Sending Transaction...
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Send Transaction
            </>
          )}
        </button>
      </form>

      {/* Success Message */}
      {txHash && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
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
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Transaction Submitted Successfully!
              </h3>
              <div className="mt-1 text-sm text-green-700">
                <p>Your transaction has been submitted to the network.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
