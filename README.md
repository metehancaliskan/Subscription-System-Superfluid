# Subscription-System-Superfluid
## Description
There are 3 mains goal of this project. The first goal is to avoid giving our personal information to a centralized organization to use a subscription service. The second goal is to cancel subscription at any time without losing money by canceling our subscription instead of waiting for the subscription to expire for subscription cancellation. The last goal is to create a marketplace that will allow investment in the cash flow between subscription providers and subscribers.

## 1. Backend

### Tradeable Cashflow

 ```cd backend```

This example provides the deployer with an NFT. Whoever is the owner
of the NFT will receive a consolidated stream for all the streams the contract
receives.

#### Installation

In this directory, run the following depending on your node package manager.

```bash
### yarn
yarn

### npm
npm i
```

#### Redirect All

The [redirect all contract](./contracts/RedirectAll.sol) contains the super app
logic that can "react" to the creation, updating, and deletion of a stream via
a callback. These callbacks redirect any incoming stream to a given receiver's
address.

#### Tradeable Cash Flow

The [tradable cashflow contract](./contracts/TradeableCashflow.sol) contains
ERC721 NFT logic, inheriting Open Zeppelin's implementations. It also inherits
the `RedirectAll.sol` logic. In this implementation, the receiver of the stream
is changed on-transfer through the Open Zeppelin ERC721 `_beforeTransfer` hook.

#### Compile
 ```npx hardhat compile```

#### Deploy
```npx hardhat deploy```

#### Verify 
```npx hardhat verify --constructor-args arguments.js  --network goerli CONTRACTADDRESS```

In order to verify the contract, you would require an etherscan key and passin the ctor arguments with the file arguments,js

#### Create Flow
```npx hardhat run scripts/createFlow.js```

