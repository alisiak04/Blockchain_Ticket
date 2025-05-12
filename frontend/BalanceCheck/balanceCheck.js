// Contract ABI - This should match your deployed contract
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

// Contract address - Replace with your deployed contract address
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace this with your actual deployed contract address

let web3;
let contract;
let currentRole = 'attendee';

// Initialize Web3 and contract
async function init() {
    try {
        // Connect to Sepolia network
        web3 = new Web3('https://sepolia.infura.io/v3/YOUR_INFURA_KEY');
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } catch (error) {
        showError("Error connecting to network: " + error.message);
    }
}

// Handle role selection
document.querySelectorAll('.role-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentRole = button.dataset.role;
        updateUIForRole();
    });
});

// Update UI based on selected role
function updateUIForRole() {
    const walletInput = document.querySelector('.wallet-input');
    switch(currentRole) {
        case 'attendee':
            walletInput.style.display = 'block';
            break;
        case 'doorman':
            walletInput.style.display = 'block';
            break;
        case 'venue':
            walletInput.style.display = 'none';
            checkVenueDistribution();
            break;
    }
}

// Check balances
document.getElementById('checkBalanceBtn').addEventListener('click', async () => {
    const address = document.getElementById('walletAddress').value;
    if (!web3.utils.isAddress(address)) {
        showError("Please enter a valid Ethereum address");
        return;
    }

    try {
        // Get ETH balance
        const ethBalance = await web3.eth.getBalance(address);
        document.getElementById('ethBalance').textContent = 
            `${web3.utils.fromWei(ethBalance, 'ether')} ETH`;

        // Get ticket balance
        const ticketBalance = await contract.methods.balanceOf(address).call();
        document.getElementById('ticketBalance').textContent = 
            `${ticketBalance} Tickets`;

        // Get ticket details if balance > 0
        if (ticketBalance > 0) {
            const ticketDetails = await contract.methods.getTicketDetails(address).call();
            displayTicketDetails(ticketDetails);
        } else {
            document.getElementById('ticketDetails').classList.add('hidden');
        }

        document.getElementById('balanceDetails').classList.remove('hidden');
        document.getElementById('errorMessage').classList.add('hidden');
    } catch (error) {
        showError("Error checking balances: " + error.message);
    }
});

// Display ticket details
function displayTicketDetails(ticketDetails) {
    const ticketList = document.getElementById('ticketList');
    ticketList.innerHTML = '';
    
    ticketDetails.ticketIds.forEach((ticketId, index) => {
        const ticketElement = document.createElement('div');
        ticketElement.className = 'ticket-item';
        ticketElement.textContent = `Ticket #${ticketId}`;
        ticketList.appendChild(ticketElement);
    });

    document.getElementById('ticketDetails').classList.remove('hidden');
}

// Check venue distribution
async function checkVenueDistribution() {
    try {
        const totalSupply = await contract.methods.totalSupply().call();
        const availableTickets = await contract.methods.balanceOf(contractAddress).call();
        const distributedTickets = totalSupply - availableTickets;

        document.getElementById('ethBalance').textContent = 
            `${web3.utils.fromWei(await web3.eth.getBalance(contractAddress), 'ether')} ETH`;
        document.getElementById('ticketBalance').textContent = 
            `${distributedTickets} Tickets Distributed`;
        
        document.getElementById('balanceDetails').classList.remove('hidden');
        document.getElementById('ticketDetails').classList.add('hidden');
    } catch (error) {
        showError("Error checking distribution: " + error.message);
    }
}

// Show error message
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

// Initialize when page loads
window.addEventListener('load', init);
