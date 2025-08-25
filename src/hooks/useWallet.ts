/**
 * Custom hook for Web3 wallet management
 * @author Sajid Rajput
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { BrowserProvider, formatEther, JsonRpcSigner } from 'ethers';
import { WalletState, Transaction, SendTransactionParams, MetaMaskError } from '@/types/wallet';
import {
  isMetaMaskInstalled,
  getCurrentChainId,
  isSepoliaNetwork,
  switchToSepolia,
  ethToWei,
  validateAddress,
  validateEthAmount,
  handleMetaMaskError,
} from '@/utils/web3';

const initialWalletState: WalletState = {
  address: null,
  isConnected: false,
  isConnecting: false,
  chainId: null,
  balance: '0',
  provider: null,
  signer: null,
};

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>(initialWalletState);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Initialize provider and signer
   */
  const initializeProvider = useCallback(async (): Promise<{
    provider: BrowserProvider;
    signer: JsonRpcSigner;
  } | null> => {
    if (!window.ethereum) return null;

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      return { provider, signer };
    } catch (error) {
      console.error('Failed to initialize provider:', error);
      return null;
    }
  }, []);

  /**
   * Fetch wallet balance
   */
  const fetchBalance = useCallback(async (address: string, provider: BrowserProvider) => {
    try {
      const balance = await provider.getBalance(address);
      return formatEther(balance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      return '0';
    }
  }, []);

  /**
   * Connect to MetaMask wallet
   */
  const connectWallet = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setWalletState(prev => ({ ...prev, isConnecting: true }));
    setError(null);

    try {
      // Request account access
      const accounts = await window.ethereum!.request({
        method: 'eth_requestAccounts',
      }) as string[];

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const account = accounts[0];
      const providerAndSigner = await initializeProvider();

      if (!providerAndSigner) {
        throw new Error('Failed to initialize Web3 provider');
      }

      const { provider, signer } = providerAndSigner;
      const chainId = await getCurrentChainId(provider);

      // Check if on Sepolia network, if not, switch to it
      if (!isSepoliaNetwork(chainId)) {
        await switchToSepolia();
        // Re-fetch chain ID after switching
        const newChainId = await getCurrentChainId(provider);
        if (!isSepoliaNetwork(newChainId)) {
          throw new Error('Please switch to Sepolia testnet');
        }
      }

      const balance = await fetchBalance(account, provider);

      setWalletState({
        address: account,
        isConnected: true,
        isConnecting: false,
        chainId,
        balance,
        provider,
        signer,
      });
    } catch (error) {
      const metaMaskError = error as MetaMaskError;
      setError(handleMetaMaskError(metaMaskError));
      setWalletState(prev => ({ ...prev, isConnecting: false }));
    }
  }, [initializeProvider, fetchBalance]);

  /**
   * Disconnect wallet
   */
  const disconnectWallet = useCallback(() => {
    setWalletState(initialWalletState);
    setTransactions([]);
    setError(null);
  }, []);

  /**
   * Send ETH transaction
   */
  const sendTransaction = useCallback(async ({ to, amount }: SendTransactionParams) => {
    if (!walletState.isConnected || !walletState.signer || !walletState.provider) {
      throw new Error('Wallet not connected');
    }

    // Validate inputs
    if (!validateAddress(to)) {
      throw new Error('Invalid recipient address');
    }

    const amountValidation = validateEthAmount(amount);
    if (!amountValidation.isValid) {
      throw new Error(amountValidation.error);
    }

    setIsLoading(true);
    setError(null);

    try {
      const value = ethToWei(amount);
      
      // Send transaction
      const tx = await walletState.signer.sendTransaction({
        to,
        value,
      });

      // Add to transaction history immediately
      const newTransaction: Transaction = {
        hash: tx.hash,
        amount,
        timestamp: Date.now(),
        to,
        status: 'pending',
      };

      setTransactions(prev => [newTransaction, ...prev]);

        // Wait for confirmation and update status
        try {
          await tx.wait(1);
          setTransactions(prev =>
            prev.map(t =>
              t.hash === tx.hash ? { ...t, status: 'confirmed' as const } : t
            )
          );

          // Refresh balance after successful transaction
          if (walletState.address && walletState.provider) {
            const newBalance = await fetchBalance(walletState.address, walletState.provider);
            setWalletState(prev => ({ ...prev, balance: newBalance }));
          }
        } catch {
          // Transaction failed
          setTransactions(prev =>
            prev.map(t =>
              t.hash === tx.hash ? { ...t, status: 'failed' as const } : t
            )
          );
          throw new Error('Transaction failed during confirmation');
        }      return tx.hash;
    } catch (error) {
      const metaMaskError = error as MetaMaskError;
      const errorMessage = handleMetaMaskError(metaMaskError);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [walletState, fetchBalance]);

  /**
   * Refresh wallet balance
   */
  const refreshBalance = useCallback(async () => {
    if (!walletState.address || !walletState.provider) return;

    try {
      const balance = await fetchBalance(walletState.address, walletState.provider);
      setWalletState(prev => ({ ...prev, balance }));
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    }
  }, [walletState.address, walletState.provider, fetchBalance]);

  /**
   * Handle account changes
   */
  const handleAccountsChanged = useCallback((params: unknown) => {
    const accounts = params as string[];
    if (accounts.length === 0) {
      disconnectWallet();
    } else if (accounts[0] !== walletState.address) {
      // Account changed, reconnect
      connectWallet();
    }
  }, [walletState.address, disconnectWallet, connectWallet]);

  /**
   * Handle chain changes
   */
  const handleChainChanged = useCallback((params: unknown) => {
    const chainId = params as string;
    if (!isSepoliaNetwork(chainId)) {
      setError('Please switch to Sepolia testnet');
      setWalletState(prev => ({ ...prev, chainId }));
    } else {
      setError(null);
      setWalletState(prev => ({ ...prev, chainId }));
      refreshBalance();
    }
  }, [refreshBalance]);

  /**
   * Setup event listeners
   */
  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [handleAccountsChanged, handleChainChanged]);

  /**
   * Check for existing connection on mount
   */
  useEffect(() => {
    const checkConnection = async () => {
      if (!isMetaMaskInstalled()) return;

      try {
        const accounts = await window.ethereum!.request({
          method: 'eth_accounts',
        }) as string[];

        if (accounts.length > 0) {
          // Auto-connect if previously connected
          await connectWallet();
        }
      } catch (error) {
        console.error('Failed to check existing connection:', error);
      }
    };

    checkConnection();
  }, [connectWallet]);

  return {
    // Wallet state
    ...walletState,
    
    // Transaction history
    transactions,
    
    // Loading and error states
    isLoading,
    error,
    
    // Actions
    connectWallet,
    disconnectWallet,
    sendTransaction,
    refreshBalance,
    
    // Utilities
    clearError: () => setError(null),
  };
};
