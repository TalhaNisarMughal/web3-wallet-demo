/**
 * Web3 utility functions
 * @author Sajid Rajput
 */

import { BrowserProvider, formatEther, parseEther, isAddress } from 'ethers';
import { SEPOLIA_NETWORK, METAMASK_ERROR_CODES } from '@/constants';
import { MetaMaskError } from '@/types/wallet';

/**
 * Checks if MetaMask is installed
 */
export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== 'undefined' && !!window.ethereum?.isMetaMask;
};

/**
 * Formats wallet address for display (shortened)
 */
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Formats ETH balance for display
 */
export const formatEthBalance = (balance: string): string => {
  const formattedBalance = parseFloat(formatEther(balance));
  return formattedBalance.toFixed(6);
};

/**
 * Validates Ethereum address
 */
export const validateAddress = (address: string): boolean => {
  return isAddress(address);
};

/**
 * Validates ETH amount
 */
export const validateEthAmount = (amount: string): { isValid: boolean; error?: string } => {
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount) || numAmount <= 0) {
    return { isValid: false, error: 'Amount must be a positive number' };
  }
  
  if (numAmount < 0.000001) {
    return { isValid: false, error: 'Amount too small (minimum 0.000001 ETH)' };
  }
  
  if (numAmount > 10) {
    return { isValid: false, error: 'Amount too large (maximum 10 ETH for safety)' };
  }
  
  return { isValid: true };
};

/**
 * Converts ETH amount to Wei
 */
export const ethToWei = (amount: string): bigint => {
  return parseEther(amount);
};

/**
 * Gets the current network chain ID
 */
export const getCurrentChainId = async (provider: BrowserProvider): Promise<string> => {
  const network = await provider.getNetwork();
  return `0x${network.chainId.toString(16)}`;
};

/**
 * Checks if connected to Sepolia network
 */
export const isSepoliaNetwork = (chainId: string): boolean => {
  return chainId === SEPOLIA_NETWORK.chainId;
};

/**
 * Switches to Sepolia network
 */
export const switchToSepolia = async (): Promise<void> => {
  if (!window.ethereum) {
    throw new Error('MetaMask not found');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: SEPOLIA_NETWORK.chainId }],
    });
  } catch (error) {
    const metaMaskError = error as MetaMaskError;
    
    // If network doesn't exist, add it
    if (metaMaskError.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: SEPOLIA_NETWORK.chainId,
            chainName: SEPOLIA_NETWORK.name,
            rpcUrls: [SEPOLIA_NETWORK.rpcUrl],
            blockExplorerUrls: [SEPOLIA_NETWORK.blockExplorerUrl],
            nativeCurrency: {
              name: 'SepoliaETH',
              symbol: 'ETH',
              decimals: 18,
            },
          },
        ],
      });
    } else {
      throw error;
    }
  }
};

/**
 * Creates Etherscan URL for transaction
 */
export const getEtherscanUrl = (txHash: string): string => {
  return `${SEPOLIA_NETWORK.blockExplorerUrl}/tx/${txHash}`;
};

/**
 * Handles MetaMask errors with user-friendly messages
 */
export const handleMetaMaskError = (error: MetaMaskError): string => {
  switch (error.code) {
    case METAMASK_ERROR_CODES.USER_REJECTED:
      return 'Transaction was rejected by user';
    case METAMASK_ERROR_CODES.UNAUTHORIZED:
      return 'MetaMask account not authorized';
    case METAMASK_ERROR_CODES.UNSUPPORTED_METHOD:
      return 'Unsupported MetaMask method';
    case METAMASK_ERROR_CODES.DISCONNECTED:
      return 'MetaMask is disconnected';
    case METAMASK_ERROR_CODES.CHAIN_DISCONNECTED:
      return 'Blockchain network disconnected';
    default:
      return error.message || 'An unknown error occurred';
  }
};

/**
 * Formats timestamp for display
 */
export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};
