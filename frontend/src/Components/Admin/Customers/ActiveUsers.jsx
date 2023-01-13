import './customerData.css';
import { Box, Typography, } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {mockDataTeam} from '../../../Data/mockedData';

function Active(){
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