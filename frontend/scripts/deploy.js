const hre = require("hardhat");


//!The 'main' function to deploy contract locally
async function main() {
  

  //?Deploy source code in blockchain
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
  const receipt = await contract.deployTransaction.wait(6)// Line of code is waiting for the deployment transaction to be included in six blocks on the Ethereum blockchain. This is done to ensure that the transaction has sufficient confirmations, which helps to ensure the transaction will not be reversed.
  console.log('Deployed by address ', receipt.from)


  //?Verify source code in etherscan
  if(hre.network.name === 'sepolia'){
    try{
      await hre.run("verify:verify",{
        address:contract.address,
        constructorArguments:[],//If you have passed contract address arguments sent to contract,if you want
      })
    }
    catch(e){
      if(e.message.toLowerCase().includes('already verified')){
        console.log('Already verified')
      }
      else{
        console.log('Returned error when verified contract')
      }
    }
    console.log('Contract verified')
  }

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
