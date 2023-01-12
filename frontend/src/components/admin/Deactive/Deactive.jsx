import './Deactive.css';
import React from 'react';
import { Box, Typography , Button, } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../ActiveUsers/mocd";
import { BsPencilSquare } from 'react-icons/bs';
 
function Deactive(){

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "accNumber", headerName: "Account No" },
        { field: "fname", headerName: "First Name", flex: 1 },
        { field: "lname", headerName: "Last Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "age", headerName: "Age", flex: 1 },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
        {
            field: 'action',
            headerName: '',
            sortable: false,

            renderCell: (params) => {
              const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking
                console.log(params.row.fname  + params.row.lname);
                        
              };
        
              return <Button style={{background: "#4cceac", color:"#141b2d"}} onClick={ onClick}><BsPencilSquare style={{marginTop: "3px", marginRight:"5px"}}/>Edit</Button>
            },
        },
        {
            field: 'delete',
            headerName: '',
            sortable: false,

            renderCell: (params) => {
              const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking

                console.log(params.row.fname  + params.row.lname);
              };
              return <Button style={{background: "#FF5823", color:"#141b2d"}} onClick={onClick}><BsPencilSquare style={{marginTop: "3px", marginRight:"5px"}}/>Deactivate</Button>
            },
        },
       
      ];

    return (
        <Box m="20px" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                    <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> Active Accounts </Typography>
                </Box>
            </Box>

            <Box justifyContent="center"  height="90%" width="80vw">
                <DataGrid  rows={mockDataContacts} columns={columns} components={{ Toolbar: GridToolbar }} />
            </Box>
        </Box>
    );
}

export default Deactive;