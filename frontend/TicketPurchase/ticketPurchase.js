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

//get contract address from localStorage
const contractAddress = localStorage.getItem('contractAddress');

// DOM Elements
const connectWalletBtn = document.getElementById('connectWallet');
const purchaseTicketBtn = document.getElementById('purchaseTicket');
const walletStatus = document.getElementById('walletStatus');
const transactionStatus = document.getElementById('transactionStatus');
const statusMessage = document.getElementById('statusMessage');
const transactionHash = document.getElementById('transactionHash');
const quantityInput = document.getElementById('quantity');
const quantityDisplay = document.getElementById('quantityDisplay');
const totalPrice = document.getElementById('totalPrice');

// State variables
let web3;
let contract;
let userAddress;
const ticketPrice = '0.1'; // 0.1 ETH per ticket

// Initialize Web3
async function initWeb3() {
    const walletAddress = localStorage.getItem('walletAddress');
    const privateKey = localStorage.getItem('privateKey');

    if (!walletAddress || !privateKey) {
        showError('Please create a wallet first');
        return false;
    }

    try {
        // Connect to Sepolia network
        web3 = new Web3('https://sepolia.infura.io/v3/YOUR_INFURA_KEY');
        contract = new web3.eth.Contract(contractABI, contractAddress);
        userAddress = walletAddress;
        
        // Add the private key to the wallet
        web3.eth.accounts.wallet.add(privateKey);
        
        updateWalletStatus(true);
        updatePurchaseButton();
        return true;
    } catch (error) {
        console.error('Error initializing Web3:', error);
        showError('Error connecting to wallet');
        updateWalletStatus(false);
        return false;
    }
}

// Update wallet connection status
function updateWalletStatus(connected) {
    if (connected) {
        walletStatus.textContent = `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
        walletStatus.style.color = '#27ae60';
    } else {
        walletStatus.textContent = 'Wallet not connected';
        walletStatus.style.color = '#e74c3c';
    }
}

// Update purchase button state
function updatePurchaseButton() {
    const isFormValid = document.getElementById('eventName').value &&
                       document.getElementById('ticketType').value &&
                       quantityInput.value > 0;
    purchaseTicketBtn.disabled = !isFormValid;
}

// Update price display
function updatePriceDisplay() {
    const quantity = parseInt(quantityInput.value) || 0;
    const total = web3.utils.toWei((parseFloat(ticketPrice) * quantity).toString(), 'ether');
    quantityDisplay.textContent = quantity;
    totalPrice.textContent = `${web3.utils.fromWei(total, 'ether')} ETH`;
}

// Show error message
function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    document.querySelector('.ticket-form').prepend(errorElement);
    setTimeout(() => errorElement.remove(), 5000);
}

// Handle quantity changes
quantityInput.addEventListener('input', () => {
    updatePriceDisplay();
    updatePurchaseButton();
});

// Handle form input changes
document.getElementById('eventName').addEventListener('input', updatePurchaseButton);
document.getElementById('ticketType').addEventListener('change', updatePurchaseButton);

// Connect wallet button click handler
connectWalletBtn.addEventListener('click', async () => {
    await initWeb3();
});

// Purchase ticket button click handler
purchaseTicketBtn.addEventListener('click', async () => {
    try {
        // Show transaction status
        transactionStatus.classList.remove('hidden');
        statusMessage.textContent = 'Processing Transaction...';
        transactionHash.textContent = '';

        // Get form values
        const eventName = document.getElementById('eventName').value;
        const ticketType = document.getElementById('ticketType').value;
        const quantity = parseInt(quantityInput.value);

        // Calculate total price
        const totalAmount = web3.utils.toWei((parseFloat(ticketPrice) * quantity).toString(), 'ether');

        // Get the nonce
        const nonce = await web3.eth.getTransactionCount(userAddress, 'latest');
        
        // Get gas price
        const gasPrice = await web3.eth.getGasPrice();
        
        // Estimate gas limit
        const gasLimit = await contract.methods.purchaseTicket(eventName, ticketType, quantity)
            .estimateGas({ from: userAddress, value: totalAmount });

        // Create transaction
        const transaction = {
            from: userAddress,
            to: contractAddress,
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            value: totalAmount,
            data: contract.methods.purchaseTicket(eventName, ticketType, quantity).encodeABI()
        };

        // Sign and send transaction
        const signedTx = await web3.eth.accounts.signTransaction(transaction, localStorage.getItem('privateKey'));
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        // Show transaction hash
        transactionHash.textContent = `Transaction Hash: ${receipt.transactionHash}`;
        statusMessage.textContent = 'Transaction Successful!';
        transactionStatus.querySelector('.status-icon').style.background = '#27ae60';
        
        // Reset form
        document.getElementById('eventName').value = '';
        document.getElementById('ticketType').value = '';
        quantityInput.value = '1';
        updatePriceDisplay();
        updatePurchaseButton();

    } catch (error) {
        console.error('Error purchasing ticket:', error);
        statusMessage.textContent = 'Transaction Failed';
        transactionStatus.querySelector('.status-icon').style.background = '#e74c3c';
        showError(error.message);
    }
});

// Initialize price display
updatePriceDisplay();
