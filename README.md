# Web3 Wallet Demo

A professional Web3 wallet integration demo built with Next.js, TypeScript, and ethers.js. This application demonstrates enterprise-level practices for Web3 development with MetaMask integration on the Sepolia testnet.

## 🚀 Features

- **Secure Wallet Connection**: MetaMask integration with automatic network switching
- **ETH Transactions**: Send ETH with comprehensive validation and error handling
- **Transaction History**: Real-time transaction tracking with Etherscan links
- **Enterprise Architecture**: TypeScript, custom hooks, proper error handling
- **Responsive Design**: Mobile-first design with TailwindCSS
- **Professional UX**: Loading states, error messages, and user feedback

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS
- **Web3**: ethers.js v6, MetaMask
- **Network**: Sepolia Ethereum Testnet
- **Code Quality**: ESLint, Prettier, TypeScript strict mode

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v18 or higher)
2. **MetaMask** browser extension installed
3. **Sepolia ETH** for testing (get from [Sepolia Faucet](https://sepoliafaucet.com/))

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/TalhaNisarMughal/web3-wallet-demo.git
cd web3-wallet-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage

1. **Connect Wallet**: Click "Connect MetaMask" to connect your wallet
2. **Network Check**: The app will automatically prompt you to switch to Sepolia if needed
3. **View Balance**: See your current ETH balance on Sepolia
4. **Send Transactions**: Use the send form to transfer ETH to any address
5. **Track History**: Monitor all transactions with real-time status updates

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── WalletConnection.tsx
│   ├── SendTransaction.tsx
│   ├── TransactionHistory.tsx
│   ├── ErrorDisplay.tsx
│   └── index.ts
├── hooks/                 # Custom React hooks
│   └── useWallet.ts      # Main wallet management hook
├── types/                 # TypeScript type definitions
│   └── wallet.ts
├── utils/                 # Utility functions
│   └── web3.ts           # Web3 helper functions
└── constants/             # App constants
    └── index.ts          # Network configs and constants
```

## 🔐 Security Features

- **Input Validation**: Address and amount validation before transactions
- **Error Handling**: Comprehensive error messages and user feedback
- **Network Verification**: Ensures users are on the correct network
- **Transaction Limits**: Safety limits to prevent accidental large transfers
- **Type Safety**: Full TypeScript coverage for better reliability

## 🌐 Network Configuration

This demo is configured for **Sepolia Testnet**:
- Chain ID: 11155111 (0xaa36a7)
- RPC URL: Infura endpoint
- Block Explorer: [Sepolia Etherscan](https://sepolia.etherscan.io)

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop browsers
- Tablet devices
- Mobile phones
- Various screen sizes and orientations

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

### Code Quality

This project follows enterprise-level standards:
- **TypeScript**: Strict mode enabled
- **ESLint**: Comprehensive linting rules
- **Prettier**: Consistent code formatting
- **Component Architecture**: Reusable, typed components
- **Custom Hooks**: Proper state management patterns

## 🔄 Transaction Flow

1. User enters recipient address and amount
2. Frontend validates inputs (address format, amount limits)
3. Transaction is sent via ethers.js
4. Transaction hash is added to local state immediately
5. App monitors transaction status and updates UI
6. Balance refreshes after confirmation
7. Transaction appears in history with Etherscan link

## ⚠️ Important Notes

- **Testnet Only**: This demo is designed for Sepolia testnet
- **Educational Purpose**: Not intended for mainnet use
- **MetaMask Required**: Currently only supports MetaMask wallet
- **Local Storage**: Transaction history is stored locally (not persistent)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

**TalhaNisarMughal**
- GitHub: [@TalhaNisarMughal](https://github.com/TalhaNisarMughal)
- Email: talhanisar590@gmail.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [ethers.js](https://ethers.org/) for Web3 functionality
- [TailwindCSS](https://tailwindcss.com/) for styling
- [MetaMask](https://metamask.io/) for wallet integration
- [Sepolia](https://sepolia.dev/) for the test network
