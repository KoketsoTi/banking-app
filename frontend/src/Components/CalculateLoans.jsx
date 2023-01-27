//Calculate Short-Term Loan amount 
const calcShortTerm = (setamt, inter, loanterm) =>{
    const term = (loanterm/12)
    const interest = 1 + (inter / 100 * term); 
    const totalpayment = setamt * interest;
    return totalpayment; 
}

const calcLongTerm = (setamt, inter, loanterm) =>{
    const term = (loanterm/12);
    const totalpayment = setamt * Math.pow((1 + (inter/100)), term);
    return totalpayment;
}

const interestpaid = (setamt, totalAmt) => {
    const totalInterest = totalAmt - setamt; 
    return totalInterest;  
}

const monthly = (totalAmt, loanterm) => {
    const monthlypayment = totalAmt/loanterm; 
    return monthlypayment; 
}

const Calculations = {
    calcShortTerm,
    calcLongTerm,
    interestpaid,
    monthly,
    calcLongTerm
}

export default Calculations;