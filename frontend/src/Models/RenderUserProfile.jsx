import { Box, Typography } from "@mui/material";
import { HiDatabase } from 'react-icons/hi';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate,useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { getToken } from '../helpers/helpers';
import * as Yup from 'yup';

//Your account balance
export const Balances = ({ title, subtitle, icon, balance  }) => {
    return (
        <Box width="100%" p="20px 30px">
            <Box display="flex" justifyContent="space-between" mt="2px" style={{ marginBottom: "10px" }} >
                <Typography variant="h5" style={{ color: "#4cceac" }}> {subtitle} </Typography>
            </Box>
 
            <Box display="flex" className="mt-2"  >
                <Typography variant="h5" > {icon} </Typography>
                <Typography variant="h5" style={{ color: "#4cceac",  fontSize: "25px", }} > {balance} </Typography>
            </Box>

            <Box className="mt-2">
                <Typography variant="h5" style={{ color: "#4cceac" }}> {title} </Typography>
            </Box>
        </Box>
    );
};

//Your account Details
export const AccountDetails = ({ accnumber, acctype, accstatus, virtualcard, subtitle, icon  }) => {
    return (
        <Box width="100%" mt="20px" p="20px 30px">
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" style={{ color: "#4cceac" }}>{subtitle} </Typography>
                <Typography variant="h5" style={{ color: "#4cceac" }}> {icon} </Typography>
            </Box>

            <Box style={{ color: "#4cceac" }} className="divider"></Box>
            
            <Box justifyContent="space-between" mt="-5px" >
                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Account Number</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {accnumber} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Account Type</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {acctype} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Account Status</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {accstatus} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Virtual Card</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {virtualcard} </Typography>
                </Box>
            </Box>
        </Box>
    );
};


//User Information
export const GeneraInfo  = ({ firstname, lastname, email, age, phone, address, surbub, city, zip, subtitle, icon  }) => {
    return (
        <Box width="100%" mt="20px" p="20px 30px">
            <Box display="flex" justifyContent="space-between" >
                <Typography variant="h5" style={{ color: "#4cceac" }}>{subtitle} </Typography>
                <Typography variant="h5" style={{ color: "#4cceac" }}> {icon} </Typography>
            </Box>

            <Box style={{ color: "#4cceac" }} className="divider"></Box>
            
            <Box justifyContent="space-between" mt="-5px" >
                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>First Name</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {firstname} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Last Name</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {lastname} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Email</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {email} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Age</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {age} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Phone</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {phone} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Address</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {address} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Surbub</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {surbub} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>City</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {city} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Zip Code</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {zip} </Typography>
                </Box>
            </Box>
        </Box>
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
export const EditProfile = ({ id, subtitle, firstname, lastname, email, age, phone, address, surbub, city, zip }) => {
    
    const token = getToken()

    // form validation rules 
    const formSchema = Yup.object().shape({
        firstname: Yup.string().required('First Name is mendatory'),

        lastname: Yup.string().required('Last name is mendatory'),

        email: Yup.string().required('Email is mendatory')
            .email('invalid Email'),

        age: Yup.string().required('Age is mendatory')
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
                age : data.age,
                phone: data.phone,
                address : data.address,
                surbub: data.surbub,
                city : data.city,
                zip : data.zip
            }
        }
    
        console.log(userData)
        return false
    }

    return (
        <Box>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative w-full" htmlFor="">
                    <h3 className="text-lg text-center font-bold">{subtitle}</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">First Name</span></label>
                            <input name="firstname" type="text" disabled placeholder={firstname} className="input input-bordered w-full max-w-s email " {...register('firstname')} /> 
                            <div className="invalid-feedback text-rose-600">{errors.firstname?.message}</div>
                        </div>

                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">Last Name</span></label>
                            <input name="lastname" type="text" disabled placeholder={lastname}className="input input-bordered w-full max-w-s email " {...register('lastname')} />
                            <div className="invalid-feedback text-rose-600">{errors.lastname?.message}</div>
                        </div>
                    </div>
                    

                    <div className="form-group col mb-4">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input name="email" type="email" disabled placeholder={email} className="input input-bordered w-full max-w-s email " {...register('email')} />
                        <div className="invalid-feedback text-rose-600">{errors.email?.message}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">Age</span></label>
                            <input name="age" type="number" disabled placeholder={age} className="input input-bordered w-full max-w-s email " {...register('age')} />
                            <div className="invalid-feedback text-rose-600">{errors.age?.message}</div>
                        </div>

                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">Phone</span></label>
                            <input name="phone" type="text" placeholder={phone} className="input input-bordered w-full max-w-s email " {...register('phone')} />
                            <div className="invalid-feedback text-rose-600">{errors.phone?.message}</div>
                        </div>
                    </div>

                    <div className="form-group col mb-4">
                        <label className="label"><span className="label-text">Address</span></label>
                        <input name="address" type="text" placeholder={address} className="input input-bordered w-full max-w-s email " {...register('address')} />
                        <div className="invalid-feedback text-rose-600">{errors.surbub?.message}</div>
                    </div>


                    <div className="form-group col mb-4">
                        <label className="label"><span className="label-text">Surbub</span></label>
                        <input name="surbub" type="text" placeholder={surbub} className="input input-bordered w-full max-w-s email " {...register('surbub')} />
                        <div className="invalid-feedback text-rose-600">{errors.surbub?.message}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">City</span></label>
                            <input name="city" type="text" placeholder={city} className="input input-bordered w-full max-w-s email " {...register('city')} />
                            <div className="invalid-feedback text-rose-600">{errors.city?.message}</div>
                        </div>

                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">Zip</span></label>
                            <input name="zip" type="text" placeholder={zip} className="input input-bordered w-full max-w-s email " {...register('zip')} />
                            <div className="invalid-feedback text-rose-600">{errors.zip?.message}</div>
                        </div>
                    </div>

                    <div className="form-group col mt-4 mb-2">
                        <button onClick={handleSubmit(onSubmit)}  className="rounded-none relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                            <HiDatabase style={{ marginRight: "5px", fontSize: "20px" }}  />Update
                        </button>
                    </div>
                </label>
            </label>
        </Box>
    );
}

