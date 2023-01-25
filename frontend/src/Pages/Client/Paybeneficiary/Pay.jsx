import { Box,Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GrAddCircle } from 'react-icons/gr';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { getToken } from "../../../Helpers/helpers";
import User from '../../../Service/Client/client.service';
import * as Yup from 'yup';
import { Error, Success } from "../../../Helpers/toasters";
import { ToastContainer } from "react-toastify";

function Pay(){
    const navigate = useNavigate()
    const [useBeneficiary, setBeneficiary] = useState([]);
    const [getId, setId] = useState([]);
    const setNewID = [];
    const [checkUser, setCheckUser] = useState([]);

    const auth_token = getToken();
  
    const payUser  = (params) => {
        navigate('/client/paybeneficiary', {state:{params} })
    }

    // form validation rules 
    const formSchema = Yup.object().shape({
        beneficiary: Yup.string().required('Beneficiary Name is mendatory'),
        accNumber: Yup.string().required('Account Number is mendatory'),
    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState;

    

    function getBeneficiary(){
        //Fetch client id
        User.getClientUser().then((response) => {
            setId(response.data.client_id.id)
            console.log(response.data.client_id.id);
            //fetch client beneficiaries using the id returned by the cliet
            User.getBeneficiaries(response.data.client_id.id).then((response) => {
                setBeneficiary(response.data.data.attributes.beneficary_id.data);
                setCheckUser(response.data.data.attributes.beneficary_id.data);
            }).catch((error) => {
                console.log(error);
                console.log("unable to get beneficiaries");
            })
        })
    }

    function onSubmit(data, event) {
        event.preventDefault();
        let userData = {
            data:{
                Name: data.beneficiary,
                account_no : data.accNumber,
                amount: 0
            }
        }

        useBeneficiary.map((response) => {
            setNewID.push(response.id)
        })

        //return an error if beneficiary already exist
        User.createBeneficiary(userData).then((response) => {
            // console.log(response.data.data.id)
            // console.log(getId);
            setNewID.push(response.data.data.id)

            let id = {data:{beneficary_id : setNewID}}
                   
            //Update relationships for the newly added beneficiary a new beneficiary
            User.updateClientBeneficiaryList(getId, id).then((response) => {
                Success(`${data.beneficiary} Successfully Added`)
            })

        }).catch((error) => {
            Error('Beneficiary account num already exist');
        }).finally(()=> {
            getBeneficiary();
        })

        return false
    }

    useEffect(() => {
        if(auth_token){
            getBeneficiary(); 
        }
    },[])

    return (
        <Box className="Box">
            <ToastContainer />
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box className="heading">
                    <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >Pay beneficiary</Typography>
                </Box>
            </Box>
            
            {/* CONTENT */}
            <Box>
                <div className=" mb-5 ">
                    <label htmlFor="my-modal-4"  className="rounded-none cursor-pointer relative flex justify-start py-4 px-4 border border-transparent text-sm font-medium rounded-md text-black ">
                        <GrAddCircle className="mr-2.5 text-4xl" />
                        <h1 className="text-2xl" >Add Beneficiary</h1>
                    </label>
                </div>
                
                {/*  View added beneficiaries */}  
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-2 lg:xl:gap-4">  
                {useBeneficiary.map((benefit) => {    
                     return (          
                    <div className="card bg-base-100 shadow-xl cursor-pointer" key={benefit.id} onClick={() => payUser(benefit)} >
                        <div className="card-body" >
                            <div className="flex ">
                                <div className="avatar placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-16 lg:xl:w-20">
                                        <span className="text-2xl lg:xl:text-3xl">
                                        {benefit?.attributes.Name?.slice(0, 1)?.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-5 mt-1">
                                    <div className="text-sm lg:xl:text-lg text-start">{benefit?.attributes.Name}</div>
                                    <div className="text-xs lg:xl:text-base text-start">{benefit?.attributes.updatedAt}</div>
                                    <div className="text-xs lg:xl:text-base text-start">R {benefit?.attributes.amount || 0}</div>
                                </div>
                            </div>    
                        </div>
                    </div>
                    );
                })}
                </div>
            </Box>

            {/*  Add new beneficiary */}       
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box modal-top" htmlFor="">
                <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute text-black hover:text-white right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Add Beneficiary</h3>
                    <p className="py-4">The beneficiary's details are not verified against the actual accountholder. Ensure you enter the correct details</p>
                
                    <form >
                        <div className="form-group col ">
                            <label className="label"><span className="label-text">Beneficiary Name:</span></label>
                            <input type="text" name="beneficiary" {...register('beneficiary')}
                                className="input input-bordered w-full max-w-s email "/>
                            <div className="invalid-feedback text-start text-rose-600">{errors.beneficiary?.message}</div>
                        </div>

                        <div className="form-group col ">
                            <label className="label"><span className="label-text">Account Number:</span></label>
                            <input type="number" name="accNumber" {...register('accNumber')}
                                className="input input-bordered w-full max-w-s email "/>
                            <div className="invalid-feedback text-start text-rose-600">{errors.accNumber?.message}</div>
                        </div>
                
                        <div className="form-group text-start pay-button col mt-10">
                            <label htmlFor="my-modal-4" onClick={handleSubmit(onSubmit)} className="rounded-none relative w-full lg:xl:w-36 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Add Beneficiary</label>
                        </div>           
                    </form>
                </label>
            </label>
        </Box>
    );
}

export default Pay;