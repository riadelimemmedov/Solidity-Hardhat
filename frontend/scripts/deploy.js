const hre = require("hardhat");


//!The 'main' function to deploy contract locally
async function main() {
  
  //Getting deployer's addresss
  const[deployer] = await hre.ethers.getSigners()


  //Gettinggs deployer ETH balance
  const accountBalance = await deployer.provider.getBalance(deployer.address)


  //Logging The Deployers's address and the balance
  console.log('Deployer adress is ', deployer.getAddress())
  console.log('Account balance is ', accountBalance.toString())


  //Deploying contracts
  const contracts = await hre.ethers.getContractFactory('Counter')
  const contract = await contracts.deploy()
  await contract.deployed()//Wait until the deployment process complete

   //Logging the address of the deployed contract
  console.log('Counter address ', await contract.address)


  //Get sender user addresss,well you know who deploy that is contract
  const receipt = await contract.deployTransaction.wait()
  console.log('Deployed by address ', receipt.from)

}


//!validateMain
const validateMain = async() => {
  try{
    await main()
    process.exit(0)
  }
  catch(err){
    console.log(err)
    process.exit(1)
  }
}


//Call validateMain function and validate contract deploy or not
validateMain()
