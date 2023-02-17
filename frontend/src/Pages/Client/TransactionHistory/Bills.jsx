import { Box} from "@mui/material";
import { useEffect, useState } from "react";
import { BillsData } from '../../../Data/billsData';
import { ToastContainer } from "react-toastify";
import { Error, Success } from "../../../Helpers/toasters";
import { getToken } from "../../../Helpers/helpers";
import User from '../../../Service/Client/client.service';
import LoadingSpinner from "../../../Components/Loader/LoaderSpinner";
import Calculations from '../../../Components/Transactions';
import Account from "../../../Service/clients.service";

function Bills(){
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

    const [client, setClient] = useState({firstname:"hello", lastname:"good"});
    const [reference, setReference]= useState("");
    const [amount, setAmount]=useState("");
    const [getError, setErrors] = useState(false); 
    const [message, setMessage] = useState("")
    const [selectedAccount, setSelectedAccount] = useState({attributes:{balance:0}});
    const [useAccount, setAccount] = useState([account]);
    const [loading, setLoading] = useState(false);
    const [getId, setId] = useState([]);
    const [getBillOwner, setBillHandle] =  useState('');
    const auth_token = getToken();

    const handleCancel = () => {
        setReference("");
        setAmount("");
    };

    const billName = (data) =>{
        setBillHandle(data)
    }

    const handleSave= async (event) =>{
        setLoading(true);
        event.preventDefault();

        let decreae = Calculations.TransferMoney(parseFloat(selectedAccount.attributes.balance), parseFloat(amount));

        if(parseFloat(amount) > selectedAccount.attributes.balance){
            setErrors(getError  => !getError);
            setLoading(false);
            setMessage("Transfer cannot exceed available balance");
        }else{
            //Decrease From  account
            await Account.updateStatus(auth_token, selectedAccount.id, {data:{balance: decreae}}).then((response) => {
                let transHistory = {
                    data: {
                        accountno: selectedAccount.attributes.accountno,
                        name: reference +"@"+getBillOwner,
                        amount: amount,
                        acc_id: selectedAccount.id,
                        debit_credit: "dr",
                        type_Transaction: "Bill Payment"
                    }
                }

                let Nortification = {
                    data: {
                        amount: amount,
                        balance: decreae,
                        type_Transaction: "Bill Payment",
                        clients: getId,
                        sender: client.firstname.slice(0, 1).toUpperCase() +" "+ client.lastname,
                        receipient: reference +"@"+getBillOwner,
                    }
                }
                
                Account.TransactionHistory(auth_token, transHistory);
                Account.Nortification(Nortification);
                Success("Bill Payment was successful");
            }).catch((error) => {
                console.log(error);
                Error("Unable to pay bill, Try again later")
            }).finally(() => {
                setLoading(false);
            })    
        }  
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

    const displayBalance = (e) => {
        const selectedNumber = e.target.value;
        for(const user of useAccount) {
            if(user.attributes.accountno  === selectedNumber) {
                setSelectedAccount(user);
                break;
            }
        }
    }

    useEffect(() => {
        if(auth_token){
            getUserAccounts(); 
        }
    },[])
    
    return (
        <Box>
            {loading ? <LoadingSpinner /> :
                (
                    <>
                        <ToastContainer />
                        <div className=" mt-2 lg:xl:mt-2">          
                            {/*  View Bills */}  
                            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  gap-2 lg:xl:gap-4">  
                                {BillsData.map((element, id) => 
                                    <label htmlFor="my-modal-6" key={id} >
                                        <div onClick={() => billName(element)} className="card h-28 bg-base-100 shadow-xl cursor-pointer" key={id}>
                                            <div className="card-body">
                                                <div className="text-center">{element} </div>
                                            </div>
                                        </div>
                                    </label>
                                )}
                            </div>
                        </div> 

                        {/* paybill modal */}
                        <div className='models'>
                            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                            <label htmlFor="my-modal-6" className="modal cursor-pointer">
                                <label className="modal-box relative" htmlFor="">
                                    <label htmlFor="my-modal-6" className="btn btn-sm btn-circle absolute text-slate-900 hover:text-gray-50 right-2 top-2">✕</label>
                                    <h3 className="text-lg text-center font-bold">Pay Bill</h3>
                                    <div className="form-group col mb-8">
                                        <div>
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
                                        
                                        <div className="mt-2 mb-2">
                                            <div className="invalid-feedback text-start text-rose-600">{message}</div>
                                        </div>

                                        <div>
                                            <label className="label"><span className="label-text">Please enter your Pay@  reference number</span></label>
                                            <input  type="text" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Reference number" className="input input-bordered w-full max-w-s email" />
                                        </div>
                                        
                                        <div>
                                            <label className="label "><span className="label-text">Please enter the amount</span></label>
                                            <input  type="number" onKeyDown={ (evt) => {evt.key === 'e' && evt.preventDefault(); if (evt.code === 'Minus' )evt.preventDefault(); if (evt.shiftKey === true )evt.preventDefault(); if (evt.code === 'Comma' )evt.preventDefault(); }} min={0} max={99999}  value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="input input-bordered w-full max-w-s email" />
                                        </div> 
                                    </div>

                                    <div className="flex justify-end gap-8 mb-4">
                                        <button type=" sumbit" onClick={handleCancel}className="rounded-none suspend relative w-full lg:xl:w-28 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:suspend">Cancel</button>
                                        <button type=" sumbit" onClick={handleSave} className="rounded-none activate relative w-full lg:xl:w-28 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:activated">Confirm</button>
                                    </div>
                                </label>
                            </label>
                        </div>
                    </>
                )
            } 
        </Box>
    );
}

export default Bills;