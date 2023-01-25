import { Box, Typography} from "@mui/material";
import { MdAddCircleOutline } from "react-icons/md";
import { Outlet, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import * as Yup from 'yup';
import User from '../../../Service/Client/client.service';
import Tab from "../Navigations/TabNavbar";
import { Error, Success } from "../../../Helpers/toasters";

function ViewAccount(){
    const [account, setData] = useState("");
    
    const navigate = useNavigate();

    let randomDigits = 0;
    // form validation rules 
    const formSchema = Yup.object().shape({
        name: Yup.string().required('Savings Name is mendatory')
    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState;

    for (let i = 0; i < 8; i++) {
        let randomNum = parseInt(10000000 + Math.random() * (90000000 - 10000000))
        randomDigits = randomNum;
    }

    console.log(account.id);
    
    function onSubmit(data, event) {
        event.preventDefault();

        let userData = {
            data:{
                accountno : "16" + randomDigits,
                balance: 0,
                account_name: data.name,
                account_type: "Savings Pocket",
                account_status: "Active"
            }
        }

        
        User.createAccout(userData).then((reponse) => {
            console.log(reponse.data.data.id);
            Success('New Savings plan added');
            

            
        }).catch((error) => {
            Error('Unable to add new savings plan')
        })

        return false
    }
    
    return (
        <Box className="Box" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box className="heading">
                    <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} ></Typography>
                </Box>
            </Box>

            <Box className="card-request mt-10 lg:xl:mt-10">
                <div className="card " >
                    <div className="flex justify-between">
                        <Box className="text-start mb-5 hed">
                            <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >My Accounts</Typography>
                        </Box>
          
                        <label htmlFor="my-modal-4"  className="rounded-none bg-white add-savings cursor-pointer relative flex py-4 px-4 border border-transparent text-sm font-medium rounded-md text-black ">
                            <MdAddCircleOutline style={{color:"#009DE0", marginTop:"1px" }}className="mr-2.5 text-2xl" />
                            <h1 className="text-xl" >Add savings Plan</h1>
                        </label>
                    </div>

                    <Box className="mb-5 mt-5">
                        <div className="card w-full bg-base-100 shadow-xl">
                            <div className="card-body" >
                                <div className="flex justify-between">
                                    <div className="text-sm lg:xl:text-lg">{account.attributes.account_type}Account</div> 
                                    <div className="text-sm lg:xl:text-lg">Bal R {account.attributes.balance} </div>
                                </div>    
                            </div>
                        </div>
                    </Box>
                    
                    {/*  View all Accounts */} 
                    <Box className="text-start mb-2">
                        <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >Transactions</Typography>
                    </Box>
                    <Tab />
                    <Outlet  context={{ setData }}/>
                </div>
            </Box>

            {/*  Add new beneficiary */}       
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box modal-top" htmlFor="">
                <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute text-black hover:text-white right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Add savings plan</h3>

                    <form >
                        <div className="form-group col ">
                            <label className="label"><span className="label-text">Savings plan name:</span></label>
                            <input type="text" name="name"  {...register('name')}
                                className="input input-bordered w-full max-w-s email "/>
                                 <div className="invalid-feedback text-start text-rose-600">{errors.name?.message}</div>
                        </div>
                
                        <div className="form-group text-start pay-button col mt-10">
                            <label htmlFor="my-modal-4" onClick={handleSubmit(onSubmit)} className="rounded-none relative w-full lg:xl:w-36 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Add</label>
                        </div>           
                    </form>
                </label>
            </label>
        </Box>
    );
}

export default ViewAccount;