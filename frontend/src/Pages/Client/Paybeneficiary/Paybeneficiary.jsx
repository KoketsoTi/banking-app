import { Box, Typography} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { getToken } from "../../../Helpers/helpers";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { Error, Success } from "../../../Helpers/toasters";
import User from '../../../Service/Client/client.service';
import AccountData from '../../../Service/clients.service';
import Calculations from '../../../Components/Transactions';
import LoadingSpinner from "../../../Components/Loader/LoaderSpinner";
import * as Yup from 'yup';


function PayBeneficiary(){
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
    const accData = {
        attributes:{
            acc_id:{
                data:{
                    0:{
                        attributes:{
                            balance: 0
                        }
                    },
                    id:1
                }
            }
        },
        id:1   
    }

    const [selectedAccount, setSelectedAccount] = useState({attributes:{balance:0}});
    const [getId, setId] = useState([]);
    const [client, setClient] = useState({firstname:"hello", lastname:"good"});
    const [useAccount, setAccount] = useState([account]);
    const [getuserAccount, setUserAccount] = useState([accData]);
    const [loading, setLoading] = useState(false);
    const auth_token = getToken();
    const {state} = useLocation();
    const navigate = useNavigate();
    
    // form validation rules 
    const formSchema = Yup.object().shape({
        amount: Yup.string().required('Amount Name is mendatory'),
        ownref: Yup.string().required('Own Reference is mendatory'),
        sender: Yup.string().required('Beneficiary Reference is mendatory'),
    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState;

    const displayBalance = (e) => {
        const selectedNumber = e.target.value;
        for(const user of useAccount) {
            if(user.attributes.accountno  === selectedNumber) {
                setSelectedAccount(user);
                break;
            }
        }
    }

    async function onSubmit(data, event) {
        event.preventDefault();
        let decreae = Calculations.TransferMoney(parseFloat(selectedAccount.attributes.balance), parseFloat(data.amount));
        let increase = Calculations.ReceiveMoney(parseFloat(getuserAccount[0].attributes.acc_id.data[0].attributes.balance), parseFloat(data.amount)) 

        //Decrease From  account
        await AccountData.updateStatus(auth_token, selectedAccount.id, {data:{balance: decreae}}).then((response) => {
            let transHistory = {
                data: {
                    accountno: selectedAccount.attributes.accountno,
                    name: state.params.attributes.Name,
                    amount: data.amount,
                    acc_id: selectedAccount.id,
                    debit_credit: "Dr",
                    type_Transaction: "Payment"
                }
            }
            
            let Nortification = {
                data: {
                    amount: data.amount,
                    balance: decreae,
                    type_Transaction:"Payment",
                    clients: getId,
                    sender: client.firstname.slice(0, 1).toUpperCase() +" "+ client.lastname,
                    receipient: state.params.attributes.Name,
                }
            }


            AccountData.TransactionHistory(auth_token, transHistory);
            AccountData.Nortification(Nortification);
        })

        //Increase To account
        await AccountData.updateStatus(auth_token, getuserAccount[0].attributes.acc_id.data[0].id, {data:{balance: increase}}).then((response) => {
            let transHistory = {
                data: {
                    accountno: state.params.attributes.account_no,
                    name: data.ownref,
                    amount: data.amount,
                    acc_id: getuserAccount[0].attributes.acc_id.data[0].id,
                    debit_credit: "Cr",
                    type_Transaction: "Transfer"
                }
            }
            let Nortification = {
                data: {
                    amount: data.amount,
                    balance: increase,
                    type_Transaction:"Payment",
                    clients: getuserAccount[0].id,
                    sender: client.firstname.slice(0, 1).toUpperCase() +" "+ client.lastname,
                    receipient: state.params.attributes.Name,
                }
            }

            AccountData.UpdateBeneficiary(state.params.id,{data: {amount:data.amount}})
            AccountData.Nortification(Nortification);
            AccountData.TransactionHistory(auth_token, transHistory).then((response) => {
                Success("Payment was successful");
                navigate('/client/');
            })
        }).catch((error) => {
            console.log(error)
            Error("Payment was unsuccessfull")
        }).finally(()=>{
            setLoading(false);
        })


        return false
   
    }

    function getUserAccounts(){
        setLoading(true);
        //Fetch client id
        User.getClientUser().then((response) => {
            setId(response.data.client_id.id)
            setClient(response.data.client_id)
            //fetch client accounts using the id returned by the request above
            User.getBeneficiaries(response.data.client_id.id).then((response) => {
                setAccount(response.data.data.attributes.acc_id.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                console.log("unable to get user accounts");
            })
        })
    }

    function getReceipient(){
        setLoading(true);
        //Fetch Beneficiary details
        AccountData.payBeneficiary(state.params.attributes.account_no).then((response) => {
            setUserAccount(response.data.data)
        })
    }

    useEffect(() => {
        if(auth_token){
            getUserAccounts(); 
            getReceipient();
        }
    },[])

    return (
        <Box className="Box">
            {loading ? <LoadingSpinner /> :
                (
                    <>
                        <ToastContainer />
                        {/* HEADER */}
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box className="heading">
                                <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}}>Pay Beneficiary</Typography>
                            </Box>
                        </Box>
                        {/* CONTENT */}
                        <Box>
                            <div className="card md:w-3/5 lg:xl:w-1/2 w-96 ">
                                <div className="card-body">
                                    <div className='grid grid-cols-1 gap-2'>
                                        <div>
                                            <div className="text-start">Transfer money from one account to another.</div>
                                            <label className="label"><span className="label-text">FROM:(SENDER)</span></label> 
                                            <select  className="input input-bordered w-full max-w-s email" name="currentAccount" onChange={displayBalance} >
                                                <option value="0">Select Account</option>
                                                {useAccount.map((index) =>
                                                    <option key={index.id} value={index.attributes.accountno} >
                                                        {index.attributes.account_name} # {index.attributes.accountno}
                                                    </option>       
                                                )}
                                            </select>   
                                        </div>

                                        <div className="mb-5">
                                            <label className="label"><span className="label-text">CURRENT BALANCE</span></label> 
                                            <input disabled value={"R" + selectedAccount?.attributes.balance.toLocaleString()} className="input text-end input-bordered w-full max-w-s email" name="numYears" />
                                        </div>
                                        
                                        <div className="text-2xl"><AiOutlineArrowDown /></div>

                                        <div className="mb-5">
                                            <label className="label"><span className="label-text">TO:(RECEIVER)</span></label> 
                                            <input disabled value={state.params.attributes.Name} className="input input-bordered w-full max-w-s email" name="numYears" />
                                        </div>

                                        <div className="mb-5">
                                            <label className="label"><span className="label-text">Previous Transfer</span></label> 
                                            <input disabled value={"R" + state.params.attributes.amount.toLocaleString()} className="input text-end input-bordered w-full max-w-s email" name="numYears" />
                                        </div>

                                        {/* <div className="card text-center bg-base-100 shadow-xl">
                                            <div className="card-body">
                                                <h1>{state.params.attributes.Name}</h1>
                                                <h1>R {state.params.attributes.amount}</h1>
                                            </div>
                                        </div> */}
                                    </div>
                    
                                    <div className="hozitontal-line -mb-4">
                                        <div className="divider"></div> 
                                    </div>

                                    <form >
                                        <div className='grid grid-cols-1  md:grid-cols-2 lg:xl:grid-cols-2 gap-4'>
                                            <div className="form-group col ">
                                                <label className="label"><span className="label-text">Amount:</span></label>
                                                <input type="number" name="amount" {...register('amount')}
                                                    className="input input-bordered w-full max-w-s email "/>
                                                <div className="invalid-feedback text-start text-rose-600">{errors.amount?.message}</div>
                                            </div>

                                            <div className="form-group col ">
                                                <label className="label"><span className="label-text">Own Ref:</span></label>
                                                <input type="text" name="ownref" value={state.params.attributes.Name} {...register('ownref')}
                                                    className="input input-bordered w-full max-w-s email "/>
                                                <div className="invalid-feedback text-start text-rose-600">{errors.ownref?.message}</div>
                                            </div>

                                        </div>
                                        <div className="form-group col ">
                                            <label className="label"><span className="label-text">Beneficiary Reference :</span></label>
                                            <input type="text" name="sender" value={client.firstname.slice(0, 1).toUpperCase() +" "+ client.lastname   } {...register('sender')}
                                                className="input input-bordered w-full max-w-s email "/>
                                            <div className="invalid-feedback text-start text-rose-600">{errors.sender?.message}</div>
                                        </div>
                                        <div className="form-group text-start pay-button col mt-10">
                                            <button onClick={handleSubmit(onSubmit)} className="rounded-none relative w-full lg:xl:w-28 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Pay</button>
                                        </div>           
                                    </form>
                                </div>
                            </div>
                        </Box>
                    </>
                )
            }
        </Box>
    );
}

export default PayBeneficiary;