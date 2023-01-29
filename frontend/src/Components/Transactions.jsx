const TransferMoney = (current, transferAmount) => {
    const balance = current - transferAmount;
    return balance; 
}

const ReceiveMoney = (current, receivedMoney) => {
    current = current + receivedMoney;
    return current; 
}

const Transfers = {
    TransferMoney,
    ReceiveMoney,
}

export default Transfers;