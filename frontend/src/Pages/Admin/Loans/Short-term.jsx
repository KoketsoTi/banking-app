import React, { useEffect, useState } from 'react';
import { Box, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../../Helpers/helpers';
import { Error, Success } from '../../../Helpers/toasters';
import { ToastContainer } from 'react-toastify';
import UserService from "../../../Service/clients.service";
import LoadingSpinner from '../../../Components/Loader/LoaderSpinner';

function ShortTerm(){
  const navigate = useNavigate();
  const [longShort, setShortTerm] = useState([]);
  const [loading, setLoading] = useState(false);

   const token = getToken(); 
 
  function getallLoans(){
    setLoading(true);
    UserService.getShortLoans(token).then((response) => {
      setShortTerm(response.data.data);
      console.log(response.data)
      setLoading(false);
    }).catch((error) => {
      console.log("An error occurred:", error.response);
    });
  }

  const activateUser = (params) => {
    setLoading(true);
    const id = params.id

    let value ="";
    if(params.attributes.loan_status === 'Inactive'){
      value = "Active";
    }else if(params.attributes.loan_status === 'Active'){
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
      setLoading(false);
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
      {loading ? <LoadingSpinner /> :
        (
          <>
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
                    <th>Full Name</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>Amount</th>
                    <th>Rate</th>
                    <th>Period</th>
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
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                              <span className="text-2xl">
                                {long?.attributes.client.data.attributes.firstname?.slice(0, 1)?.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{long?.attributes.client.data.attributes.firstname} {long?.attributes.client.data.attributes.lastname} </td>
                        <td>{long?.attributes.client.data.attributes.email}</td>
                        <td>{long?.attributes.client.data.attributes.phone}</td>
                        <td>{long?.attributes.amount.toLocaleString()}</td>
                        <td>{long?.attributes.interest}% p/a </td>
                        <td>{long?.attributes.term} Months</td>
                        <td>{long?.attributes.loan_status}</td>
                        <td>
                          <button onClick={() => edit(long)} className="rounded-none relative w-full flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white" style={{background: "#4cceac", color:"#141b2d"}} >View</button>
                        </td>
                        
                        <td>
                        <button className={
                            long.attributes.loan_status ==='Inactive'
                            ? "rounded-none suspend relative w-full flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white "
                            : "rounded-none activate relative w-full flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white"
                            } onClick={() => activateUser(long)} >{long.attributes.loan_status ==='Inactive' ? "Inactive": "Activate"}
                          </button>
                        </td>
                      </tr>
                    );
                  })} 
                </tbody>
              </table>
            </Box> 
          </>
        )
      }
    </Box>
  );
}

export default ShortTerm;
