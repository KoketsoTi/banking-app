import './customerData.css';
import { Box, Typography } from "@mui/material";
import { AiOutlineEye, AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataTables } from '../../../Models/DataTables';
import { mockDataTeam } from '../../../Data/mockedData';
import UserService from "../../../Service/clients.service";

function Active(){
  const navigate = useNavigate()
  const [users, setActive] = useState([])
    
  useEffect( () => {
    UserService.getDeactive().then((response) => {
      setActive(response.data.data);
      console.log(response.data.data)
    }).catch((error) => {
        console.log("An error occurred:", error.response);
    });
  })



  //Columns for the table
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5},
    // {
    //   field: 'attributes',
    //   headerName: 'First Name',
    //   valueGetter: (params) => {
    //     let result =  params.row.attributes.firstname;
    //     return result;
    //   }
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
      return <button className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" style={{background: "#4cceac", color:"#141b2d"}} onClick={ onClick}><AiOutlineEye style={{fontSize:"15px", marginRight:"5px"}}/>View</button>
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
        return <button className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" style={{background: "#FF5823", color:"#F9F9F9"}} onClick={ onClick}><AiOutlineCloseCircle style={{marginTop: "3px", marginRight:"5px"}}/>Suspend</button>
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
      <DataTables rows={mockDataTeam} columns={columns} isloading={!users.length} />
    </Box>
  );
}

export default Active;