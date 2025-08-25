/**
 * Wallet and Web3 related type definitions
 * @author Sajid Rajput
 */

import { BrowserProvider, JsonRpcSigner } from 'ethers';

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: string | null;
  balance: string;
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
}

export interface Transaction {
  hash: string;
  amount: string;
  timestamp: number;
  to: string;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface SendTransactionParams {
  to: string;
  amount: string;
}

export interface NetworkInfo {
  chainId: string;
  name: string;
  rpcUrl: string;
  blockExplorerUrl: string;
}

export interface MetaMaskError {
  code: number;
  message: string;
  data?: unknown;
}

// Ethereum window interface extension
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (params: unknown) => void) => void;
      removeListener: (event: string, callback: (params: unknown) => void) => void;
    };
  }
}
