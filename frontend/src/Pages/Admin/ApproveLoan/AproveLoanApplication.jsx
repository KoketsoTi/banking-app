import { Box, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getToken } from "../../../Helpers/helpers";
import { Error, Success } from "../../../Helpers/toasters";
import UserService from "../../../Service/clients.service";
import LoadingSpinner from "../../../Components/Loader/LoaderSpinner";

function LoanApp(){
    const loanInitials ={
        attributes:{
            client:{
                data:{
                    attributes:{
                        email: "kokitinyane@gmail.com",
                        firstname:"Koketso",
                        lastname: "Tinyane",
                        phone: "079-123-9833"
                    }
                }
            },
            amount: 15000,
            interest: 10,
            loan_status: "Pending",
            loan_type: "Short-term",
            term: 12
        }
    }

    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = getToken();

    function getUser() {
        setLoading(true);
        UserService.getPending().then((response) => {
            setUser(response.data.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        if(token){
            getUser();
        }
    },[])
    
    //Approve application
    const approve = (params) => {
        setLoading(true);
        let value = "Active";
        const id = params.id
     
        const data = {
            data:{loan_status: value}
        }

        UserService.updateLoanStatus(token , id, data).then((data) => {
            Success("Successfully Approved")
        }).catch((error) => {
            Error("Unable to update")
        }).finally(() => {
            getUser();
            setLoading(false);
        })
    }

    //Reject application
    const reject = (params) => {
        setLoading(true);
        const id = params.id
        UserService.RejectLoan(token, id).then((data) => {
            Success("Successfully Approved")
        }).catch((error) => {
            Error("Unable to update")
        }).finally(() => {
            getUser();
            setLoading(false);
        })
    }

    console.log(users);

    return (
        <Box m="20px" >
            {loading ? <LoadingSpinner /> :
                (
                    <>
                        <ToastContainer />
                        {/* HEADER */}
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box mb="30px">
                                <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}>Verify Loan Applications</Typography>
                            </Box>
                        </Box>

                        <Box justifyContent="center" className='w-full' style={{ height: 650 }}>
                            <table className="table w-full z-0">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Amount</th>
                                        <th>Rate</th>
                                        <th>Period</th>
                                        <th>Loan Type</th>
                                        <th>status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => 
                                        <tr key={user.id}>
                                            <td>
                                                <div className="avatar placeholder">
                                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                                                        <span className="text-2xl">
                                                            {user?.attributes.client.data.attributes.firstname?.slice(0, 1)?.toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {user?.attributes.client.data.attributes.firstname}
                                            </td>
                                            <td>
                                                {user?.attributes.client.data.attributes.email}
                                            </td>
                                            <td>
                                                {user?.attributes.amount.toLocaleString()}
                                            </td>

                                            <td>
                                                {user?.attributes.interest}% p/a
                                            </td>
                                            <td>
                                                {user?.attributes.term} Months
                                            </td>
                                            <td>
                                                {user?.attributes.loan_type}
                                            </td>
                                            <td>
                                                {user?.attributes.loan_status}
                                            </td>
                                            <td>
                                                <button onClick={()=> approve(user)} className="rounded-none activate relative w-full flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white" >Approve</button>
                                            </td>
                                            <td>
                                                <button onClick={()=> reject(user)} className="rounded-none suspend relative w-full flex justify-center py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white" >Reject</button>
                                            </td>
                                            <td>
                                                
                                            </td>
                                        </tr>
                                    )} 
                                </tbody>
                            </table>
                        </Box>
                    </>
                )
            }
        </Box>
    );
}

export default LoanApp;