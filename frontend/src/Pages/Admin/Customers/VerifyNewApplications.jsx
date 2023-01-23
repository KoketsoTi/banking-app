import './customerData.css';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import { BsPencilSquare } from 'react-icons/bs';
import { Warning, Success } from '../../../Helpers/toasters';
import { getToken } from '../../../Helpers/helpers';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import UserService from "../../../Service/clients.service";

function Deactive(){
  const user = {
    attributes: {
      firstname: "Brandon",
      lastname : "Mnguni",
      email: "mashengetee@gmail.com",
      usertype: "Client",
      age : 22,
      phone: "079-222-8821",
      address : "12 Orlando Street",
      surbub: "Soweto",
      city : "Johannesburg",
      zip : "0021",
      account_type: "Savings",
      account_status: "Inactive",
      account: "14",
      balance: 0
    },
    id: 1
  }

  const [deactive, setDeactive] = useState([])
  const [userdata, setData]=useState(user);
  const token = getToken() 

  function getAllApplicants(){
    UserService.getNewUsers(token).then((response) => {
      setDeactive(response.data.data);
    }).catch((error) => {
        console.log("An error occurred:", error.response);
    });
  }


  useEffect( () => {
    if(token){
      getAllApplicants();
    }
  }, [])

  function decline(params){  
    UserService.deleteAUser(token, params.id ).then((response) => {
      Success('Applicant was declined')
    }).catch((error) => {
      Warning('Unable to decline a user')
      console.log("An error occurred:", error.response);
    }).finally( () => {
      getAllApplicants();
    })
  }


  function Activate(data){
    let userData = {
      email: data.attributes.email,
      username: data.attributes.firstname,
      firstname: data.attributes.firstname,
      lastname: data.attributes.lastname,
      usertype: data.attributes.usertype,
      contact: data.attributes.phone,
      password: "123456"
    }

    console.log(userData);
    
    UserService.register(token, userData).then((response) => {
      Success('Applicant was Approved')
    }).catch((error) => {
      Warning('Unable to approve a new client')
      console.log("An error occurred:", error.response);
    })
  }

  return (
    <Box m="20px" >
       <ToastContainer />
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb="30px">
          <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> Verify New Applications Accounts </Typography>
        </Box>
      </Box>

      {/* Data in a table using Datagrid for creating a table  */} 
      <Box justifyContent="center" className='w-full' style={{ height: 650 }}>
        <table className="table w-full z-0">
          <thead>
            <tr>
              <th></th>
              <th>Full Name</th>
              <th>Email </th>
              <th>Phone</th>
              <th>Age</th>
              <th>Status</th>
              <th>View</th>
              <th>Verify</th>
              <th>Reject Account</th>

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
                        {user?.attributes.firstname?.slice(0, 1)?.toUpperCase()}
                        </span>
                      </div>
                      </div>
                  </td>

                  <td>
                    {user?.attributes.firstname} {user?.attributes.lastname}
                  </td>

                  <td>
                    {user?.attributes.email}
                  </td>
                  <td>
                    {user?.attributes.phone}
                  </td>
                 
                  <td>
                    {user?.attributes.age}
                  </td>

                  <td>
                    {user?.attributes.account_status}
                  </td>

                  <td>
                    <label htmlFor="my-modal-4" onClick={()=>Activate(user)} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" style={{background: "#4cceac", color:"#F9F9F9"}} ><MdOutlineVerifiedUser style={{marginTop: "3px", marginRight:"5px"}}/>Verify</label>  
                  </td>

                  <td>
                    <button onClick={()=> Activate(user)} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" style={{background: "#009DE0", color:"#F9F9F9"}} ><BsPencilSquare style={{marginTop: "3px", marginRight:"5px"}}/>Approve</button>  
                  </td>

                  <td>
                    <button onClick={()=> decline(user)} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" style={{background: "#FF5823", color:"#F9F9F9"}} ><AiOutlineCloseCircle style={{marginTop: "3px", marginRight:"5px"}}/>Decline</button>  
                  </td>
                </tr>

              );
            })}
            </tbody>
        </table>
      </Box> 

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative  w-full" htmlFor="">
          <h3 className="text-lg text-center font-bold">Verify user Details</h3>
          <Box width="100%" p="20px 30px">
            <Box justifyContent="space-between" mt="-5px" >
              <Typography variant="h4">Personal Infomation</Typography>
              <div className='grid grid-cols-2 gap-4 mt-4'>
                <Box justifyContent="space-between" mb="10px" >
                  <Typography variant="h5">Full Name</Typography>
                  <Typography variant="h5" >{userdata.attributes.firstname} {userdata.attributes.lastname} </Typography>
                </Box>

                <Box justifyContent="space-between" mb="10px" >
                  <Typography variant="h5">Email</Typography>
                  <Typography variant="h5" >{userdata.attributes.email} </Typography>
                </Box>

                <Box justifyContent="space-between" mb="10px" >
                  <Typography variant="h5">Age</Typography>
                  <Typography variant="h5" >{userdata.attributes.age} </Typography>
                </Box>

                <Box justifyContent="space-between" mb="10px" >
                  <Typography variant="h5">Phone Number</Typography>
                  <Typography variant="h5" >{userdata.attributes.phone} </Typography>
                </Box>

               

                <Box justifyContent="space-between" mb="10px" >
                  <Typography variant="h5">Address</Typography>
                  <Typography variant="h5" >{userdata.attributes.address} </Typography>
                </Box>

                <Box justifyContent="space-between" mb="10px" >
                  <Typography variant="h5">Surburb</Typography>
                  <Typography variant="h5" >{userdata.attributes.surbub} </Typography>
                </Box>

                <Box justifyContent="space-between" mb="10px" >
                  <Typography variant="h5">City</Typography>
                  <Typography variant="h5" >{userdata.attributes.city} </Typography>
                </Box>

                <Box justifyContent="space-between" mb="10px" >
                  <Typography variant="h5">Zip</Typography>
                  <Typography variant="h5" >{userdata.attributes.zip} </Typography>
                </Box>
              </div>

              <Typography variant="h4" mt="30px">Account Infomation</Typography>
              <div className='grid grid-cols-2 gap-4 mt-4'>
                <Box justifyContent="space-between" mb="10px" >
                  <Typography variant="h5">Account Type</Typography>
                  <Typography variant="h5" >{userdata.attributes.account_type} </Typography>
                </Box>

                <Box justifyContent="space-between" mb="10px" >
                  <Typography variant="h5">Account Number</Typography>
                  <Typography variant="h5" >{userdata.attributes.account} </Typography>
                </Box>

                <Box justifyContent="space-between" mb="10px" >
                  <Typography variant="h5">Account Status</Typography>
                  <Typography variant="h5" >{userdata.attributes.account_status} </Typography>
                </Box>
              </div>
            </Box>         
          </Box>
        </label>
      </label>
    </Box>
  );
}

export default Deactive;