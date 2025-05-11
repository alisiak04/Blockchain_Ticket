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
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 private _totalSupply;
    address public owner;
    
    // Ticket specific variables
    uint256 public constant TICKET_PRICE = 0.1 ether; // Price in SETH -> per ticket? should i let doorman handle this
    uint256 public constant MAX_TICKETS = 1000;  // check if i can use this , should i limit tickets maybe for certain events!!!
    mapping(uint256 => bool) public isValidTicket;
    
    // Standard ERC20 mappings
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    
    // Ticket specific events
    event TicketPurchased(address indexed buyer, uint256 ticketId, uint256 amount);
    event TicketReturned(address indexed seller, uint256 ticketId, uint256 amount);
    
    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        owner = msg.sender;
        
        // Mint initial supply of tickets to contract
        _totalSupply = MAX_TICKETS;
        _balances[address(this)] = _totalSupply;
        emit Transfer(address(0), address(this), _totalSupply);
    }
    
    // Standard ERC20 functions
    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }
    
    function balanceOf(address account) external view override returns (uint256) {
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
        require(_allowances[sender][msg.sender] >= amount, "ERC20: transfer amount exceeds allowance");
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender] - amount);
        return true;
    }
    
    // Internal functions
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(_balances[sender] >= amount, "ERC20: transfer amount exceeds balance");
        
        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }
    
    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");
        
        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    
    // Ticket specific functions
    function purchaseTicket() external payable {    // not sure if i should handle ticket methods in smart contract 
        require(msg.value >= TICKET_PRICE, "Insufficient SETH sent");
        require(_balances[address(this)] > 0, "No tickets available");
        
        // Calculate ticket ID
        uint256 ticketId = MAX_TICKETS - _balances[address(this)];
        
        // Transfer one ticket to the buyer
        _transfer(address(this), msg.sender, 1);
        isValidTicket[ticketId] = true;
        
        // Refund excess SETH if any
        if (msg.value > TICKET_PRICE) {
            payable(msg.sender).transfer(msg.value - TICKET_PRICE);
        }
        
        emit TicketPurchased(msg.sender, ticketId, TICKET_PRICE);
    }
    
    function returnTicket() external {
        require(_balances[msg.sender] > 0, "No tickets to return");
        
        uint256 ticketId = MAX_TICKETS - _balances[address(this)] - 1;
        require(isValidTicket[ticketId], "Ticket already returned");
        
        // Transfer ticket back to contract
        _transfer(msg.sender, address(this), 1);
        isValidTicket[ticketId] = false;
        
        // Refund the ticket price
        payable(msg.sender).transfer(TICKET_PRICE);
        
        emit TicketReturned(msg.sender, ticketId, TICKET_PRICE);
    }
    
    function verifyTicket(address holder) external view returns (bool) {
        return _balances[holder] > 0;
    }
    
    function getTicketDetails(address holder) external view returns (
        uint256 balance,
        uint256[] memory ticketIds
    ) {
        balance = _balances[holder];
        ticketIds = new uint256[](balance);
        
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < MAX_TICKETS; i++) {
            if (isValidTicket[i]) {
                ticketIds[currentIndex] = i;
                currentIndex++;
                if (currentIndex == balance) break;
            }
        }
    }
    
    // Function to withdraw contract's SETH balance (only owner)
    function withdrawFunds() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}