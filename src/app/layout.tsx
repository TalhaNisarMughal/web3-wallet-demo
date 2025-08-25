import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web3 Wallet Demo | Sepolia Testnet",
  description: "A professional Web3 wallet demo built with Next.js, TypeScript, and ethers.js. Connect MetaMask, send ETH transactions, and track history on Sepolia testnet.",
  keywords: ["Web3", "Ethereum", "MetaMask", "Wallet", "DApp", "Sepolia", "Blockchain"],
  authors: [{ name: "Sajid Rajput", url: "https://github.com/TalhaNisarMughal" }],
  openGraph: {
    title: "Web3 Wallet Demo",
    description: "Professional Web3 wallet integration demo on Sepolia testnet",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
