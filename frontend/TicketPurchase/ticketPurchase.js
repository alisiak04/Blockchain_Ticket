// Contract ABI and address (replace with your actual contract details)
const contractABI = [
    // Add your contract ABI here
];
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

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
let provider;
let signer;
let contract;
let userAddress;
const ticketPrice = ethers.utils.parseEther('0.1'); // 0.1 ETH per ticket

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
            updatePurchaseButton();
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
    const total = ticketPrice.mul(quantity);
    quantityDisplay.textContent = quantity;
    totalPrice.textContent = `${ethers.utils.formatEther(total)} ETH`;
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
    await initEthers();
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
        const totalAmount = ticketPrice.mul(quantity);

        // Send transaction
        const tx = await contract.purchaseTicket(eventName, ticketType, quantity, {
            value: totalAmount
        });

        // Show transaction hash
        transactionHash.textContent = `Transaction Hash: ${tx.hash}`;
        statusMessage.textContent = 'Transaction Submitted!';

        // Wait for transaction confirmation
        const receipt = await tx.wait();
        
        // Update status
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
    }
});

// Initialize price display
updatePriceDisplay();
