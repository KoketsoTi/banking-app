
import { Box, Typography} from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from "react";
import { getToken } from "../../../Helpers/helpers";
import { useForm } from "react-hook-form";
import { AiOutlineArrowDown } from "react-icons/ai";
import { Error, Success } from "../../../Helpers/toasters";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import User from '../../../Service/Client/client.service';
import LoadingSpinner from "../../../Components/Loader/LoaderSpinner";
import Account from "../../../Service/clients.service";
import Calculations from '../../../Components/Transactions';
import * as Yup from 'yup';


function Transfer(){
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
    const [selectedAccount, setSelectedAccount] = useState({attributes:{balance:0}});
    const [receipientAccount, setReceipientAcc] = useState({attributes:{balance:0}});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth_token = getToken();

    // form validation rules 
    const formSchema = Yup.object().shape({
        amount: Yup.string().required('Amount is mendatory'),
        ownref: Yup.string().required('Own Reference is mendatory'),
    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState } = useForm(formOptions);
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

    const disReceipientBalance = (e) => {
        const selectedNumber = e.target.value;
        for(const user of useAccount) {
            if(user.attributes.accountno  === selectedNumber) {
                setReceipientAcc(user);
                break;
            }
        }
    }
    
    function getUserAccounts(){
        //Fetch client id
        
        User.getClientUser().then((response) => {
            setId(response.data.client_id.id)
            //fetch client accounts using the id returned by the request above
            User.getBeneficiaries(response.data.client_id.id).then((response) => {
                setAccount(response.data.data.attributes.acc_id.data);
            }).catch((error) => {
                console.log(error);
                console.log("unable to get user accounts");
            })
        })
    }

    useEffect(() => {
       
            getUserAccounts(); 
    },[])

    async function onSubmit(data, event) {
        setLoading(true);
        event.preventDefault();
        let decreae = Calculations.TransferMoney(parseFloat(selectedAccount.attributes.balance), parseFloat(data.amount));
        let increase = Calculations.ReceiveMoney(parseFloat(receipientAccount.attributes.balance), parseFloat(data.amount)) 

        if(parseFloat(data.amount) > selectedAccount.attributes.balance){
            setErrors(getError  => !getError);
            setLoading(false);
            setMessage("Transfer cannot exceed available balance");
        }else if(selectedAccount.attributes.balance == receipientAccount.attributes.balance){
            setErrors(getError  => !getError);
            setLoading(false);
            setMessage("Cannot transfer money to the same account");
        }else if(receipientAccount.attributes.balance == " " || receipientAccount.attributes.balance == "undefined"){
            setErrors(getError  => !getError);
            setLoading(false);
            setMessage("Please select the account you wish to tranfer money to ");
        }else{
            setMessage("");
             //Decrease From  account
            await Account.updateStatus(auth_token, selectedAccount.id, {data:{balance: decreae}}).then((response) => {
                let transHistory = {
                    data: {
                        accountno: selectedAccount.attributes.accountno,
                        name: data.ownref,
                        amount: data.amount,
                        acc_id: selectedAccount.id,
                        availableBalance: decreae,
                        debit_credit: "dr",
                        type_Transaction: "Transfer"
                    }
                }
                
                let Nortification = {
                    data: {
                        amount: data.amount,
                        balance: decreae,
                        type_Transaction:"Transfer",
                        client: getId,
                        sender: selectedAccount.attributes.account_name,
                        receipient: receipientAccount.attributes.account_name,
                    }
                }

                Account.TransactionHistory(auth_token, transHistory);
                Account.Nortification(Nortification)
            })

            //Increase TO account
            await Account.updateStatus(auth_token, receipientAccount.id, {data:{balance: increase}}).then((response) => {
                let transHistory = {
                    data: {
                        accountno: receipientAccount.attributes.accountno,
                        name: data.ownref,
                        amount: data.amount,
                        availableBalance: increase,
                        acc_id: receipientAccount.id,
                        debit_credit: "cr",
                        type_Transaction: "Transfer"
                    }
                }

                Account.TransactionHistory(auth_token, transHistory).then((response) => {
                    Success("Transer was successful");
                    // navigate('/client/')
                }).finally(()=>{
                    getUserAccounts(); 
                    setLoading(false);
                })
            }).catch((error) => {
                console.log(error)
                Error("Transfer was unsuccessfull")
            })
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
                                <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >Transfer</Typography>
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

                                        <div>
                                            <label className="label"><span className="label-text">TO:(RECEIVER)</span></label>
                                            <select className="input input-bordered w-full max-w-s email" name="numYears"  onChange={disReceipientBalance}>
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
                                            <input disabled  value={"R" + receipientAccount?.attributes.balance.toLocaleString()} className="input text-end input-bordered w-full max-w-s email" name="numYears" />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div className="invalid-feedback text-start text-rose-600">{message}</div>
                                    </div>
                                    <div className="hozitontal-line -mb-4">
                                        <div className="divider"></div> 
                                    </div>

                             
                                        <div className='grid grid-cols-1  md:grid-cols-2 lg:xl:grid-cols-2 gap-4'>
                                            <div className="form-group col ">
                                                <label className="label"><span className="label-text">Amount:</span></label>
                                                <input type="number" onKeyDown={ (evt) => {evt.key === 'e' && evt.preventDefault(); if (evt.code === 'Minus' )evt.preventDefault(); if (evt.shiftKey === true )evt.preventDefault(); if (evt.code === 'Comma' )evt.preventDefault(); }} min={0} max={99999} name="amount" {...register('amount')}
                                                    className="input input-bordered w-full max-w-s email "/>
                                                <div className="invalid-feedback text-start text-rose-600">{errors.amount?.message}</div>
                                            </div>

                                            <div className="form-group col ">
                                                <label className="label"><span className="label-text">Own Ref:</span></label>
                                                <input type="text" name="ownref" {...register('ownref')}
                                                    className="input input-bordered w-full max-w-s email "/>
                                                <div className="invalid-feedback text-start text-rose-600">{errors.ownref?.message}</div>
                                            </div>
                                        </div>
                                        <div className="form-group text-start pay-button col mt-10">
                                            <button onClick={handleSubmit(onSubmit)} className="rounded-none activate relative w-full lg:xl:w-28 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:activated">Transfer</button>
                                        </div>           
                                    
                                </div>
                            </div>
                        </Box>
                    </>
                )
            }
        </Box>
    );
}

export default Transfer;