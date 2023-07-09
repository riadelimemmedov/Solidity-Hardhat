//!React and Next.js
import { useState,useEffect } from 'react'

//!Ethers
// import ethers from '../contracts/ethers.js'
// import { ethers } from "ethers";
// const Counter = require('../artifacts/contracts/Counter.sol/Counter.json')



//!Deployed Contracts
const count_contract = require('../contracts/count.js')


//!Thirty Part Packages
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//*App
export default function App(){
    
    //?state
    const [connectButton,setConnectButton] = useState('Connect')
    const [countValue,setCountValue] = useState("")
    const [contract,setContract] = useState()

    const [currentAccount,setCurrentAccount] = useState('')

    //!getContract
    const getContract = async () => {
        const deployed_contract = await count_contract.deployContract()
        const count_value = await deployed_contract.get()
        setContract(deployed_contract)
        setCountValue(count_value.toString())
        setCurrentAccount(await deployed_contract.signer.getAddress())
    }


    //!connectWallet
    const connectWallet = async () => {
        if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'){
            try{
                const { ethereum } = window
                if(!ethereum){
                    toast.info('Please install metamask')
                    return
                }
                else{
                    const accounts = window.ethereum.request({method:'eth_requestAccounts'})//connect to metamask account which has to located in browser
                    setTimeout(()=>{
                        setCurrentAccount(accounts[0])
                    },3000)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            toast.info('Please install metamask to your browser')
        }
    }


    //!checkProdorLocal
    const checkProdorLocal = async () => {
        if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'){
            toast.warning('You are currently PROD must be install metamask for connect to DApp Blockchain application - Rinkeby')
        }
        else{
            toast.warning('You are currently working on HardHat test server  - LocalHost Hardhat Test Server')
        }
    }


    //!getCount
    const getCount = async () => {
            try{
                const count_value = await contract.get()
                setCountValue(count_value.toString())
            }
            catch(err){
                console.log('When call function GET encounter some errors ', err)
            }
    }


    //!incCount
    const incCount = async () => {
            try{
                await contract.inc()
                await getCount()
            }
            catch(err){
                console.log('When call function INC encounter some errors ', err)
            }
    }



    //!decCount
    const decCount = async () => {
            try{
                await contract.dec()
                await getCount()
            }
            catch(err){
                console.log('When call function DEC encounter some errors ', err)
            }
    }


    //!handleAccountChanged
    const handleAccountChanged = () => {
        if(typeof window.ethereum != 'undefined'){
            window.ethereum.on('accountsChanged', () => {
                window.location.href = '/'
            });
        }
    }


    //?useEffect
    useEffect(() => {
        // connectWallet()
        checkProdorLocal()
        getContract()
        handleAccountChanged()
    },[])


    //?return
    return(

        <div>
            <h3>Connect Metamask</h3>
            <hr/>
            Current Accounnt Is - {currentAccount}
            <br/><br/>
            {
                currentAccount ? (
                    <>
                        <button type="button" onClick={getCount}>Get Count</button>
                        <button type="button" onClick={incCount}>Increment Count</button>
                        <button type="button" onClick={decCount}>Decrement Count</button>
                    </>
                )
                :
                (
                    <button type="button" onClick={connectWallet}>Connect Wallet</button>
                )
            }
            <br/><br/><hr/>
            <h1>Count is : { countValue }</h1>

            <link async rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"/>
            <ToastContainer />
        </div>
    )
}