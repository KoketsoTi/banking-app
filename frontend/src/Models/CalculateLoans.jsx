//Calculate loans amount 
const calcShortTerm = (setamt, inter, loanterm) =>{
    const term = loanterm/12
    const interest = 1 + inter / 100; 
    const totalpayment = setamt * interest * term;
    return totalpayment; 
}

const calcLongTerm = () =>{
    const totalpayment = 0;
    return totalpayment;
}

const interestpaid = (setamt, totalAmt) => {
    const totalInterest = totalAmt - setamt; 
    return totalInterest;  
}

const monthly = (totalAmt, loanterm) => {
    const term = loanterm/12
    const monthlypayment = totalAmt/term; 
    return monthlypayment; 
}


const calculate_interest = (data) => {
    console.log(data)
}

const Calculations = {
    calcShortTerm,
    calcLongTerm,
    interestpaid,
    monthly,
    calculate_interest
}

export default Calculations;






// const calcLongTerm = () =>{
//     const amountLoaned = setamt; 
//     const interest = inter; 
//     const totalpayment = amountLoaned * (1+ interest/12)^(12*loanterm)-amountLoaned;
//     const totmonthly = amountLoaned * ( Math.pow((1+ (interest/12)),(12*loanterm)));
//     const interestUnpaid = totalpayment - amountLoaned;
//     const monthlypayment = totalpayment/loanterm;
    






// const calcTotal = () =>{
//     const amountLoaned = setamt; 
//     const interest = inter; 
    // const totalpayment = amountLoaned * (1+ interest/12)^(12*loanterm)-amountLoaned;
    // const totmonthly = amountLoaned * ( Math.pow((1+ (interest/12)),(12*loanterm)));
    // const interestUnpaid = totalpayment - amountLoaned;
    // const monthlypayment = totalpayment/loanterm; 
//}