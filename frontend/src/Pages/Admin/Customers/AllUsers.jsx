import './customerData.css';
import { Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getToken } from '../../../Helpers/helpers';
import { Error, Success } from '../../../Helpers/toasters';
import { ToastContainer } from 'react-toastify';
import UserService from "../../../Service/clients.service";

function AllUsers(){
  const navigate = useNavigate()
  const [users, setActive] = useState([])
  const token = getToken()
  const accStatus = useRef();

  function getAllUsers(){
    UserService.getAllUsers().then((response) => {
      setActive(response.data.data);
    }).catch((error) => {
      console.log("An error occurred:", error.response);
    });
  }

  const activateUser = (params) => {
    const id = params.id
    accStatus.current = params.attributes.account_status;
    let value ="";
    if(params.attributes.account_status === 'Suspended'){
      value = "Active";
    }else if(params.attributes.account_status === 'Active'){
      value = "Suspended";
    }

    const data = {
      data:{account_status: value}
    }
  
    console.log(token , id, data)

    UserService.updateStatus(token, id, data).then((data) => {
      if(value === "Suspended"){
        Success("Successfully Activated")
      }else {
        Success("Successfully Suspended")
      }
    }).catch((error) => {
      Error("Unable to update")
    }).finally( () => {
      getAllUsers();
    })
  }

  useEffect( () => {
    if(token){
      getAllUsers()
    }
  }, [])

  const edit = (params) =>{
    navigate(`/admin/userprofile`, {state: {params}})
  }

  return (
    <Box m="20px" >
        <ToastContainer />
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb="30px">
          <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> All Users Accounts </Typography>
        </Box>      
      </Box>
        
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
              <th>phone</th>
              <th>status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
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
                    {user?.attributes.customer_id.data.attributes.phone}
                  </td>
                  <td>
                    {user?.attributes.account_status}
                  </td>
                  <td >
                    <button  className={
                      user.attributes.account_status ==='Suspended'
                      ? "rounded-none suspend relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white "
                      : "rounded-none activate relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white"
                    } onClick={() => activateUser(user)} >{user.attributes.account_status ==='Suspended' ? "Suspended": "Activate"}</button>
                  </td>

                  <td>
                    <button onClick={()=> edit(user)} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" style={{background: "#4cceac", color:"#141b2d"}} >View</button>
                  </td>

                </tr>
              );
            })}
            </tbody>
        </table>
      </Box> 
    </Box>
  );
}

export default AllUsers;