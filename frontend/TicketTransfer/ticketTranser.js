// Contract ABI and address
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_symbol",
                "type": "string"
            },
            {
                "internalType": "uint8",
                "name": "_decimals",
                "type": "uint8"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "ticketId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "TicketPurchased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "ticketId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "TicketReturned",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "holder",
                "type": "address"
            }
        ],
        "name": "getTicketDetails",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "ticketIds",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "purchaseTicket",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "returnTicket",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "holder",
                "type": "address"
            }
        ],
        "name": "verifyTicket",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contractAddress = "0xAA6819E521379AC39A3CD779b406d1657205C1aB";
const infuraUrl = "https://sepolia.infura.io/v3/5bbf9e76a9264d73a203e76c47bdac64";

// DOM Elements
const connectWalletBtn = document.getElementById('connectWallet');
const transferTicketBtn = document.getElementById('transferTicket');
const walletStatus = document.getElementById('walletStatus');
const ticketBalance = document.getElementById('ticketBalance');
const walletAddressInput = document.getElementById('walletAddress');
const privateKeyInput = document.getElementById('privateKey');
const transactionStatus = document.getElementById('transactionStatus');
const statusMessage = document.getElementById('statusMessage');
const transactionHash = document.getElementById('transactionHash');

let web3;
let contract;
let userAddress;

async function initWeb3() {
    try {
      
        web3 = new Web3(infuraUrl);
        
        const walletAddress = walletAddressInput.value.trim();
        const privateKey = privateKeyInput.value.trim();
        
        if (!walletAddress) {
            showError('Please enter your wallet address');
            return false;
        }

        if (!privateKey) {
            showError('Please enter your private key');
            return false;
        }

        if (!web3.utils.isAddress(walletAddress)) {
            showError('Please enter a valid Ethereum address');
            return false;
        }

        //making contract instance
        contract = new web3.eth.Contract(contractABI, contractAddress);
        userAddress = walletAddress;
        
        //checking private key matches address
        const derivedAddress = web3.eth.accounts.privateKeyToAccount(privateKey).address;
        if (derivedAddress.toLowerCase() !== walletAddress.toLowerCase()) {
            showError('Private key does not match wallet address');
            return false;
        }
        
        //addin the private key to the wallet
        web3.eth.accounts.wallet.add(privateKey);
        
        updateWalletStatus(true);
        await checkBalance();
        return true;
    } catch (error) {
        console.error('Error initializing Web3:', error);
        showError('Error connecting to wallet: ' + error.message);
        updateWalletStatus(false);
        return false;
    }
}

function updateWalletStatus(connected) {
    if (connected) {
        walletStatus.textContent = `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
        walletStatus.style.color = '#27ae60';
        walletAddressInput.disabled = true;
        privateKeyInput.disabled = true;
    } else {
        walletStatus.textContent = 'Wallet not connected';
        walletStatus.style.color = '#e74c3c';
        walletAddressInput.disabled = false;
        privateKeyInput.disabled = false;
    }
}
async function checkBalance() {
    try {
        const balance = await contract.methods.balanceOf(userAddress).call();
        ticketBalance.textContent = balance.toString();
        transferTicketBtn.disabled = balance === '0';
    } catch (error) {
        console.error('Error checking balance:', error);
        showError('Error checking balance');
    }
}

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    document.querySelector('.transfer-form').prepend(errorElement);
    setTimeout(() => errorElement.remove(), 5000);
}

connectWalletBtn.addEventListener('click', async () => {
    await initWeb3();
});

transferTicketBtn.addEventListener('click', async () => {
    try {
        //show transaction status
        transactionStatus.classList.remove('hidden');
        statusMessage.textContent = 'Processing Transfer...';
        transactionHash.textContent = '';


        const nonce = await web3.eth.getTransactionCount(userAddress, 'latest');
        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = await contract.methods.returnTicket()
            .estimateGas({ from: userAddress });

        const transaction = {
            from: userAddress,
            to: contractAddress,
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            data: contract.methods.returnTicket().encodeABI()
        };

        //sign and send transaction
        const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKeyInput.value);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        transactionHash.textContent = `Transaction Hash: ${receipt.transactionHash}`;
        statusMessage.textContent = 'Transfer Successful!';
        transactionStatus.querySelector('.status-icon').style.background = '#27ae60';
        
        //update balance
        await checkBalance();

    } catch (error) {
        console.error('Error transferring ticket:', error);
        statusMessage.textContent = 'Transfer Failed';
        transactionStatus.querySelector('.status-icon').style.background = '#e74c3c';
        showError(error.message);
    }
});
