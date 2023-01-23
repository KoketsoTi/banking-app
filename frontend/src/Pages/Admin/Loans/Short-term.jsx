import React, { useEffect, useState } from 'react';
import { Box, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../../Helpers/helpers';
import { Error, Success } from '../../../Helpers/toasters';
import { ToastContainer } from 'react-toastify';
import UserService from "../../../Service/clients.service";

function ShortTerm(){
  const navigate = useNavigate();
  const [longShort, setShortTerm] = useState([]);
   const token = getToken(); 
 
  function getallLoans(){
    UserService.getShortLoans(token).then((response) => {
      setShortTerm(response.data.data);
    }).catch((error) => {
      console.log("An error occurred:", error.response);
    });
  }

  const activateUser = (params) => {
    const id = params.attributes.loans.data[0].id

    let value ="";
    if(params.attributes.loans.data[0].attributes.loan_status === 'Inactive'){
      value = "Active";
    }else if(params.attributes.loans.data[0].attributes.loan_status === 'Active'){
      value = "Inactive";
    }

    const data = {
      data:{loan_status: value}
    }

    UserService.updateLoanStatus(token, id, data).then((data) => {
      if(value === "Inactive"){
        Success("Successfully Activated")
      }else {
        Success("Successfully Deactivated")
      }
    }).catch((error) => {
      Error("Unable to update loan status")
    }).finally( () => {
      getallLoans();
    })
  }

  const deleteAUser= (id) => {

  }

  //Get Long Term Loans
  useEffect( () => {
    if(token){
      getallLoans();
    }
  }, [])



  const edit = (params) =>{
    navigate(`/admin/approveLoans`, {state:{params}})
  }  

  return (
    <Box m="20px" >
      <ToastContainer />
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb="30px">
          <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> Short term loan
          </Typography>
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
            {longShort.map((long) => {
              return (
                <tr key={long.id}>
                  <td>
                    <div className="avatar placeholder">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-14">
                        <span className="text-3xl">
                          {long?.attributes.firstname?.slice(0, 1)?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </td>
                  {/* <td>{long?.attributes.accounts.data[0].attributes.accountnumber}</td> */}
                  <td>{long?.attributes.firstname}</td>
                  <td>{long?.attributes.firstname}</td>
                  <td>{long?.attributes.lastname}</td>
                  <td>{long?.attributes.email}</td>
                  <td>{long?.attributes.phone}</td>
                  <td>{long?.attributes.loans.data[0].attributes.loan_status}</td>
                  <td>
                    <button onClick={() => edit(long)} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" style={{background: "#4cceac", color:"#141b2d"}} >View</button>
                  </td>
                    
                  <td >
                    <button className={
                      long.attributes.loans.data[0].attributes.loan_status ==='Inactive'
                      ? "rounded-none suspend relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white "
                      : "rounded-none activate relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white"
                      } onClick={() => activateUser(long)} >{long.attributes.loans.data[0].attributes.loan_status ==='Inactive' ? "Inactive": "Activate"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box> 

      <Box>
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label htmlFor="my-modal-4" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h3 className="text-lg text-center font-bold">Confirm Delete</h3>
              <div className="form-group col mb-4 mt-4">
                  <Typography variant='h5' >Are you sure you want to delete this user</Typography>
                </div>

                <div className='flex'>
                  <div className="form-group col ">
                    <button className="group suspend w-28 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white">Cancel</button>
                  </div>
                  <div className="form-group col ml-10">
                    <button className="group activate w-28 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white">Reset</button>
                  </div>
                </div>
              </label>
          </label>
        </Box>
    </Box>
  );
}

export default ShortTerm;
