// Contract ABI and address 
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
            {"indexed": true, "internalType": "address", "name": "buyer", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "TicketPurchased",
        "type": "event"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "ticketAmount", "type": "uint256"}],
        "name": "buyTicket",
        "outputs": [],
        "stateMutability": "payable",
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
        "inputs": [],
        "name": "ticketPriceInWei",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = "0xAA6819E521379AC39A3CD779b406d1657205C1aB";
const infuraUrl = "https://sepolia.infura.io/v3/5bbf9e76a9264d73a203e76c47bdac64";

//DOM Elements
const connectWalletBtn = document.getElementById('connectWallet');
const purchaseTicketBtn = document.getElementById('purchaseTicket');
const walletStatus = document.getElementById('walletStatus');
const transactionStatus = document.getElementById('transactionStatus');
const statusMessage = document.getElementById('statusMessage');
const transactionHash = document.getElementById('transactionHash');
const walletAddressInput = document.getElementById('walletAddress');
const privateKeyInput = document.getElementById('privateKey');

let web3;
let contract;
let userAddress;
let account;

async function initWeb3() {
    try {
        console.log('Starting Web3 initialization...');
        
        //connecting to Sepolia network
        web3 = new Web3(infuraUrl);
        console.log('Web3 instance created');
        
        const walletAddress = walletAddressInput.value.trim();
        const privateKey = privateKeyInput.value.trim();
        
        console.log('Wallet address:', walletAddress);
        console.log('Private key length:', privateKey.length);
        
        if (!walletAddress) {
            console.log('No wallet address provided');
            showError('Please enter your wallet address');
            return false;
        }

        if (!privateKey) {
            console.log('No private key provided');
            showError('Please enter your private key');
            return false;
        }

        if (!web3.utils.isAddress(walletAddress)) {
            console.log('Invalid wallet address format');
            showError('Please enter a valid Ethereum address');
            return false;
        }

        console.log('Verifying private key...');
        //verify private key matches address
        const derivedAddress = web3.eth.accounts.privateKeyToAccount(privateKey).address;
        console.log('Derived address:', derivedAddress);
        console.log('Input address:', walletAddress);
        
        if (derivedAddress.toLowerCase() !== walletAddress.toLowerCase()) {
            console.log('Private key does not match wallet address');
            showError('Private key does not match wallet address');
            return false;
        }

        console.log('Adding account to web3...');
        account = web3.eth.accounts.privateKeyToAccount(privateKey);
        web3.eth.accounts.wallet.add(account);
        
        console.log('Creating contract instance...');
        contract = new web3.eth.Contract(contractABI, contractAddress);
        userAddress = walletAddress;
        
        console.log('Checking ticket balance...');
        //check if user already has a ticket
        const ticketBalance = await contract.methods.balanceOf(userAddress).call();
        console.log('Ticket balance:', ticketBalance);
        
        if (ticketBalance > 0) {
            console.log('User already has a ticket');
            showError('You already have a ticket');
            purchaseTicketBtn.disabled = true;
        }
        
        updateWalletStatus(true);
        updatePurchaseButton();
        console.log('Wallet connection successful');
        return true;
    } catch (error) {
        console.error('Detailed error in initWeb3:', error);
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

function updatePurchaseButton() {
    if (!web3 || !account) {
        purchaseTicketBtn.disabled = true;
        return;
    }
    purchaseTicketBtn.disabled = false;
}

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    document.querySelector('.ticket-form').prepend(errorElement);
    setTimeout(() => errorElement.remove(), 5000);
}

connectWalletBtn.addEventListener('click', async () => {
    console.log('Connect wallet button clicked');
    const success = await initWeb3();
    console.log('Connection result:', success);
});

purchaseTicketBtn.addEventListener('click', async () => {
    try {
        //showing transaction status
        transactionStatus.classList.remove('hidden');
        statusMessage.textContent = 'Processing Transaction...';
        transactionHash.textContent = '';

        //ticket price from contract
        const ticketPriceInWei = await contract.methods.ticketPriceInWei().call();
        console.log("Ticket price in wei:", ticketPriceInWei);
        const nonce = await web3.eth.getTransactionCount(userAddress, 'latest');
        const gasPrice = await web3.eth.getGasPrice();
        
        const gasLimit = await contract.methods.buyTicket(1)
            .estimateGas({ from: userAddress, value: ticketPriceInWei });

        //create transaction
        const transaction = {
            from: userAddress,
            to: contractAddress,
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            value: ticketPriceInWei,
            data: contract.methods.buyTicket(1).encodeABI()
        };

        console.log("Transaction details:", {
            from: userAddress,
            to: contractAddress,
            value: web3.utils.fromWei(ticketPriceInWei, 'ether') + " ETH",
            gasLimit: gasLimit
        });

        //Sending transaction using the account
        const receipt = await web3.eth.sendTransaction(transaction);

        //Show transaction hash
        transactionHash.textContent = `Transaction Hash: ${receipt.transactionHash}`;
        statusMessage.textContent = 'Ticket Purchased Successfully!';
        transactionStatus.querySelector('.status-icon').style.background = '#27ae60';
        
        //disable purchase button after a successful purchase
        purchaseTicketBtn.disabled = true;
        showError('You have successfully purchased your ticket');

    } catch (error) {
        console.error('Error purchasing ticket:', error);
        statusMessage.textContent = 'Transaction Failed';
        transactionStatus.querySelector('.status-icon').style.background = '#e74c3c';
        showError(error.message);
    }
});
