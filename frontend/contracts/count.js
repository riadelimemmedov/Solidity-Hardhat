
//!Ethers js and Ether js provider
const Ethers = require('ethers')
const ethers = require("./ethers");

//!Counter Contract Abi Value
const Counter = require('../artifacts/contracts/Counter.sol/Counter.json')

//!DotEnv
require('dotenv').config({path:"..//.env"})



//*deployContract
const deployContract = async () => {
    let contract;
    if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'){
        //We are in the browser and metamask is running
        const accounts = window.ethereum.request({method:'eth_requestAccounts'})
        if(await accounts){
            const provider = new Ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            contract = new Ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA, Counter.abi, signer)
        }
        else{
            alert('Please login to metamask account')
        }
    }
    else{
        contract = new Ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_LOCALHOST,Counter.abi,ethers.getSigner())
    }
    return contract
}



//export deployed contract to abroad
module.exports = {Ethers,Counter,deployContract}


