const contractABI = [
    {
        "inputs": [
            {"internalType": "uint256", "name": "ticketPrice", "type": "uint256"},
            {"internalType": "uint256", "name": "initialTickets", "type": "uint256"}
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
            {"indexed": true, "internalType": "address", "name": "spender", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "buyer", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "TicketPurchased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "holder", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "TicketReturned",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
            {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "owner", "type": "address"},
            {"internalType": "address", "name": "spender", "type": "address"}
        ],
        "name": "allowance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "spender", "type": "address"},
            {"internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "ticketAmount", "type": "uint256"}],
        "name": "buyTicket",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "ticketAmount", "type": "uint256"}],
        "name": "returnTicket",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ticketPriceInWei",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "recipient", "type": "address"},
            {"internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "transfer",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address", "name": "sender", "type": "address"},
            {"internalType": "address", "name": "recipient", "type": "address"},
            {"internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "transferFrom",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "vendor",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const contractAddress = "0xAA6819E521379AC39A3CD779b406d1657205C1aB";
const infuraProjectId = "5bbf9e76a9264d73a203e76c47bdac64";

let web3;
let contract;
let currentRole = 'attendee';
let isInitialized = false;


async function init() {
    console.log("Starting initialization...");
    try {
        const infuraUrl = "https://sepolia.infura.io/v3/5bbf9e76a9264d73a203e76c47bdac64";
        console.log("Connecting to:", infuraUrl);
        web3 = new Web3(infuraUrl);
        console.log("Web3 initialized, version:", web3.version);
        console.log("Attempting to create contract with address:", contractAddress);
        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("Contract initialized successfully");
        isInitialized = true;
    } catch (error) {
        showError("Error connecting to network: " + error.message);
        console.error("Init error details:", error);
    }
}

// 3 actors
document.querySelectorAll('.role-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentRole = button.dataset.role;
        updateUIForRole();
    });
});


function updateUIForRole() {
    const walletInput = document.querySelector('.wallet-input');
    const balanceDetails = document.getElementById('balanceDetails');
    const ticketDetails = document.getElementById('ticketDetails');
    

    walletInput.style.display = 'none';
    balanceDetails.classList.add('hidden');
    ticketDetails.classList.add('hidden');
    
    switch (currentRole) {
        case 'attendee':
            walletInput.style.display = 'block';
            document.getElementById('walletAddress').placeholder = "Enter your wallet address";
            break;
            
        case 'doorman':
            walletInput.style.display = 'block';
            document.getElementById('walletAddress').placeholder = "Enter attendee's wallet address";
            break;
            
        case 'venue':
            walletInput.style.display = 'none';
            checkVenueDistribution();
            break;
    }
}

//check balances with role-specific behaviour for 3 actors
document.getElementById('checkBalanceBtn').addEventListener('click', async () => {
    if (!isInitialized || !contract) {
        showError("Contract not initialized. Please try again later.");
        return;
    }

    const address = document.getElementById('walletAddress').value.trim();
    console.log("Checking balance for address:", address);
    if (!web3.utils.isAddress(address)) {
        showError("Please enter a valid Ethereum address");
        return;
    }

    
    let checksummedAddress;
    try {
        checksummedAddress = web3.utils.toChecksumAddress(address);
        console.log("Checksummed address:", checksummedAddress);
    } catch (error) {
        showError("Invalid address checksum: " + error.message);
        return;
    }

    try {
       
        const code = await web3.eth.getCode(contractAddress);
        if (code === '0x' || code === '') {
            throw new Error('Contract is not deployed at the specified address');
        }
        console.log("Contract code exists at address");

        console.log("Fetching ETH balance...");
        const ethBalance = await web3.eth.getBalance(checksummedAddress);
        console.log("ETH balance fetched:", ethBalance);
        document.getElementById('ethBalance').textContent = 
            `${web3.utils.fromWei(ethBalance, 'ether')} ETH`;

        console.log("Calling balanceOf with address:", checksummedAddress);
        const ticketBalance = await contract.methods.balanceOf(checksummedAddress).call();
        console.log("Ticket balance fetched:", ticketBalance);
        

        if (currentRole === 'doorman') {
            document.getElementById('ticketBalance').textContent = 
                ticketBalance > 0 ? "Valid Ticket Holder" : "No Valid Tickets";
            document.getElementById('ticketDetails').classList.remove('hidden');
            document.getElementById('ticketDetails').innerHTML = `
                <h3>Ticket Verification</h3>
                <p>Status: ${ticketBalance > 0 ? "✅ Valid" : "❌ Invalid"}</p>
                <p>Number of Tickets: ${ticketBalance}</p>
            `;
        } else {
            document.getElementById('ticketBalance').textContent = 
                `${ticketBalance} Tickets`;
        }

        document.getElementById('balanceDetails').classList.remove('hidden');
        document.getElementById('errorMessage').classList.add('hidden');
    } catch (error) {
        console.error("Detailed error:", error);
        if (error.message.includes("Out of Gas")) {
            showError("Transaction would run out of gas. This might indicate a problem with the contract or network.");
        } else if (error.message.includes("not deployed")) {
            showError("The contract is not deployed at the specified address. Please verify the contract address.");
        } else {
            showError("Error checking balances: " + error.message);
        }
    }
});


async function checkVenueDistribution() {
    if (!isInitialized || !contract) {
        showError("Contract not initialized. Please try again later.");
        return;
    }

    try {
        //getting the contract details
        const totalSupply = await contract.methods.totalSupply().call();
        const vendorAddress = await contract.methods.vendor().call();
        const availableTickets = await contract.methods.balanceOf(vendorAddress).call();
        const distributedTickets = totalSupply - availableTickets;
        const contractBalance = await web3.eth.getBalance(contractAddress);
        const ticketPrice = await contract.methods.ticketPriceInWei().call();

        
        document.getElementById('ethBalance').textContent = 
            `${web3.utils.fromWei(contractBalance, 'ether')} ETH`;
        document.getElementById('ticketBalance').textContent = 
            `${distributedTickets} Tickets Distributed`;
        
       
        const ticketDetails = document.getElementById('ticketDetails');
        ticketDetails.classList.remove('hidden');
        ticketDetails.innerHTML = `
            <h3>Venue Details</h3>
            <div class="venue-details">
                <p>Total Tickets Created: ${totalSupply}</p>
                <p>Available Tickets: ${availableTickets}</p>
                <p>Distributed Tickets: ${distributedTickets}</p>
                <p>Ticket Price: ${web3.utils.fromWei(ticketPrice, 'ether')} ETH</p>
                <p>Vendor Address: ${vendorAddress}</p>
            </div>
        `;
        
        document.getElementById('balanceDetails').classList.remove('hidden');
        document.getElementById('errorMessage').classList.add('hidden');
    } catch (error) {
        showError("Error checking distribution: " + error.message);
        console.error("Venue distribution error:", error);
    }
}


function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    document.getElementById('balanceDetails').classList.add('hidden');
}


window.addEventListener('load', async () => {
    await init();
    //test Infura sync
    try {
        const blockNumber = await web3.eth.getBlockNumber();
        console.log("Infura block number:", blockNumber);
    } catch (error) {
        console.error("Infura sync test failed:", error.message);
    }
});