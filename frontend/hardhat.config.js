require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork:"hardhat",
  networks:{
    hardhat:{
      accounts:[
        {
          privateKey:process.env.HARDHAT_ACCOUNT_PRIVATE_KEY,
          balance:"1000000000000000000000",
        },
      ],
      chainId:31337
    }
  }
};