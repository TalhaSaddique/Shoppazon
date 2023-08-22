// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

contract Shoppazon {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action.");
        _;
    }

    event List(uint256 itemId, string name, uint256 cost, uint256 stock);
    event Buy(address buyer, uint256 orderId, uint256 itemId);

    struct Item {
        uint256 id;
        address seller;
        string name;
        string description;
        string category;
        string image;
        uint256 cost;
        uint256 stock;
    }

    struct Order {
        uint256 time;
        Item item;
    }

    Item[] public items;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;
    mapping(address => bool) public sellers; // Mapping to track individual sellers

    constructor() {
        owner = msg.sender;
        sellers[msg.sender] = true; // Owner is automatically a seller
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getItems() public view returns (Item[] memory) {
        return items;
    }

    function list(
        string memory _name,
        string memory _description,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _stock
    ) public {
        require(sellers[msg.sender], "You must be a registered seller to perform this action.");
        uint256 itemId = items.length;
        // Create Item Struct
        Item memory item = Item(itemId, msg.sender, _name, _description, _category, _image, _cost, _stock);
        // Save the item struct to Blockchain
        items.push(item);
        // emit list event
        emit List(itemId, _name, _cost, _stock);
    }

    function buy(uint256 _id) public payable {
        require(_id < items.length, "Invalid item ID.");
        // Fetch Item
        Item storage item = items[_id];
        require(item.stock > 0, "Item out of stock.");
        require(msg.value == item.cost, "Insufficient funds.");
        // Create an Order
        Order memory order = Order(block.timestamp, item);
        // Add order for user
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        // Subtract Stock
        item.stock--;
        // emit buy event
        emit Buy(msg.sender, orderCount[msg.sender], _id);
    }

    function updateProduct(
        uint256 _itemId,
        string memory _name,
        string memory _category,
        string memory _description,
        string memory _image,
        uint256 _cost,
        uint256 _stock
    ) public {
        require(_itemId < items.length, "Invalid item ID.");
            require( msg.sender == owner || msg.sender == items[_itemId].seller, "You are not authorized to perform this action. ");
        Item storage item = items[_itemId];
        item.name = _name;
        item.category = _category;
        item.description = _description;
        item.image = _image;
        item.cost = _cost;
        item.stock = _stock;
    }

    function removeProduct(uint256 _itemId) public {
        require(_itemId < items.length, "Invalid item ID.");
        require( msg.sender == owner || msg.sender == items[_itemId].seller, "You are not authorized to perform this action. ");

        // Mark the item as removed by setting it to 0
        items[_itemId].stock = 0;
        items[_itemId].name = "";
        items[_itemId].description = "";
        items[_itemId].category = "";
        items[_itemId].image = "";
        items[_itemId].cost = 0;
    }

  function becomeSeller() public payable {
    require(msg.value == 50000000000000000, "You must pay 0.05 ETH to become a seller.");
    require(!sellers[msg.sender], "You are already a registered seller.");

    sellers[msg.sender] = true;
}


    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed.");
    }
}
