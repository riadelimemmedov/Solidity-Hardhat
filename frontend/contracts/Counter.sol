// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


//Counter
contract Counter{
    uint public count;

    function get() public view returns(uint){
        return count;
    }

    function inc() public{
        count+=1;
    }

    function dec() public{
        require(count > 0,'underflow');
        count-=1;
    }
}