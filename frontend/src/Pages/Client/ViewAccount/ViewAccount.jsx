import { Box, Typography} from "@mui/material";
import { MdAddCircleOutline } from "react-icons/md";
import { Outlet, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import { Error, Success } from "../../../Helpers/toasters";
import { ToastContainer } from "react-toastify";
import * as Yup from 'yup';
import User from '../../../Service/Client/client.service';
import Tab from "../Navigations/TabNavbar";
import { useEffect } from "react";
import LoadingSpinner from "../../../Components/Loader/LoaderSpinner";

function ViewAccount(){
    //Inititialize state with dummy data
    const userData = {
        account_status : "Active",
        account_type: "Cheque ",
        accountno: "1435835554",
        balance: 20000,
        createdAt: "2023-01-25T18:27:01.193Z",
        updatedAt: "2023-01-25T18:27:01.193Z" 
    }
    const [account, setData] = useState(userData);
    const [loading, setLoading] = useState(false);
    const [getId, setId] = useState(userData);
    const [getAccounts, setAccount] = useState(userData);
    const setNewID = [];
    const navigate = useNavigate();

    let randomDigits = 0;
    
    // form validation rules 
    const formSchema = Yup.object().shape({
        name: Yup.string().required('Savings Name is mendatory')
    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState;

    //create account number of 8 numbers 
    for (let i = 0; i < 8; i++) {
        let randomNum = parseInt(10000000 + Math.random() * (90000000 - 10000000))
        randomDigits = randomNum;
    }

    //Get view userAccount
    function getUserAccounts(){
        setLoading(true);
        //Fetch client id
        User.getClientUser().then((response) => {
            setId(response.data.client_id.id)

            //fetch client accounts using the id returned by the request above
            User.getBeneficiaries(response.data.client_id.id).then((response) => {
                setAccount(response.data.data.attributes.acc_id.data);
                console.log(response.data.data.attributes.acc_id.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                console.log("unable to get user accounts");
            })
        })
    }

    useEffect(() => {
        getUserAccounts();
    }, [])
    
    function onSubmit(data, event) {
        event.preventDefault();
        setLoading(true);
        //group all data to be sent to backend
        let userData = {
            data:{
                accountno : "16" + randomDigits,
                balance: 0,
                account_name: data.name,
                account_type: "Savings Pocket",
                account_status: "Active"
            }
        }

        getAccounts.map((response) => {
            setNewID.push(response.id)
        })

        //the account created 
        User.createAccout(userData).then((reponse) => {
            setNewID.push(reponse.data.data.id)

            //Join the new saving plan added with the old savings plans added
            let id = {data:{acc_id: setNewID}}

            //link the account added to the user who created the account
            //Update relationships for the newly added savings plan
            User.updateClientWithNewSavings(getId, id).then((response) => {
                setLoading(true);
                Success(`${data.beneficiary} Savings plan Successfully Added`)
            })
        }).catch((error) => {
            Error('Unable to add new savings plan')
        })

        return false
    }

    return (
        <Box className="Box" >
            {loading ? <LoadingSpinner /> :
                (
                    <>
                        {/* HEADER */}
                        <ToastContainer />
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
                                                <div className="text-sm lg:xl:text-lg">{account.account_name}</div> 
                                                <div className="text-sm lg:xl:text-lg">Bal R {account.balance.toLocaleString()} </div>
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
                    </>
                )
            }
        </Box>
    );
}

export default ViewAccount;