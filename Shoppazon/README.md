# Shoppazon - Getting Started

This guide will help you set up and run Shoppazon, a blockchain-powered shopping platform on Ethereum's Sepolia testnet.

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

## Adding Testnet Smart Contracts

1. Open the `constants.js` file located in the `client/src/utils` folder.

2. Paste the address of the smart contract deployed to the Sepolia testnet in the `sepoliaContractAddress` variable.

3. Paste the ABI of your smart contract in the `abi` variable.

## Adding NFT.Storage API Key

1. Create an account on NFT.Storage and obtain an API key.

2. Open the `.env` file located in the `client` folder.

3. Paste your API key into the `VITE_NFTSTORAGE_API_KEY` variable.

## Running the Development Server

1. In the `client` folder, run the following command to start the development server:

    ```bash
    npm run dev
    ```

2. Open your web browser and navigate to the URL provided by the development server.

   **Note:** If the URL is not clickable, you can copy and paste it into your web browser.

# Enjoy using Shoppazon!
