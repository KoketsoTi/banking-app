import React from 'react'
import { ToastContainer } from "react-toastify";
import { Box, Typography} from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken } from "../../../Helpers/helpers";
import { Error, Success } from "../../../Helpers/toasters";
import { useForm } from "react-hook-form";
import Account from "../../../Service/clients.service";
import User from '../../../Service/Client/client.service';
import Calculations from '../../../Components/Transactions';
import LoadingSpinner from '../../../Components/Loader/LoaderSpinner';

function Deposit() {
    const account ={
        attributes:{
          account_name:"Check Account",
          account_status: "Suspended",
          account_type: "Cheque",
          accountno:  "1414535733",
          balance: 7000,
          createdAt: "2023-01-25T18:25:51.391Z",
          updatedAt :  "2023-01-26T17:28:21.352Z",
        },
        id: 5
    }

    const [getId, setId] = useState([]);
    const [useAccount, setAccount] = useState([account]);
    const [getError, setErrors] = useState(false); 
    const [message, setMessage] = useState("")
    const [receipientAccount, setReceipientAcc] = useState({attributes:{balance:0}});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth_token = getToken();

    // form validation rules 
    const formSchema = Yup.object().shape({
        amount: Yup.string().required('Amount is mendatory'),
    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const displayBalance = (e) => {
        const selectedNumber = e.target.value;
        for(const user of useAccount) {
            if(user.attributes.accountno  === selectedNumber) {
                setReceipientAcc(user);
                break;
            }
        }
    }

    function getUserAccounts(){
        setLoading(true);
        //Fetch client id
        User.getClientUser().then((response) => {
            setId(response.data.client_id.id)
            //fetch client accounts using the id returned by the request above
            User.getBeneficiaries(response.data.client_id.id).then((response) => {
                setAccount(response.data.data.attributes.acc_id.data);
            }).catch((error) => {
                console.log(error);
                console.log("unable to get user accounts");
            }).finally(() => {
                setLoading(false);
            })
        })
    }

    useEffect(() => {
        if(auth_token){
            getUserAccounts(); 
        }
    },[])

    async function onSubmit(data, event) {
        setLoading(true);
        event.preventDefault();
        let increase = Calculations.ReceiveMoney(parseFloat(receipientAccount.attributes.balance), parseFloat(data.amount));

        if(receipientAccount.attributes.balance == " " || receipientAccount.attributes.balance == "undefined"){
            setErrors(getError  => !getError);
            setLoading(false);
            setMessage("Please select the account you wish to tranfer money to");
        }else{
            
             //Increase TO account
           // await Account.updateStatus(auth_token, receipientAccount.id, {data:{balance: increase}}).then((response) => {
                let transHistory = {
                    data: {
                        accountno: receipientAccount.attributes.accountno,
                        name: "Koketso",
                        amount: data.amount,
                        acc_id: receipientAccount.id,
                        debit_credit: "Cr",
                        type_Transaction: "Deposit"
                    }
                }

                // let Nortification = {
                //     data: {
                //         amount: data.amount,
                //         balance: decreae,
                //         type_Transaction:"Transfer",
                //         client: getId,
                //         sender: selectedAccount.attributes.account_name,
                //         receipient: receipientAccount.attributes.account_name,
                //     }
                // }


                console.log(transHistory);
                //console.log(Nortification);

                //Account.Nortification(Nortification);
                // Account.TransactionHistory(auth_token, transHistory).then((response) => {
                //     Success("Transer was successful");
                //     navigate('/client/')
                // })
            // }).catch((error) => {
            //     console.log(error)
            //     Error("Transfer was unsuccessfull")
            // }).finally(()=>{
            //     setLoading(false);
            // })
        }
       
        return false
    }
  return (
    <Box className="Box" >
        {loading ? <LoadingSpinner /> :
            (
                <>
                    <ToastContainer />
                    {/* HEADER */}
                    <Box display="flex" mt="20px" justifyContent="space-between" alignItems="center">
                        <Box className="heading">
                            <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >Deposit</Typography>
                        </Box>
                    </Box>
        
                    {/* CONTENT */}
                    <Box>
                        <div className="card md:w-3/5 lg:xl:w-1/2 w-96 ">
                            <div className="card-body">
                                <div className='grid grid-cols-1 gap-2'>

                                    <div>
                                        <label className="label"><span className="label-text">TO:(RECEIVER)</span></label>
                                        <select className="input input-bordered w-full max-w-s email" name="numYears" onChange={displayBalance}>
                                            <option value="0">Select Account</option>
                                            {useAccount.map((index) =>
                                                <option key={index.id} value={index.attributes.accountno}>
                                                    {index.attributes.account_name} # {index.attributes.accountno}
                                                </option>
                                            )}                  
                                        </select>    
                                    </div>
                                    <div className="mb-5">
                                        <label className="label"><span className="label-text">CURRENT BALANCE</span></label> 
                                        <input disabled value={receipientAccount.attributes.balance}  className="input text-end input-bordered w-full max-w-s email" name="numYears" />
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="invalid-feedback text-start text-rose-600">{message}</div>
                                </div>
                                <div className="hozitontal-line -mb-4">
                                    <div className="divider"></div> 
                                </div>

                                <form >
                                    <div className="form-group col ">
                                        <label className="label"><span className="label-text">Amount:</span></label>
                                        <input type="number" name="amount" {...register('amount')}
                                            className="input input-bordered w-full max-w-s email "/>
                                        <div className="invalid-feedback text-start text-rose-600">{errors.amount?.message}</div>
                                    </div>

                                    <div className="form-group text-start pay-button col mt-10">
                                        <button onClick={handleSubmit(onSubmit)} className="rounded-none relative w-full lg:xl:w-28 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Deposit</button>
                                    </div>           
                                </form>
                            </div>
                        </div>
                    </Box>
                </>
            )
        }
    </Box>
  )
}

export default Deposit