require("@nomiclabs/hardhat-etherscan");
require('hardhat-abi-exporter');
require("@nomicfoundation/hardhat-chai-matchers")
require('dotenv').config();


const mnemonic = process.env.MNEMONIC || "test test test test test test test test test test test junk";
const scankey = process.env.ETHERSCAN_API_KEY;


module.exports = {
    solidity: {
        version: "0.8.18",
        settings: {
            viaIR: true,
            optimizer: {
                enabled: true,
                runs: 200,
            },
            "outputSelection": {
                "*": {
                "": ["ast"],
                "*": ["abi", "metadata", "devdoc", "userdoc", "storageLayout", "evm.legacyAssembly", "evm.bytecode", "evm.deployedBytecode", "evm.methodIdentifiers", "evm.gasEstimates", "evm.assembly"]
                }
            },
        },
    },
    defaultNetwork: 'hardhat',
    networks: {
        hardhat: {
            chainId: 31337,
            accounts: {
                count: 10,
                initialIndex: 0,
                mnemonic,
                path: "m/44'/60'/0'/0",
                accountsBalance: '1000000000000000000000', // (1000 ETH)
            },
        },
        local: {
            url: "http://127.0.0.1:8545",
            chainId: 31337,
            accounts: {
                mnemonic,
            },
        },
        mainnet: {
            url: "https://mainnet.gateway.tenderly.co",
            accounts: {
                mnemonic,
            },
            chainId: 1,
        },
        sepolia: {
            url: `https://sepolia.infura.io/v3/${encodeURIComponent(process.env.INFURA_API_KEY)}`,
            accounts: {mnemonic
            },
               },

        goerli: {
            url: "https://rpc.ankr.com/eth_goerli",
            accounts: {
                mnemonic,
            },
            chainId: 5,
        }
    },
    etherscan: {
        apiKey: scankey
    }, 
    abiExporter: {
        path: './deployments/abi',
        runOnCompile: true,
        clear: true,
        flat: true,
        spacing: 2,
        pretty: true,
    },
};