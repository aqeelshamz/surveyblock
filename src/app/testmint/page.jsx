"use client";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import mintNFT from "../../utils/mintNFT";


const Mint = () => {
  const { ethereum } = window;
  const { address } = useAccount();

  useEffect(() => {
    if (!ethereum) {
      alert("Please install MetaMask.");
    } else {
      // Check if the wallet is already connected
      ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) {
            // Wallet is already connected, no need to connect again
            console.log("Wallet is already connected.");
          } else {
            // Wallet is not connected, connect it
            connectWallet();
          }
        })
        .catch((error) => {
          console.error("Error checking accounts:", error);
        });
    }
  }, []);

  return (
    <button className="btn btn-primary" onClick={() => mintNFT(address)}>
      Mint NFT
    </button>
  );
};

export default Mint;
