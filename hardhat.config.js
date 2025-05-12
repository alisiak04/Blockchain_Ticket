require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import("hardhat/config").HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/5bbf9e76a9264d73a203e76c47bdac64`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};