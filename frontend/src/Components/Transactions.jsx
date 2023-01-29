const TransferMoney = (current, transferAmount) => {
    console.log(current || transferAmount);
    const balance = current - transferAmount;
    return balance; 
}

const ReceiveMoney = (current, receivedMoney) => {
    console.log(current || receivedMoney);
     current = current + receivedMoney;
    return current; 
}

const Transfers = {
    TransferMoney,
    ReceiveMoney,
}

export default Transfers;