import { ClientCtx } from "../../context/clientCtx";
import React, { useState, useEffect, useContext } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Spinner,
  Card
} from "react-bootstrap";
import { ethers } from "ethers";

let account;
const recipient = "0xA0C0292b8489c29D1e39bE375c4479472a50300f";

async function createNewFlow(recipient, flowRate) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();

  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  const sf = await Framework.create({
    chainId: Number(chainId),
    provider: provider
  });

  const superSigner = sf.createSigner({ signer: signer });

  console.log(signer);
  console.log(await superSigner.getAddress());
  const daix = await sf.loadSuperToken("fDAIx");

  console.log(daix);

  try {
    const createFlowOperation = daix.createFlow({
      sender: await superSigner.getAddress(),
      receiver: recipient,
      flowRate: flowRate
      // userData?: string
    });

    console.log(createFlowOperation);
    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(superSigner);
    console.log(result);

    console.log(
      `Congrats - you've just created a money stream!
    `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

export const Subscriber = () => {
  const { clients, setClients } = useContext(ClientCtx);

  const handleCardClick = (client) => {
    console.log(client);
  };

  // const [recipient, setRecipient] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [flowRate, setFlowRate] = useState("");
  const [flowRateDisplay, setFlowRateDisplay] = useState("");
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

  function calculateFlowRate(amount) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
      alert("You can only calculate a flowRate based on a number");
      return;
    } else if (typeof Number(amount) === "number") {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInWei = ethers.BigNumber.from(amount);
      const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
      return calculatedFlowRate;
    }
  }

  function CreateButton({ isLoading, children, ...props }) {
    return (
      <Button variant="success" className="button" {...props}>
        {isButtonLoading ? <Spinner animation="border" /> : children}
      </Button>
    );
  }

  // const handleRecipientChange = (e) => {
  //   setRecipient(() => ([e.target.name] = e.target.value));
  // };

  // const handleFlowRateChange = (e) => {
  //   setFlowRate(() => ([e.target.name] = e.target.value));
  //   let newFlowRateDisplay = calculateFlowRate(e.target.value);
  //   setFlowRateDisplay(newFlowRateDisplay.toString());
  // };


  const handleButtonClick2 = () => {
    console.log("Button 2 clicked");
  };

  return (
    <div className="container m-auto flex gap-4 flex-wrap">
      {currentAccount === "" ? (
        <button id="connectWallet" className="button" onClick={connectWallet}>
          Connect Wallet as Subscriber
        </button>
      ) : (
        <Card className="connectedWallet">
          {`${currentAccount.substring(0, 4)}...${currentAccount.substring(
            38
          )}`}
        </Card>
      )}
      {clients.map((client, index) => {
        return (
          <div
            // key={index}
            // onClick={() => handleCardClick(client)}
            className="bg-white px-2 py-4 rounded-lg shadow-xl w-min flex flex-col"
          >
            <p className="text-lg font-bold"> {client.name}</p>
            <p className="text-lg font-bold"> {client.symbol}</p>
            <p className="text-lg"> {client.wallet}</p>
            <p className="text-lg"> `${calculateFlowRate(client.rate) !== " " ? flowRateDisplay : 0} DAIx/month`</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setIsButtonLoading(true);
                  createNewFlow(recipient, client.rate);
                  setTimeout(() => {
                    setIsButtonLoading(false);
                  }, 1000);
                }}
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                
                Subscribe
              </button>
              <button
                onClick={handleButtonClick2}
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-green-700 dark:focus:ring-red-800"
              >
                Cancel
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
