"use client";
import { Inter } from 'next/font/google'
import './globals.css'
import { getDefaultWallets, RainbowKitProvider, ConnectButton } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const scroll = {
    id: 534351,
    name: 'Scroll Sepolia Testnet',
    network: 'Sepolia',
    iconUrl: 'https://pbs.twimg.com/profile_images/1696531511519150080/Fq5O0LeN_400x400.jpg',
    iconBackground: '#fff',
    nativeCurrency: {
      decimals: 18,
      name: 'Scroll ETH',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['https://sepolia-rpc.scroll.io'] },
      default: { http: ['https://sepolia-rpc.scroll.io'] },
    },
    testnet: true,
  };
  const { chains, publicClient } = configureChains(
    [scroll, polygonMumbai],
    [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()],
  );

  var wagmiConfig;

  try {
    const { connectors } = getDefaultWallets({
      appName: "formify",
      projectId: "a938bee08643184fb038b8deec30437f",
      chains,
    });
    wagmiConfig = createConfig({
      autoConnect: true,
      connectors,
      publicClient,
    });
  } catch (err) {
    // console.log(err);
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig} className="sticky top-0 z-50">
          <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}
