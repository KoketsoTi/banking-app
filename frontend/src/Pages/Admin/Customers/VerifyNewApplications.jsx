import './customerData.css';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import { FaRegUserCircle } from 'react-icons/fa';
import { AiOutlineBank } from 'react-icons/ai';
import { Warning, Success } from '../../../Helpers/toasters';
import { getToken } from '../../../Helpers/helpers';
import { ToastContainer } from 'react-toastify';
import UserService from "../../../Service/clients.service";
import LoadingSpinner from '../../../Components/Loader/LoaderSpinner';

function Deactive(){
  const user = {
    attributes: {
      Occupation: "Business-Analyst",
      account_name: "Cheque Account",
      account_status: "Pending", 
      account_type: "Cheque", 
      accountno: "1420219508", 
      balance: 0, 
      birth_date: "2004-06-30", 
      city: "Pretoria", 
      country: "South Africa",
      email: "mashengetee@gmail.com", 
      firstname: "Virginia", 
      lastname: "Mashengete", 
      phone: "079-551-6628", 
      role: 1, 
      street_address: "22 Struben Street", 
      surbub: "Pretoria CBD",
      username: "Virgy", 
      usertype: "Client", 
      zipcode: "0001"
    },
    id: 1
  }

  const [deactive, setDeactive] = useState([])
  const [userdata, setData]=useState(user);
  const [loading, setLoading] = useState(false);

  const token = getToken() 

  function getAllApplicants(){
    setLoading(true);
    UserService.getNewUsers(token).then((response) => {
      setDeactive(response.data.data);
      setLoading(false);
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
    setLoading(true); 
    UserService.deleteAUser(token, params.id ).then((response) => {
      Success('Applicant was declined')
      setLoading(false);
    }).catch((error) => {
      Warning('Unable to decline a user')
      console.log("An error occurred:", error.response);
    }).finally( () => {
      getAllApplicants();
      setLoading(false); 
    })
  }


  function Activate(data){
    setLoading(true);
    let userData = {
      email: data.attributes.email,
      username: data.attributes.firstname,
      firstname: data.attributes.firstname,
      lastname: data.attributes.lastname,
      usertype: data.attributes.usertype,
      contact: data.attributes.phone,
      password: "123456"
    }
    
    UserService.register(token, userData).then((response) => {
      Success('Applicant was Approved')
      setLoading(false);
    }).catch((error) => {
      Warning('Unable to approve a new client')
      console.log("An error occurred:", error.response);
    })
  }

  const view = (params) =>{
    setData(params)
  }

  return (
    <Box m="20px" >
      {loading ? 
        <LoadingSpinner /> :
        (
          <>
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
                    <th>Date of Birth</th>
                    <th>Status</th>
                    <th>View</th>
                    <th>Verify</th>
                    <th>Decline</th>
                  </tr>
                </thead>
                <tbody>
                  {deactive.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>
                          <div className="avatar placeholder">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                              <span className="text-2xl">
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
                          {user?.attributes.birth_date}
                        </td>

                        <td>
                          {user?.attributes.account_status}
                        </td>

                        <td>
                          <label htmlFor="my-modal-4" onClick={()=>view(user)} className="rounded-none relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" style={{background: "#4cceac", color:"#F9F9F9"}} >Verify</label>  
                        </td>

                        <td>
                          <button onClick={()=> Activate(user)} className="rounded-none relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" style={{background: "#009DE0", color:"#F9F9F9"}} >Approve</button>  
                        </td>

                        <td>
                          <button onClick={()=> decline(user)} className="rounded-none suspend relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ">Decline</button>  
                        </td>
                      </tr>

                    );
                  })}
                  </tbody>
              </table>
            </Box> 

            <Box>
              <input type="checkbox" id="my-modal-4" className="modal-toggle" />
              <label htmlFor="my-modal-4" className="modal w-full cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute text-slate-900 hover:text-gray-50 right-2 top-2">✕</label>
                    <div className="flex justify-between mt-10 ml-1 mr-1" >
                      <h1 className="text-xl text-center font-bold">Client Details</h1>
                      <div><FaRegUserCircle style={{fontSize: "20px" }}/></div>
                    </div>
                    
                    <hr className="divider"></hr>
                    
                    <Box >
                      <div className="justify-between -mt-2" >
                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>First Name</h5>
                          <h5 className='text-lg' >{userdata.attributes.firstname}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Last Name</h5>
                          <h5 className='text-lg'>{userdata.attributes.lastname}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Email</h5>
                          <h5 className='text-lg'>{userdata.attributes.email}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Date of birth</h5>
                          <h5 className='text-lg'>{userdata.attributes.birth_date}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Phone</h5>
                          <h5 className='text-lg'>{userdata.attributes.phone}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Occupation</h5>
                          <h5 className='text-lg'>{userdata.attributes.Occupation}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Street Address</h5>
                          <h5 className='text-lg'>{userdata.attributes.street_address}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>City</h5>
                          <h5 className='text-lg'>{userdata.attributes.city}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Surburb</h5>
                          <h5 className='text-lg'>{userdata.attributes.surbub}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Nationality</h5>
                          <h5 className='text-lg'>{userdata.attributes.country}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Zip Code</h5>
                          <h5 className='text-lg'>{userdata.attributes.zipcode}</h5>
                        </div>
                      </div>
                    </Box>

                    <div className="flex justify-between mt-10 ml-1 mr-1" >
                      <h1 className="text-xl text-center font-bold">Account Details</h1>
                      <div><AiOutlineBank style={{fontSize: "20px" }}/></div>
                    </div>
                    
                    <hr className="divider"></hr>

                    <Box>
                      <div className="justify-between -mt-2" >
                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Account Number</h5>
                          <h5 className='text-lg' >{userdata.attributes.accountno}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Account Name</h5>
                          <h5 className='text-lg'>{userdata.attributes.account_name}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Account type</h5>
                          <h5 className='text-lg'>{userdata.attributes.account_type}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Balance</h5>
                          <h5 className='text-lg'>R {userdata.attributes.balance}</h5>
                        </div>
                      </div>
                    </Box>
                  </label>
                </label>
              </Box>
          </>
        )
      }
    </Box>
  );
}

export default Deactive;