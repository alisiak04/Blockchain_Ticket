// Contract ABI - This should match your deployed contract
const contractABI = [
    // Add your contract ABI here
];

// Contract address - Replace with your deployed contract address
const contractAddress = "YOUR_CONTRACT_ADDRESS";

let web3;
let contract;
let currentRole = 'attendee';

// Initialize Web3 and contract
async function init() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        showError("Please install MetaMask to use this feature");
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
