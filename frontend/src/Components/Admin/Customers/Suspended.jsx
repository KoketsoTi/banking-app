import './customerData.css';
import React from 'react';
import { useEffect, useState } from "react";
import { Box, Typography , Button, } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { BsPencilSquare } from 'react-icons/bs';
import { getToken } from "../../../helpers/helpers";
import { API, BEARER } from '../../../Environment/constant';
import { Warning } from '../../../helpers/toasters';
import axios from 'axios';
import {mockDataTeam} from '../../../Data/mockedData';
function Deactive(){
  const [data, setData] = useState(''); 
  const authToken = getToken();

  //Call data from the backend N.B only calls Deactivated accounts only
  useEffect(() => {
    let config = {
      headers: { Authorization: `${BEARER} ${authToken}`}
    }
          
    axios.get(`${API}clients?filters[status][$eq]=Deactive`, config ).then((response) => { 
      console.log(response.data.data);
      setData(response.data.data) 
    }).catch(error => {  
      console.log('An error occurred:', error);
      Warning(error)
    });
  }, [authToken])

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
          console.log(params.row.fname  + params.row.lname);
        };

        return <Button style={{background: "#4cceac", color:"#141b2d"}} onClick={ActiveClick}><BsPencilSquare style={{marginTop: "3px", marginRight:"5px"}}/>Activate</Button>
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
        <Box justifyContent="center"  height="90%" width="80vw">
          <DataGrid   
            initialState={{
              filter: {
                filterModel: {
                  items: [{ columnField: 'status', value: 'Deactivate' }],
                },
              },
            }}
            rows={mockDataTeam} columns={columsDeactive} components={{ Toolbar: GridToolbar }} 
            />
        </Box>
    </Box>
  );
}

export default Deactive;