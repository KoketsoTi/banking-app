import './ActiveUsers.css';
import { useEffect, useState } from "react";
import { Box, Typography , Button, } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { BsPencilSquare } from 'react-icons/bs';
import { getToken } from "../../../helpers/helpers";
import { API, BEARER } from '../../../Environment/constant';
import { Warning } from '../../../helpers/toasters';
import axios from 'axios';
import {mockDataTeam} from '../../../Data/mockedData';

function Active(){
    const [tableData, setTableData] = useState()
    const authToken = getToken();

    //Call data from the backend
    // useEffect(() => {
    //     let config = {
    //         headers: { Authorization: `${BEARER} ${authToken}`}
    //     }
            
    //     axios.get(`${API}clients?filters[status][$eq]=Active`, config ).then((response) => { 
    //         setTableData(response.data.data)
    //     }).catch(error => {  
    //         console.log('An error occurred:', error);
    //         Warning('Incorrect email or password entered')
    //     });
        
        
    // }, [authToken])

    // console.log(tableData)

    //Columns for the table
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5},
        { field: "accNumber", headerName: "Account No" },
        { field: "fname", headerName: "First Name", flex: 1 },
        { field: "lname", headerName: "Last Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "age", headerName: "Age", flex: 1 },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },

      ];

    return (
        <Box m="20px" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                    <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> Active Accounts </Typography>
                </Box>
            </Box>
        
            {/* Data in a table using Datagrid for creating a table  */}
            <Box justifyContent="center"  height="50%" width="80vw">
                <DataGrid  

                rows={mockDataTeam} columns={columns} components={{ Toolbar: GridToolbar }} />
            </Box> 
        </Box>
    );
}

export default Active;