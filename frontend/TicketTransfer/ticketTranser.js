// Contract ABI and address (replace with your actual contract details)
const contractABI = [
    // Add your contract ABI here
];
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

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
let provider;
let signer;
let contract;
let userAddress;
let userTickets = [];

// Initialize ethers
async function initEthers() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            userAddress = await signer.getAddress();
            updateWalletStatus(true);
            await loadUserTickets();
        } catch (error) {
            console.error('Error initializing ethers:', error);
            updateWalletStatus(false);
        }
    } else {
        console.error('Please install MetaMask!');
        updateWalletStatus(false);
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
        const balance = await contract.balanceOf(userAddress);
        ticketBalance.textContent = balance.toString();
        
        // Get user's tickets
        userTickets = await contract.getUserTickets(userAddress);
        
        // Update ticket selection dropdown
        updateTicketSelection();
        
        // Enable transfer button if user has tickets
        transferTicketBtn.disabled = balance.eq(0);
    } catch (error) {
        console.error('Error loading tickets:', error);
    }
}

// Update ticket selection dropdown
function updateTicketSelection() {
    // Clear existing options
    ticketIdSelect.innerHTML = '<option value="">Select a ticket</option>';
    
    // Add ticket options
    userTickets.forEach((ticket, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Ticket #${ticket.tokenId}`;
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

    const ticket = userTickets[ticketIndex];
    
    // Get ticket details from contract
    const ticketDetails = await contract.getTicketDetails(ticket.tokenId);
    
    // Update display
    eventName.textContent = ticketDetails.eventName;
    ticketType.textContent = ticketDetails.ticketType;
    purchaseDate.textContent = new Date(ticketDetails.purchaseDate * 1000).toLocaleDateString();
    
    // Calculate refund amount (80% of original price)
    const refund = ethers.utils.formatEther(ticketDetails.price.mul(80).div(100));
    refundAmount.textContent = `${refund} ETH`;
}

// Handle ticket selection change
ticketIdSelect.addEventListener('change', () => {
    updateTicketDetails(ticketIdSelect.value);
});

// Connect wallet button click handler
connectWalletBtn.addEventListener('click', async () => {
    await initEthers();
});

// Transfer ticket button click handler
transferTicketBtn.addEventListener('click', async () => {
    try {
        const ticketIndex = ticketIdSelect.value;
        if (ticketIndex === '') return;

        const ticket = userTickets[ticketIndex];
        
        // Show transaction status
        transactionStatus.classList.remove('hidden');
        statusMessage.textContent = 'Processing Transfer...';
        transactionHash.textContent = '';

        // Send transfer transaction
        const tx = await contract.transferTicketBack(ticket.tokenId);

        // Show transaction hash
        transactionHash.textContent = `Transaction Hash: ${tx.hash}`;
        statusMessage.textContent = 'Transfer Submitted!';

        // Wait for transaction confirmation
        const receipt = await tx.wait();
        
        // Update status
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
    }
});
