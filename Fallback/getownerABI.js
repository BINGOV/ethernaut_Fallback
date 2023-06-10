const contractAbi = require('./contractAbi.json');
const { ethers } = require('hardhat');
require('dotenv').config();



// Replace CONTRACT_ADDRESS with your desired smart contract address
const CONTRACT_ADDRESS = '0xe2a73a43b11c21f910687182D858ACd44793b2C8';

async function main() {
  // Set the RPC URL for the Sepolia network
 
  const rpcUrl = `https://sepolia.infura.io/v3/${encodeURIComponent(process.env.INFURA_API_KEY)}`;

    
  // Connect to the Sepolia network 
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  // Create a new Contract instance
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, provider);

  // Fetch the contract owner
 
  const owner = await contract.owner();
  
  
  console.log('Contract Owner:', owner);
}
   


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
