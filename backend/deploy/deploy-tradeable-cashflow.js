require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-web3");

const host = "0xEB796bdb90fFA0f28255275e16936D25d3418603";
const cfa = "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873";
const acceptedToken = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f";

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  console.log(deployer);

  // Get the owner's address from MetaMask
  const owner = "0x5BD7709F0aB8600a85629B6229EE5117468A392e";

  const TradeableCashflow = await deploy("TradeableCashflow", {
    from: deployer,
    args: [owner, "Tradeable Cashflow", "TCF", host, cfa, acceptedToken],
    log: true,
  });

  const ethers = hre.ethers;
  const tradeableCashflow = await ethers.getContractAt("TradeableCashflow", TradeableCashflow.address);

  // Listen for the TradeableCashflowDeployed event
  tradeableCashflow.on("TradeableCashflowDeployed", (contractAddress) => {
    console.log("TradeableCashflow contract address:", contractAddress);
  });

  // This line is optional, it just waits for the event to be emitted (useful for one-off scripts)
  await new Promise((resolve) => setTimeout(resolve, 20000));
};
module.exports.tags = ["TradeableCashflow"];
