import './customerData.css';
import { Box, Typography, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataTeam } from '../../../Data/mockedData';
import { AiOutlineEye, AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API, BEARER} from '../../../Environment/constant';
import { getToken} from '../../../helpers/helpers';
import { Warning,Success } from '../../../helpers/toasters';
import axios from 'axios';

function Active(){
    const navigate = useNavigate()
    const [users, setUsers] = useState([])

    const token = getToken()
    
    useEffect( () => {
      axios.get(`${API}clients`,{
        headers: {
            Authorization:
                `${BEARER} ${token}`,
            },
        }).then((response) => {
            setUsers(response.data.data);
            console.log(response.data.data)
            Success('Email send successfully ')
        }).catch((error) => {
            console.log("An error occurred:", error.response);
            Warning("Unable to send an email")
        });
    })



    //Columns for the table
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5},
        {
            field: 'attributes',
            headerName: 'First Name',
            valueGetter: (params) => {
              let result =  params.row.attributes.firstname;
              return result;
            }
        },
        {
            field: 'attributes',
            headerName: 'Last Name',
            valueGetter: (params) => {
              let result =  params.row.attributes.lastname;
              return result;
            }
        },
        // {
        //     field: 'attributes',
        //     headerName: 'Email',
        //     valueGetter: (params) => {
        //       let result =  params.row.attributes.email;
        //       return result;
        //     }
        // },
        // {
        //     field: 'attributes',
        //     headerName: 'Age',
        //     valueGetter: (params) => {
        //       let result =  params.row.attributes.age;
        //       return result;
        //     }
        // },
        // {
        //     field: 'attributes',
        //     headerName: 'Phone',
        //     valueGetter: (params) => {
        //       let result =  params.row.attributes.phone;
        //       return result;
        //     }
        // },
        // {
        //     field: 'attributes',
        //     headerName: 'Address',
        //     valueGetter: (params) => {
        //       let result =  params.row.attributes.street_address;
        //       return result;
        //     }
        // },
        // {
        //     field: 'attributes',
        //     headerName: 'Surbub',
        //     valueGetter: (params) => {
        //       let result =  params.row.attributes.surburb;
        //       return result;
        //     }
        // },
        // {
        //     field: 'attributes',
        //     headerName: 'City',
        //     valueGetter: (params) => {
        //       let result =  params.row.attributes.city;
        //       return result;
        //     }
        // },
        // {
        //     field: 'attributes',
        //     headerName: 'Zip Code',
        //     valueGetter: (params) => {
        //       let result =  params.row.attributes.zipcode;
        //       return result;
        //     }
        // },
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
                <DataGrid rows={users} columns={columns} components={{ Toolbar: GridToolbar }} />
            </Box> 
        </Box>
    );
}

export default Active;