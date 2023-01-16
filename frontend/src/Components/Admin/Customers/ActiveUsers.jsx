import './customerData.css';
import { Box, Typography, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataTeam } from '../../../Data/mockedData';
import { AiOutlineEye, AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function Active(){
    const navigate = useNavigate()
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
        {
            field: 'edit',
            headerName: '',
            sortable: false,

            renderCell: (params) => {
              const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking
                console.log(params);
                navigate(`/admin/userprofile/${params.id}`)
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
                <DataGrid rows={mockDataTeam} columns={columns} components={{ Toolbar: GridToolbar }} 
                    initialState={{
                        filter: {
                        filterModel: {
                            items: [{ columnField: 'status', value: 'Active' }],
                        },
                        },
                    }}/>
            </Box> 
        </Box>
    );
}

export default Active;