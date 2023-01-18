import './Cards.css';
import React, {useState} from 'react';
import { Box, Typography, Button } from "@mui/material";
import { DataGrid, GridToolbar, valueFormatter } from "@mui/x-data-grid";
import { CardRequest } from '../../../Data/mockedData';
import { AiOutlineEye, AiOutlineCloseCircle } from 'react-icons/ai';
import { ModalOpen } from '../../../Models/CardView';


function Verify(){
    const initData = {
        id: 1,
        attributes: {
          title: "Avatar: The Lost city",
          duration: 102.2,
          description:
            "It is a movie where they lost their city it tough and rough",
          createdAt: "2023-01-16T17:44:29.314Z",
          updatedAt: "2023-01-17T06:05:41.504Z",
        },
      };
    const [data, setData] = useState(initData);

    //Columns for the table
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5},
        { field: "accNumber", headerName: "Account No" },
        { field: "fname", headerName: "First Name", flex: 1 },
        { field: "lname", headerName: "Last Name", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
        {
            field: 'edit',
            headerName: '',
            sortable: false,

            renderCell: (params) => {
              const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking
                console.log(params);
                setData(params.row)
              };
             
              return <label htmlFor="my-modal-4" onClick={onClick} style={{ color: "#141b2d", background:"#4cceac" }}  className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" > view</label>
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
        }
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
            <Box justifyContent="center" className='w-full' style={{ height: 650 }}>
                <DataGrid rows={CardRequest} columns={columns} components={{ Toolbar: GridToolbar }} />
            </Box> 
            <ModalOpen cardData={data}/>  
        </Box>
    );
}

export default Verify;