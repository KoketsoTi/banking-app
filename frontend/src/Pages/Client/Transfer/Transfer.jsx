
import { Box, Typography} from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from "react";
import { getToken } from "../../../Helpers/helpers";
import { useForm } from "react-hook-form";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import * as Yup from 'yup';
import User from '../../../Service/Client/client.service';
import Calculations from '../../../Components/Transactions';


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
    const auth_token = getToken();
    const [amount, setAmt] = useState();
    const [fromData, setFromData] = useState();
    const [toData, setToData] = useState();

    function ToAccount(params){
        setFromData(params);
    } 

    function FromAccount(params){
        setToData(params);
    } 

    console.log(fromData);
    console.log(toData);

    // form validation rules 
    const formSchema = Yup.object().shape({
        amount: Yup.string().required('Amount Name is mendatory'),
        ownref: Yup.string().required('Own Reference is mendatory'),
    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState;

    function onSubmit(data, event) {
        event.preventDefault();
        setAmt(useAccount[1].attributes.balance)
        let value = Calculations.TransferMoney(amount, data.amount);
        let userData = {
            data:{
                beneficiary: data.amount,
                ownref : data.ownref,
                amount:value
            }
        }

        console.log(userData);      
        return false
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
        if(auth_token){
            getUserAccounts(); 
        }
    },[])

    return (
        <Box className="Box" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
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
                                <label className="label"><span className="label-text">FROM:</span></label> 
                                <select  className="input input-bordered w-full max-w-s email" name="numYears" >
                                    {useAccount.map((index) => {
                                        return(
                                            <option key={index.id} value={index.attributes.account_name} onClick={() =>FromAccount(index)}>
                                                {index.attributes.account_name}
                                            </option>
                                        );
                                    })}
                                </select>   
                            </div>
                            <div>
                                <label className="label"><span className="label-text">TO:</span></label>
                                <select className="input input-bordered w-full max-w-s email" name="numYears" >
                                    {useAccount.map((index) => {
                                        return(
                                            <option key={index.id} value={index.attributes.account_name} onClick={()=>ToAccount(index)}>
                                                {index.attributes.account_name}
                                            </option>
                                        );
                                    })}                  
                                </select>    
                            </div>
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
                                    <input type="text" name="ownref" {...register('ownref')}
                                        className="input input-bordered w-full max-w-s email "/>
                                    <div className="invalid-feedback text-start text-rose-600">{errors.ownref?.message}</div>
                                </div>
                            </div>
                            <div className="form-group text-start pay-button col mt-10">
                                <button onClick={handleSubmit(onSubmit)} className="rounded-none relative w-full lg:xl:w-28 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Transfer</button>
                            </div>           
                        </form>
                    </div>
                </div>
            </Box>
        </Box>
    );
}

export default Transfer;