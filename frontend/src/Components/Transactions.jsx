const TransferMoney = (totalAmount, transferAmount) =>{
    
    if(transferAmount > totalAmount){
        return "Transfer Cannot exceed available balance"; 
    }else if(transferAmount < totalAmount){
        const balance = totalAmount - transferAmount;
        return balance; 
    }
   
}

const Transfers = {
    TransferMoney
}

export default Transfers;