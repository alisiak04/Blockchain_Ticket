const config = {
    contractAddress: "YOUR_DEPLOYED_CONTRACT_ADDRESS", // This will be set when contract is deployed
    infuraKey: "YOUR_INFURA_KEY",
    network: "sepolia",
    ticketPrice: "0.1" // in ETH
};

// Function to update contract address after deployment
function updateContractAddress(address) {
    config.contractAddress = address;
    localStorage.setItem('contractAddress', address);
}

// Function to get contract address (either from config or localStorage)
function getContractAddress() {
    return localStorage.getItem('contractAddress') || config.contractAddress;
}

// Function to get Infura key
function getInfuraKey() {
    return config.infuraKey;
}

// Function to get network
function getNetwork() {
    return config.network;
}

// Function to get ticket price
function getTicketPrice() {
    return config.ticketPrice;
} 