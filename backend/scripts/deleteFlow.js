const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers, providers } = require("ethers");
require("dotenv");

async function main() {

  const url = `${process.env.MUMBAI_RPC_URL}`;
  const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

  const sf = await Framework.create({
    chainId: 80001,
    provider: customHttpProvider,
  });
  const signer = sf.createSigner({
    privateKey:
      process.env.DEPLOYER_PRIVATE_KEY,
    provider: customHttpProvider
  });

  const daix = await sf.loadSuperToken("fDAIx");

  const deleteFlowOperation = daix.deleteFlow({
      sender: signer.address,
      receiver: "0x5AA6b9ED796F7f9bDd8fE9032512303781Cc5EaC", //tradeable cashflow address
  });

  const txn = await deleteFlowOperation.exec(signer);

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