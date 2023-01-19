import React, { useEffect, useState } from 'react';
import './Loans.css';
import { Box, Typography, Button} from "@mui/material";
import { dataLoans } from '../../../Data/mockedData';
import { AiOutlineEye, AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Calculations from '../../../Models/CalculateLoans';
import { DataTables } from '../../../Models/DataTables';

function ShortTerm(){
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [unpaidInterest, setunpaidInterest] = useState(0);
  const [paymentmonthly, setupmonpayment] = useState(0);

  useEffect(()=>{
   
  })  

  const navigate = useNavigate();

  const columns = [
    {field:"id", headerName: "ID", flex: 0.5},
    {field:"accNumber", headerName: "Account Number", flex: 0.5},
    {field:"fname", headerName: "Fname", flex: 1},
    {field:"lname", headerName: "Lname", flex: 1},
    {field:"loanAmnt", headerName: "Loan Amount", flex: 1},
    {field:"loanType", headerName: "Loan Type", flex: 1},
    {field:"status", headerName: "Status", flex: 1},
    {field:"term", headerName: "Term", flex: 1},
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
          <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> Short Term Loans </Typography>
        </Box>
      </Box>

      {/* Data in a table using Datagrid for creating a table  */}
      <DataTables rows={dataLoans} columns={columns} isloading={!dataLoans.length} />
    </Box>
  );
}

export default ShortTerm;