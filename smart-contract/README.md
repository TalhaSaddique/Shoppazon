# Shoppazon Smart Contracts

This folder contains the Solidity smart contracts for Shoppazon, a blockchain-powered shopping platform on Ethereum's Sepolia testnet.


## Installation

1. Clone the Shoppazon repository using the following command:

    ```bash
    git clone https://github.com/TalhaSaddique/Shoppazon.git
    ```

2. Change directory to the client folder using the following command:

    ```bash
    cd client
    ```

3. Install the dependencies using the following command:

    ```bash
    npm install
    ```



## Adding API URL and Account Private Key

1. Rename the `.env copy` file located in the root directory of the SmartContract folder with `.env`.

2. Open the `.env` file located in the root directory of the SmartContract folder.

3. Add the Sepolia testnet API URL using the following format:

    ```
    SEPOLIA_API_URL= " <API URL> "
    ```
4.  Add the Private Key of your Sepolia testnet Account to pay the gas fee of smart contract deployment using the following format:

     ```
    ACCOUNTS=" Private Key "
    ```

5. Save and close the `.env` file.


## Deploying the Smart Contracts

1. To deploy the contracts to the Sepolia testnet, run the following command:

    ```
    npx hardhat run scripts/deploy.js --network sepolia
    ```

2. After deploying the contracts, copy the contract addresses and ABIs to the `constants.js` file located in the `client/src` folder.


# ENJOY!
