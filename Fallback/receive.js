const contractAbi = require('./contractAbi.json');
const { ethers } = require('hardhat');
require('dotenv').config();

// Replace CONTRACT_ADDRESS with your desired smart contract address

    
  // Connect to the Sepolia network 

  const CONTRACT_ADDRESS = '0xAcd59272CeCeFf9563f2D3E984D93e283FFa854f';
  // Create a new Contract instance
  async function main() {

  const rpcUrl = `https://sepolia.infura.io/v3/${encodeURIComponent(process.env.INFURA_API_KEY)}`;

    
    // Connect to the Sepolia network 
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  
// Replace with the private key of the account you want to use
   const privateKey = process.env.MNEMONIC;
   const signer = new ethers.Wallet(privateKey, provider);
  
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);

  // Send 1 wei to the recipient
  const weiAmount = ethers.utils.parseUnits('1', 'wei');
  const tx = await signer.sendTransaction({
    to: CONTRACT_ADDRESS,
    value: weiAmount
  });

  console.log(`Transaction sent. Transaction hash: ${tx.hash}`);

  console.log('Contract Owner:', await contract.owner());
  
}
   


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
