require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.6.6",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,

    },
    development: {
      url: "http://127.0.0.1:8545/",
      chainId: 1337
    }
  }
};
