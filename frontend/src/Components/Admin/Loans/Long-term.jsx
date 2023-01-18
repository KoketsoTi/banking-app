import React, { useState } from 'react';
import './Loans.css';
import { Box, Typography, Button} from "@mui/material";

import { dataLoans } from '../../../Data/mockedData';
import { AiOutlineEye, AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Datagrid } from '../../../Models/RenderLoans'

function LongTerm(){
    const navigate = useNavigate();

//For loans
const [loanAmount, setLoanAmount] = useState(0);
const [interestRate, setInterestRate] = useState(0);
const [loanTerm, setLoanTerm] = useState(0);
const [monthlyPayment, setMonthlyPayment] = useState(0);
const [unpaidInterest, setunpaidInterest] = useState(0);

const calculateLoan = () =>{
  const loanAmount = dataLoans.loanAmnt; //20 0000
  const interest = 1 + dataLoans.interestRate / 100; //12% 1.12
  // Calculate the monthly interest rate
  const monthlyInterest = interest / 12; // 0.0933
    // Calculate the number of months in the loan term
  const termInMonths = loanTerm * 12; //

    // Calculate the monthly payment
  const payment = loanAmount * (monthlyInterest / (1 - Math.pow((1 + monthlyInterest), -termInMonths)));
  
 setMonthlyPayment(payment);

}

    const columns = [
    {field:"id", headerName: "ID", flex: 0.5},
    {field:"accNumber", headerName: "Account Number", flex: 0.5},
    {field:"fname", headerName: "Fname", flex: 1},
    {field:"lname", headerName: "Lname", flex: 1},
    {field:"loanAmnt", headerName: "Loan Amount", flex: 1},
    {field:"loanType", headerName: "Loan Type", flex: 1},
    {field:"status", headerName: "Status", flex: 1},
    {field:"loanTerm", headerName: "Term", flex: 1},
    { 
        field: 'edit',
        headerName: '',
        sortable: false,

        renderCell: (params) => {
          const onClick = (e) => {
            e.stopPropagation(); // don't select this row after clicking
            console.log(params);
            navigate(`/admin/approveLoans/${params.id}`)
          };

          return <Button style={{background: "#4cceac", color:"#141b2d"}} onClick={ onClick}><AiOutlineEye style={{fontSize:"15px", marginRight:"5px"}}/>View</Button>
        },
    },
    {
        field: 'suspend',
        headerName: '',
        sortable: false,

        renderCell: (params) => {
          const onClick = (e) => {
            e.stopPropagation(); // don't select this row after clicking
            console.log(params);

          };

          return <Button style={{background: "#FF5823", color:"#F9F9F9"}} onClick={ onClick}><AiOutlineCloseCircle style={{marginTop: "3px", marginRight:"5px"}}/>Suspend</Button>
        },
    },

    {
        field: 'delete',
        headerName: '',
        sortable: false,

        renderCell: (params) => {
          const onClick = (e) => {
            e.stopPropagation(); // don't select this row after clicking
            console.log(params);

          };

          return <Button style={{background: "#FF5823", color:"#F9F9F9"}} onClick={ onClick}><AiOutlineCloseCircle style={{marginTop: "3px", marginRight:"5px"}}/>Delete</Button>
        },
    }

    ]

    return (
        <Box m="20px" >
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box mb="30px">
                <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> Long Term Loans </Typography>
            </Box>
        </Box>
        
        {/* Data in a table using Datagrid for creating a table  */}
          <Datagrid  
            row={dataLoans}
            column={columns} 
            isloading={!dataLoans.length} />
    </Box>
    );
}

export default LongTerm;