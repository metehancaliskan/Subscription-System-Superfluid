import { ClientCtx } from "../../context/clientCtx";
import React, { useState, useEffect, useContext } from "react";
// import { Framework } from "@superfluid-finance/sdk-core";
import {
  Card
} from "react-bootstrap";
import { ethers } from "ethers";

let account;

export const Market = () => {
  const { clients, setClients } = useContext(ClientCtx);
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      account = currentAccount;
      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      // setupEventListener()
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    console.log("runs");
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const chain = await window.ethereum.request({ method: "eth_chainId" });
    let chainId = chain;
    console.log("chain ID:", chain);
    console.log("global Chain Id:", chainId);
    if (accounts.length !== 0) {
      account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
      // setupEventListener()
    } else {
      console.log("No authorized account found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (<>
      <h1 className="flex justify-center mb-10">{checkIfWalletIsConnected() ? (
        <button id="connectWallet" className="button" onClick={connectWallet}>
          Connect Wallet as Investor
        </button>
      ) : (
        <Card className="flex justify-center mb-10">
          {`${currentAccount.substring(0, 4)}...${currentAccount.substring(
            38
          )}`}
        </Card>
      )}</h1>
    <div className="container m-auto grid gap-4 grid-cols-2">
      
      {clients.map((client, index) => {
        return (
          <div
            // key={index}
            // onClick={() => handleCardClick(client)}
            className="bg-white px-2 py-4 rounded-lg shadow-xl w-full flex flex-col"
          >
            <p className="text-lg font-bold"> {client.name}</p>
            <p className="text-lg font-bold"> {client.symbol}</p>
            <p className="text-lg"> {client.contract}</p>
            <p className="text-lg"> $20</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {}}
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                
                Buy
              </button>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
};
