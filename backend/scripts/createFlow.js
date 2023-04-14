const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers, providers } = require("ethers");
require("dotenv");

async function main() {

  const url = `${process.env.MUMBAI_RPC_URL}`;
  const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

  const sf = await Framework.create({
    chainId: 80001,
    provider: customHttpProvider
  });


  const signer = sf.createSigner({
    privateKey:
      process.env.DEPLOYER_PRIVATE_KEY,
    provider: customHttpProvider
  });


  const daix = await sf.loadSuperToken("fDAIx");
  console.log(await daix.balanceOf({account:"0xAD1f77a08526275D974984b0c2dE20d4fA19565F",providerOrSigner: signer}))
  console.log(await daix.getFlow({sender: "0xAD1f77a08526275D974984b0c2dE20d4fA19565F",
  receiver: "0x846D74764166001DBd8CCf33D1472bB6802D7040", //tradeable cashflow address
    providerOrSigner: signer}))
  const createFlowOperation = daix.createFlow({
      sender: "0xAD1f77a08526275D974984b0c2dE20d4fA19565F",
      receiver: "0x846D74764166001DBd8CCf33D1472bB6802D7040", //tradeable cashflow address
      flowRate: "10000000"
  });


  const txn = await createFlowOperation.exec(signer);

  console.log(txn)
  const receipt = await txn.wait();

  console.log(receipt);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

