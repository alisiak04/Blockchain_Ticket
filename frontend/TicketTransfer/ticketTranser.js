// Contract ABI and address (replace with your actual contract details)
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

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace this with your actual deployed contract address

// DOM Elements
const connectWalletBtn = document.getElementById('connectWallet');
const transferTicketBtn = document.getElementById('transferTicket');
const walletStatus = document.getElementById('walletStatus');
const ticketBalance = document.getElementById('ticketBalance');
const ticketIdSelect = document.getElementById('ticketId');
const eventName = document.getElementById('eventName');
const ticketType = document.getElementById('ticketType');
const purchaseDate = document.getElementById('purchaseDate');
const refundAmount = document.getElementById('refundAmount');
const transactionStatus = document.getElementById('transactionStatus');
const statusMessage = document.getElementById('statusMessage');
const transactionHash = document.getElementById('transactionHash');

// State variables
let web3;
let contract;
let userAddress;
let userTickets = [];

// Initialize Web3
async function initWeb3() {
    // Get wallet info from localStorage
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
        await loadUserTickets();
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

// Load user's tickets
async function loadUserTickets() {
    try {
        // Get user's ticket balance
        const balance = await contract.methods.balanceOf(userAddress).call();
        ticketBalance.textContent = balance.toString();
        
        // Get user's tickets
        const ticketDetails = await contract.methods.getTicketDetails(userAddress).call();
        userTickets = ticketDetails.ticketIds;
        
        // Update ticket selection dropdown
        updateTicketSelection();
        
        // Enable transfer button if user has tickets
        transferTicketBtn.disabled = balance === '0';
    } catch (error) {
        console.error('Error loading tickets:', error);
        showError('Error loading tickets');
    }
}

// Update ticket selection dropdown
function updateTicketSelection() {
    // Clear existing options
    ticketIdSelect.innerHTML = '<option value="">Select a ticket</option>';
    
    // Add ticket options
    userTickets.forEach((ticketId, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Ticket #${ticketId}`;
        ticketIdSelect.appendChild(option);
    });
}

// Update ticket details display
async function updateTicketDetails(ticketIndex) {
    if (ticketIndex === '') {
        eventName.textContent = '-';
        ticketType.textContent = '-';
        purchaseDate.textContent = '-';
        refundAmount.textContent = '0 ETH';
        return;
    }

    const ticketId = userTickets[ticketIndex];
    
    try {
        // Get ticket details from contract
        const ticketDetails = await contract.methods.getTicketDetails(ticketId).call();
        
        // Update display
        eventName.textContent = ticketDetails.eventName;
        ticketType.textContent = ticketDetails.ticketType;
        purchaseDate.textContent = new Date(ticketDetails.purchaseDate * 1000).toLocaleDateString();
        
        // Calculate refund amount (80% of original price)
        const refund = web3.utils.fromWei(ticketDetails.price, 'ether') * 0.8;
        refundAmount.textContent = `${refund} ETH`;
    } catch (error) {
        console.error('Error getting ticket details:', error);
        showError('Error getting ticket details');
    }
}

// Show error message
function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    document.querySelector('.transfer-form').prepend(errorElement);
    setTimeout(() => errorElement.remove(), 5000);
}

// Handle ticket selection change
ticketIdSelect.addEventListener('change', () => {
    updateTicketDetails(ticketIdSelect.value);
});

// Connect wallet button click handler
connectWalletBtn.addEventListener('click', async () => {
    await initWeb3();
});

// Transfer ticket button click handler
transferTicketBtn.addEventListener('click', async () => {
    try {
        const ticketIndex = ticketIdSelect.value;
        if (ticketIndex === '') return;

        const ticketId = userTickets[ticketIndex];
        
        // Show transaction status
        transactionStatus.classList.remove('hidden');
        statusMessage.textContent = 'Processing Transfer...';
        transactionHash.textContent = '';

        // Get the nonce
        const nonce = await web3.eth.getTransactionCount(userAddress, 'latest');
        
        // Get gas price
        const gasPrice = await web3.eth.getGasPrice();
        
        // Estimate gas limit
        const gasLimit = await contract.methods.transferTicketBack(ticketId)
            .estimateGas({ from: userAddress });

        // Create transaction
        const transaction = {
            from: userAddress,
            to: contractAddress,
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            data: contract.methods.transferTicketBack(ticketId).encodeABI()
        };

        // Sign and send transaction
        const signedTx = await web3.eth.accounts.signTransaction(transaction, localStorage.getItem('privateKey'));
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        // Show transaction hash
        transactionHash.textContent = `Transaction Hash: ${receipt.transactionHash}`;
        statusMessage.textContent = 'Transfer Successful!';
        transactionStatus.querySelector('.status-icon').style.background = '#27ae60';
        
        // Reload user's tickets
        await loadUserTickets();
        
        // Reset ticket selection
        ticketIdSelect.value = '';
        updateTicketDetails('');

    } catch (error) {
        console.error('Error transferring ticket:', error);
        statusMessage.textContent = 'Transfer Failed';
        transactionStatus.querySelector('.status-icon').style.background = '#e74c3c';
        showError(error.message);
    }
});
