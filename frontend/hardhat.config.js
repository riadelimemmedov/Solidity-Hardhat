require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork:"hardhat",
  networks:{
    // hardhat:{
    //   accounts:[
    //     {
    //       privateKey:process.env.HARDHAT_ACCOUNT_PRIVATE_KEY,
    //       balance:"1000000000000000000000",
    //     },
    //   ],
    //   chainId:31337
    // }
    sepolia:{
      url:process.env.SEPOLIA_NODE_URL_HTTPS,
      accounts:[process.env.METAMASK_PRIVATE_KEY],
      chainId:11155111
    }
  }
};