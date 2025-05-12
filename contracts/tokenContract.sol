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

    struct Event {
        string name;
        uint256 price;
        uint256 maxTickets;
        uint256 ticketsSold;
        bool isActive;
    }

    struct Ticket {
        uint256 eventId;
        uint256 purchaseTime;
        bool isValid;
    }

    mapping(uint256 => Event) public events;
    mapping(uint256 => Ticket) public tickets;
    mapping(address => uint256[]) public userTickets;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    event EventCreated(uint256 indexed eventId, string name, uint256 price, uint256 maxTickets);
    event TicketPurchased(address indexed buyer, uint256 indexed eventId, uint256 ticketId, uint256 price);
    event TicketReturned(address indexed seller, uint256 indexed eventId, uint256 ticketId, uint256 refundAmount);

    uint256 public nextEventId;
    uint256 public nextTicketId;

    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        owner = msg.sender;
    }

    // IERC20 standard
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

    function allowance(address _owner, address spender) external view override returns (uint256) {
        return _allowances[_owner][spender];
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

    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(_balances[sender] >= amount, "ERC20: transfer amount exceeds balance");

        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }

    function _approve(address _owner, address spender, uint256 amount) internal {
        require(_owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[_owner][spender] = amount;
        emit Approval(_owner, spender, amount);
    }

    // Event Functions
    function createEvent(string memory _name, uint256 _price, uint256 _maxTickets) external {
        require(msg.sender == owner, "Only owner can create events");
        require(_maxTickets > 0, "Max tickets must be greater than 0");

        events[nextEventId] = Event(_name, _price, _maxTickets, 0, true);
        emit EventCreated(nextEventId, _name, _price, _maxTickets);
        nextEventId++;
    }

    function purchaseTicket(uint256 eventId) external payable {
        Event storage event_ = events[eventId];
        require(event_.isActive, "Event is not active");
        require(event_.ticketsSold < event_.maxTickets, "Event is sold out");
        require(msg.value >= event_.price, "Insufficient ETH sent");

        uint256 ticketId = nextTicketId++;
        tickets[ticketId] = Ticket(eventId, block.timestamp, true);
        userTickets[msg.sender].push(ticketId);
        event_.ticketsSold++;

        _balances[msg.sender]++;
        _totalSupply++;

        if (msg.value > event_.price) {
            payable(msg.sender).transfer(msg.value - event_.price);
        }

        emit TicketPurchased(msg.sender, eventId, ticketId, event_.price);
    }

    function returnTicket(uint256 ticketId) external {
        Ticket storage ticket = tickets[ticketId];
        require(ticket.isValid, "Ticket is already invalid");
        require(_balances[msg.sender] > 0, "No tickets to return");

        uint256 refundAmount = (events[ticket.eventId].price * 80) / 100;
        ticket.isValid = false;

        _balances[msg.sender]--;
        _totalSupply--;

        // remove ticket from userTickets
        uint256[] storage tix = userTickets[msg.sender];
        for (uint256 i = 0; i < tix.length; i++) {
            if (tix[i] == ticketId) {
                tix[i] = tix[tix.length - 1];
                tix.pop();
                break;
            }
        }

        payable(msg.sender).transfer(refundAmount);
        emit TicketReturned(msg.sender, ticket.eventId, ticketId, refundAmount);
    }

    function verifyTicket(address holder, uint256 ticketId) external view returns (bool) {
        return tickets[ticketId].isValid && _balances[holder] > 0;
    }

    function getTicketDetails(address holder) external view returns (
        uint256 balance,
        uint256[] memory ticketIds,
        string[] memory eventNames,
        uint256[] memory purchaseTimes
    ) {
        balance = _balances[holder];
        ticketIds = userTickets[holder];

        eventNames = new string[](ticketIds.length);
        purchaseTimes = new uint256[](ticketIds.length);

        for (uint256 i = 0; i < ticketIds.length; i++) {
            Ticket memory t = tickets[ticketIds[i]];
            eventNames[i] = events[t.eventId].name;
            purchaseTimes[i] = t.purchaseTime;
        }
    }

    function withdrawFunds() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}