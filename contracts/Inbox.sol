pragma solidity ^0.4.17;

contract Inbox {
    string public message; 
    // creating a public variable will auto create a getter function for this variable
    uint256 public calledTimes;
    
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        calledTimes ++;
        message = newMessage;
    }
    
    function getMessage() public view returns (string) {
        return message;
    }
    
    
    function getCalledTimes() public view returns (uint256) {
        return calledTimes;
    }
    
}
