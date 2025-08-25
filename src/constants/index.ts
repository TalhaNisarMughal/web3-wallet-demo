/**
 * Application constants and configuration
 * @author Sajid Rajput
 */

import { NetworkInfo } from '@/types/wallet';

// Sepolia testnet configuration
export const SEPOLIA_NETWORK: NetworkInfo = {
  chainId: '0xaa36a7', // 11155111 in hex
  name: 'Sepolia Testnet',
  rpcUrl: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  blockExplorerUrl: 'https://sepolia.etherscan.io',
};

// MetaMask error codes
export const METAMASK_ERROR_CODES = {
  USER_REJECTED: 4001,
  UNAUTHORIZED: 4100,
  UNSUPPORTED_METHOD: 4200,
  DISCONNECTED: 4900,
  CHAIN_DISCONNECTED: 4901,
} as const;

// Transaction confirmation blocks
export const CONFIRMATION_BLOCKS = 1;

// Default gas limit for ETH transfers
export const DEFAULT_GAS_LIMIT = 21000;

// Minimum ETH amount for validation (0.000001 ETH)
export const MIN_ETH_AMOUNT = 0.000001;

// Maximum ETH amount for validation (prevent accidental large transfers)
export const MAX_ETH_AMOUNT = 10;

// Transaction timeout in milliseconds
export const TRANSACTION_TIMEOUT = 300000; // 5 minutes
