const contractAbi = require('./contractAbi.json');
const { ethers } = require('hardhat');
require('dotenv').config();


const privateKey = process.env.MNEMONIC;
const rpcUrl = `https://sepolia.infura.io/v3/${encodeURIComponent(process.env.INFURA_API_KEY)}`;

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(privateKey, provider);
const contractAddress = '0xe2a73a43b11c21f910687182D858ACd44793b2C8';

// Get the contract instance;
const contract = new ethers.Contract(contractAddress, contractAbi, signer);

async function getContractBalance() {
  // Get the contract balance
  const balance = await provider.getBalance(contract.address);

  // Log the contract balance
  console.log(`Contract balance: ${balance.toString()} wei`);
}

getContractBalance();
