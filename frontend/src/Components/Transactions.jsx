const TransferMoney = (current, transferAmount) => {
    const balance = current - transferAmount;
    return balance; 
}

const ReceiveMoney = (current, receivedMoney) => {
    current = current + receivedMoney;
    return current; 
}

const DepositMoney = (current, receivedMoney) => {
    current = current + receivedMoney;
    return current; 
}

const WithdrawMoney = (current, transferAmount) => {
    const balance = current - transferAmount;
    return balance; 
}


const Transfers = {
    TransferMoney,
    ReceiveMoney,
    DepositMoney,
    WithdrawMoney
}

export default Transfers;