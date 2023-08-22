require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    localhost: {
      url: "http://localhost:8545",
    }, 
    sepolia: {
      url: process.env.SEPOLIA_API_URL, // Replace with the actual URL
      accounts: [process.env.ACCOUNTS], // Replace with your accounts/private keys
    },
  },
};
