// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract TicketToken is IERC20 {
    string public name = "EventTicketToken";
    string public symbol = "ETT";
    uint8 public decimals = 0; // 1 token = 1 ticket
    uint256 private _totalSupply;
    uint256 public ticketPriceInWei; // Price in Sepolia ETH

    address public vendor;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    event TicketPurchased(address indexed buyer, uint256 amount);
    event TicketReturned(address indexed holder, uint256 amount);

    constructor(uint256 ticketPrice, uint256 initialTickets) {
        vendor = msg.sender;
        ticketPriceInWei = ticketPrice; // e.g., 0.01 ETH = 10^16 wei
        _totalSupply = initialTickets;
        _balances[vendor] = initialTickets;
        emit Transfer(address(0), vendor, initialTickets);
    }

    // ERC-20 standard functions
    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) external override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) external view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) external override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender] - amount);
        return true;
    }

    // Buy a ticket by sending SETH to contract
    function buyTicket(uint256 ticketAmount) external payable {
        require(ticketAmount > 0, "Invalid ticket amount");
        require(msg.value == ticketAmount * ticketPriceInWei, "Incorrect ETH value");
        require(_balances[vendor] >= ticketAmount, "Not enough tickets available");

        _balances[vendor] -= ticketAmount;
        _balances[msg.sender] += ticketAmount;
        emit Transfer(vendor, msg.sender, ticketAmount);
        emit TicketPurchased(msg.sender, ticketAmount);
    }

    // Return ticket and get ETH refund
    function returnTicket(uint256 ticketAmount) external {
        require(_balances[msg.sender] >= ticketAmount, "You don't have enough tickets");

        _balances[msg.sender] -= ticketAmount;
        _balances[vendor] += ticketAmount;
        payable(msg.sender).transfer(ticketAmount * ticketPriceInWei);
        emit Transfer(msg.sender, vendor, ticketAmount);
        emit TicketReturned(msg.sender, ticketAmount);
    }

    // Withdraw funds (only vendor)
    function withdraw() external {
        require(msg.sender == vendor, "Only vendor can withdraw");
        payable(vendor).transfer(address(this).balance);
    }

    // Internal functions
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "Zero address sender");
        require(recipient != address(0), "Zero address recipient");
        require(_balances[sender] >= amount, "Insufficient balance");

        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }

    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "Zero address owner");
        require(spender != address(0), "Zero address spender");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
}