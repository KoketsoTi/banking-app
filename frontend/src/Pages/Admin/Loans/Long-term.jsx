import { useEffect, useState } from 'react';
import { Box, Typography} from "@mui/material";
import { getToken } from '../../../Helpers/helpers';
import { Error, Success } from '../../../Helpers/toasters';
import { ToastContainer } from 'react-toastify';
import { GiReceiveMoney } from 'react-icons/gi';
import UserService from "../../../Service/clients.service";
import LoadingSpinner from '../../../Components/Loader/LoaderSpinner';


function LongTerm(){
  const loan = {
    amount: 30000,
    interest: 10.5,
    loan_status: "Active",
    loan_type: "Long-term",
    monthly_pay: 1124.36,
    term: 36,
    total_repay: 40476.98,
    unpaid_interest: 10476.97
  }

  const [getLoansDetails, setLoanDetails] = useState(loan);
  const [longLoan, setLongTerm] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = getToken(); 

  function getallLoans(){
    setLoading(true);
    UserService.getLongLoans(token).then((response) => {
      setLongTerm(response.data.data);
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
    
    UserService.updateLoanStatus(token, id, data).then((res) => {
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

  //Get Long Term Loans
  useEffect( () => {
    if(token){
      getallLoans();
    }
  }, [])

  const edit = (params) =>{
    setLoanDetails(params.attributes)
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
                <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> Long term loan
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
                  {longLoan.map((long) => {
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
                          <label onClick={() => edit(long)} htmlFor="my-modal-4" className="rounded-none cursor-pointer relative w-full flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white" style={{background: "#4cceac", color:"#141b2d"}} >View</label>
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

              <Box>
                <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                  <label className="modal-box relative" htmlFor="">
                    <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute text-slate-900 hover:text-gray-50 right-2 top-2">✕</label>
                    <div className="flex justify-between mt-10 ml-8 mr-8" >
                      <h1 className="text-xl text-center font-bold">Loan Details</h1>
                      <div><GiReceiveMoney style={{fontSize: "20px" }}/></div>
                    </div>
                    
                    <hr className="divider"></hr>
                    
                    <Box width="100%" p="20px 30px">
                      <div className="justify-between -mt-2" >
                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Loan Type</h5>
                          <h5 className='text-lg'>{getLoansDetails.loan_type}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Loan Status</h5>
                          <h5 className='text-lg'>{getLoansDetails.loan_status}</h5>
                        </div>
                        
                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Amount</h5>
                          <h5 className='text-lg'>R {getLoansDetails.amount}</h5>
                        </div>

                       <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Term</h5>
                          <h5 className='text-lg'>{getLoansDetails.term} p/m</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Interest Rate</h5>
                          <h5 className='text-lg'>{getLoansDetails.interest}% p/a</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Interest Repayment</h5>
                          <h5 className='text-lg'>R {getLoansDetails.unpaid_interest}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Monthly Repayment</h5>
                          <h5 className='text-lg'>R {getLoansDetails.monthly_pay}</h5>
                        </div>

                        <div className="flex justify-between mb-2" >
                          <h5 className='text-lg'>Total Repay</h5>
                          <h5 className='text-lg'>R {getLoansDetails.total_repay}</h5>
                        </div>
                      </div>
                    </Box>
                  </label>
                </label>
              </Box>
            </Box> 
          </>
        )
      }
    </Box>
  );
}

export default LongTerm;