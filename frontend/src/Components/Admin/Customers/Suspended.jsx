import './customerData.css';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import { BsPencilSquare } from 'react-icons/bs';
import { mockDataTeam } from '../../../Data/mockedData';
import { DataTables } from '../../../Models/DataTables';
import { Warning,Success } from '../../../helpers/toasters';
import UserService from "../../../Service/clients.service";

function Deactive(){
  const [deactive, setDeactive] = useState([])
    
  useEffect( () => {
    UserService.getDeactive().then((response) => {
      setDeactive(response.data.data);
      console.log(response.data.data)
    }).catch((error) => {
        console.log("An error occurred:", error.response);
    });
  })
  const columsDeactive = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "accNumber", headerName: "Account No" },
    { field: "fname", headerName: "First Name", flex: 1 },
    { field: "lname", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "age", headerName: "Age", flex: 1 },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: 'delete',
      headerName: '',
      sortable: false,

      renderCell: (params) => {
        const ActiveClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log(params.id)
        };
        
        return <button className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" style={{background: "#4cceac", color:"#141b2d"}} onClick={ActiveClick}><BsPencilSquare style={{marginTop: "3px", marginRight:"5px"}}/>Activate</button>
      },
    },
  ];

  return (
    <Box m="20px" >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb="30px">
          <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> Suspended Accounts </Typography>
        </Box>
      </Box>

      {/* Data in a table using Datagrid for creating a table */}
      <DataTables rows={mockDataTeam} columns={columsDeactive} isloading={!mockDataTeam.length} />
    </Box>
  );
}

export default Deactive;