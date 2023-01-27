import { Box, Typography } from "@mui/material";
import { HiDatabase } from 'react-icons/hi';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate,useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { getToken } from '../Helpers/helpers';
import * as Yup from 'yup';
import { Success } from "../Helpers/toasters";
import { ToastContainer } from "react-toastify";

//Your account balance
export const Balances = ({ title, subtitle, balance  }) => {
    return (
        <div className="-mt-3">
            <p>{subtitle} </p>
            <p className="text-xl mt-2">R {balance} </p>
            <p className="-mb-3 mt-3">{title} </p>
        </div>
    );
};


//Your account Details
export const AccountDetails = ({ accnumber, acctype, accstatus, virtualcard, subtitle, icon  }) => {
    return (
        <div className="-mt-3">
            <div className="flex justify-between" >
                <h5 >{subtitle} </h5>
                <h5> {icon} </h5>
            </div>

            <hr className="divider"></hr>
            
            <div className="justify-between -mt-2" >
                <div className="flex justify-between mb-2" >
                    <h5 >Account Number</h5>
                    <h5 >{accnumber} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Account Type</h5>
                    <h5>{acctype} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Account Status</h5>
                    <h5 >{accstatus} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Virtual Card</h5>
                    <h5 >{virtualcard} </h5>
                </div>
            </div>
        </div>
    );
};


//User Information
export const GeneraInfo  = ({ firstname, lastname, email, birth_date, phone, address, surbub, city, zip, subtitle, icon  }) => {
    return (
        <div className="-mt-3">
            <div className="flex justify-between" >
                <h5>{subtitle} </h5>
                <h5> {icon} </h5>
            </div>

            <hr className="divider"></hr>
            
            <div className="justify-between -mt-2" >
                <div className="flex justify-between mb-2" >
                    <h5 >First Name</h5>
                    <h5 className="">{firstname} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Last Name</h5>
                    <h5 >{lastname} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Email</h5>
                    <h5 >{email} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Birth Date</h5>
                    <h5 >{birth_date} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Phone</h5>
                    <h5 >{phone} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Address</h5>
                    <h5 >{address} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Surbub</h5>
                    <h5 >{surbub} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >City</h5>
                    <h5 >{city} </h5>
                </div>

                <div className="flex justify-between" >
                    <h5>Zip Code</h5>
                    <h5>{zip} </h5>
                </div>
            </div> 
        </div>
    );
};


//Your account Details
export const Loan  = ({ shortloan, shortstatus, amount, term, rate, subtitle, icon  }) => {
    return (
        <Box width="100%" mt="20px" p="20px 30px">
            <Box display="flex" justifyContent="space-between" >
                <Typography variant="h5" style={{ color: "#4cceac" }}>{subtitle} </Typography>
                <Typography variant="h5" style={{ color: "#4cceac" }}> {icon} </Typography>
            </Box>

            <Box style={{ color: "#4cceac" }} className="divider"></Box>
            
            <Box justifyContent="space-between" mt="-5px" >
                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}> Loan</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {shortloan} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Amount</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {amount} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Term</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {term} months </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Rate</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {rate} p/a </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Loan Status</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {shortstatus} </Typography>
                </Box>
            </Box>
        </Box>
    );
};


const updateUser = (params) =>{

}


//Edit profile
export const EditProfile = ({ id, subtitle, firstname, lastname, email, birth_date, phone, address, surbub, city, zip }) => {
   
    const token = getToken()

    // form validation rules 
    const formSchema = Yup.object().shape({
        firstname: Yup.string().required('First Name is mendatory'),

        lastname: Yup.string().required('Last name is mendatory'),

        email: Yup.string().required('Email is mendatory')
            .email('invalid Email'),

        birth_date: Yup.string().required('Age is mendatory')
            .min(2, 'Age must be at least 2 char long'),

        phone: Yup.string().required('Phone is mendatory'),

        address: Yup.string().required('address is mendatory'),

        surbub: Yup.string().required('surbub is mendatory'),

        city: Yup.string().required('city is mendatory'),

        zip: Yup.string().required('zip is mendatory')
            .min(3, 'zip must be at least 3 char long')
            .max(4, 'zip must not be longer than 4 characters'),
    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState

    function onSubmit(data, event) {
        event.preventDefault();
        console.log(JSON.stringify(data, null, 4))
        let userData = {
            data:{
                firstname: data.firstname,
                lastname : data.lastname,
                email: data.email,
                birth_date : data.birth_date,
                phone: data.phone,
                address : data.address,
                surbub: data.surbub,
                city : data.city,
                zip : data.zip
            }
        }
        Success("Client information was updated succesffully")
        console.log(userData)
        return false
    }

    const click = () =>{
        console.log("Hello WOrld");
    }
  

    return (
        <Box>
            <ToastContainer /> 
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative w-full" htmlFor="">
                    <h3 className="text-lg text-center font-bold">{subtitle}</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">First Name</span></label>
                            <input name="firstname" type="text"  disabled value={firstname} className="input input-bordered w-full max-w-s email " /> 
                            
                        </div>

                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">Last Name</span></label>
                            <input name="lastname" type="text" disabled value={lastname}className="input input-bordered w-full max-w-s email" />
                           
                        </div>
                    </div>
                    

                    <div className="form-group col mb-4">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input name="email" type="email" disabled value={email} className="input input-bordered w-full max-w-s email" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">Date of Birth</span></label>
                            <input name="birth_date" type="text" disabled value={birth_date} className="input input-bordered w-full max-w-s email" />
                          
                        </div>

                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">Phone</span></label>
                            <input name="phone" type="text" value={phone} className="input input-bordered w-full max-w-s email " {...register('phone')} />
                            <div className="invalid-feedback text-rose-600">{errors.phone?.message}</div>
                        </div>
                    </div>

                    <div className="form-group col mb-4">
                        <label className="label"><span className="label-text">Address</span></label>
                        <input name="address" type="text" value={address} className="input input-bordered w-full max-w-s email " {...register('address')} />
                        <div className="invalid-feedback text-rose-600">{errors.surbub?.message}</div>
                    </div>


                    <div className="form-group col mb-4">
                        <label className="label"><span className="label-text">Surbub</span></label>
                        <input name="surbub" type="text" value={surbub} className="input input-bordered w-full max-w-s email " {...register('surbub')} />
                        <div className="invalid-feedback text-rose-600">{errors.surbub?.message}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">City</span></label>
                            <input name="city" type="text" value={city} className="input input-bordered w-full max-w-s email " {...register('city')} />
                            <div className="invalid-feedback text-rose-600">{errors.city?.message}</div>
                        </div>

                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">Zip</span></label>
                            <input name="zip" type="text" value={zip} className="input input-bordered w-full max-w-s email " {...register('zip')} />
                            <div className="invalid-feedback text-rose-600">{errors.zip?.message}</div>
                        </div>
                    </div>

                    <div className="form-group col mt-4 mb-2">
                        <button onClick={handleSubmit(onSubmit)} className="rounded-none relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                            <HiDatabase style={{ marginRight: "5px", fontSize: "20px" }}  />Update
                        </button>
                    </div>
                </label>
            </label>
        </Box>
    );
}

