import './customerData.css';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import { BsPencilSquare } from 'react-icons/bs';
import { DeleteUser } from '../../../Models/RenderUserProfile';
import { Warning,Success } from '../../../helpers/toasters';
import UserService from "../../../Service/clients.service";
import { getToken } from '../../../helpers/helpers';

function Deactive(){
  const [deactive, setDeactive] = useState([])
  const [name, setName]=useState();
  const [id, setId]=useState();
  const token = getToken() 

  useEffect( () => {
    if(token){
      UserService.getAllUsers(token).then((response) => {
        setDeactive(response.data.data);
        console.log(response.data.data)
      }).catch((error) => {
          console.log("An error occurred:", error.response);
      });
    }
  }, [])

  const Activate = (params) => {
    setName(params.attributes.customer_id.data.attributes.firstname)
    setId(params.id)
  }

  return (
    <Box m="20px" >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb="30px">
          <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> Suspended Accounts </Typography>
        </Box>
      </Box>

      {/* Data in a table using Datagrid for creating a table */}
      {/* Data in a table using Datagrid for creating a table  */}
      <Box justifyContent="center" className='w-full' style={{ height: 650 }}>
        <table className="table w-full z-0">
          <thead>
            <tr>
              <th></th>
              <th>Account Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>email</th>
              <th>age</th>
              <th>phone</th>
              <th>status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {deactive.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <div className="avatar placeholder">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-14">
                        <span className="text-3xl">
                        {user?.attributes.customer_id.data.attributes.firstname?.slice(0, 1)?.toUpperCase()}
                        </span>
                      </div>
                      </div>
                  </td>
                  <td>
                    {user?.attributes.accountnumber}
                  </td>
                  <td>
                    {user?.attributes.customer_id.data.attributes.firstname}
                  </td>
                  <td>
                    {user?.attributes.customer_id.data.attributes.lastname}
                  </td>
                  <td>
                    {user?.attributes.customer_id.data.attributes.email}
                  </td>
                  <td>
                    {user?.attributes.customer_id.data.attributes.age}
                  </td>
                  <td>
                    {user?.attributes.customer_id.data.attributes.phone}
                  </td>
                  <td>
                    {user?.attributes.account_status}
                  </td>
                  <td>
                    <label htmlFor="my-modal-4" onClick={()=>Activate(user)} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" style={{background: "#4cceac", color:"#141b2d"}} ><BsPencilSquare style={{marginTop: "3px", marginRight:"5px"}}/>Activate</label>  
                  </td>
                </tr>

              );
            })}
            </tbody>
        </table>
        <DeleteUser subtitle={`Are you sure you want to Activate this client ${name}`} user={{id,name}} />
      </Box> 
    </Box>
  );
}

export default Deactive;