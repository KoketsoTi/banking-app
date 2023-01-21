import React, { useState } from 'react';
import { Box } from "@mui/material";
import { HiOutlineDocument} from 'react-icons/hi';
import { AiOutlineRollback } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useForm } from "react-hook-form";
import { Link, useNavigate,useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { getToken } from '../../helpers/helpers';
import { Success, Warning } from '../../helpers/toasters';
import { ToastContainer } from 'react-toastify';
import NewUser from '../../Service/clients.service';

function Apply() {
    const token = getToken()
    let navigate = useNavigate();

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
                usertype: "Client",
                age : data.age,
                phone: data.phone,
                address : data.address,
                surbub: data.surbub,
                city : data.city,
                zip : data.zip
            }
        }

        NewUser.ApplicationForm(userData).then((response) => { 
            Success("Application was successful, wait for email with an application status ");
        })
        .catch((error) => {  
            console.log('An error occurred:', error.response);
            Warning('Unable to apply ')
        });
       
        console.log(userData)
        return false
    }

    const goBack = () => {
		navigate("/admin/Login");
	}
    
    return (
        <Box className='login' >
             <ToastContainer />
            <div className="md:container md:mx-auto">
                <div className="flex justify-center">
                    <div className="form-group   col mb-4 back lg:hidden" >
                        <Link to={goBack} ><BiArrowBack  className="rounded-none border-none absolute justify-center text-3xl border rounded-md " style={{marginTop: "3px", marginRight:"5px"}} /></Link>
                    </div>
                    <div className="card  lg:xl:w-1/2 w-96 rounded-none shadow-xl ">
                        <div className="card-body">
                            
                            <div className="body-header -mb-4">
                                <div className="text-dark mt-2 user-cicle">Application Form</div>
                            </div>

                            <div className="hozitontal-line -mb-4">
                                <div className="divider"></div> 
                            </div>
                 
                            <form >
                                <div className='grid grid-cols-1 lg:xl:grid-cols-2 lg:xl:gap-8 mb-2'>
                                    <div className="form-group col mb-2">
                                        <label className="label"><span className="label-text">First Name</span></label>
                                        <input type="text" name="firstname" placeholder="First Name" {...register('firstname')}
                                            className="input input-bordered w-full max-w-s email "/>
                                        <div className="invalid-feedback text-rose-600">{errors.firstname?.message}</div>
                                    </div>

                                    <div className="form-group col">
                                        <label className="label"><span className="label-text">Last Name</span></label>
                                        <input type="text" name="lastname" placeholder="Last Name" {...register('lastname')}
                                            className="input input-bordered w-full max-w-s email "/>
                                        <div className="invalid-feedback text-rose-600">{errors.lastname?.message}</div>
                                    </div>
                                </div>

                                <div className="form-group col mb-2">
                                    <label className="label"><span className="label-text">Email</span></label>
                                    <input type="text" name="email" placeholder="Email" {...register('email')}
                                            className="input input-bordered w-full max-w-s email "/>
                                    <div className="invalid-feedback text-rose-600">{errors.email?.message}</div>
                                </div>

                                <div className="form-group col mb-2">
                                    <label className="label"><span className="label-text">Usertype</span></label>
                                    <input type="text" name="usertype" disabled value="Client" placeholder="Usertype" {...register('usertype')}
                                            className="input input-bordered w-full max-w-s email "/>
                                </div>

                                <div className='grid grid-cols-1 lg:xl:grid-cols-2 lg:xl:gap-8 mb-2'>
                                    <div className="form-group col mb-2">
                                        <label className="label"><span className="label-text">Phone</span></label>
                                        <input type="text" name="phone" placeholder="Phone" {...register('phone')}
                                            className="input input-bordered w-full max-w-s email "/>
                                        <div className="invalid-feedback text-rose-600">{errors.phone?.message}</div>
                                    </div>

                                    <div className="form-group col mb-2">
                                        <label className="label"><span className="label-text">Age</span></label>
                                        <input type="number" name="age" placeholder="Age" {...register('age')}
                                            className="input input-bordered w-full max-w-s email "/>
                                        <div className="invalid-feedback text-rose-600">{errors.age?.message}</div>
                                    </div>
                                </div>
                                <div className="form-group col mb-2">
                                    <label className="label"><span className="label-text">Address</span></label>
                                    <input type="text" name="address" placeholder="Address" {...register('address')}
                                            className="input input-bordered w-full max-w-s email "/>
                                    <div className="invalid-feedback text-rose-600">{errors.address?.message}</div>
                                </div>
                                <div className="form-group col mb-2">
                                    <label className="label"><span className="label-text">Surbub</span></label>
                                    <input type="text" name="surbub" placeholder="Surbub" {...register('surbub')}
                                            className="input input-bordered w-full max-w-s email "/>
                                    <div className="invalid-feedback text-rose-600">{errors.surbub?.message}</div>
                                </div>
                                <div className='grid grid-cols-1 lg:xl:grid-cols-2 lg:xl:gap-8 mb-8'>
                                    <div className="form-group col mb-2">
                                        <label className="label"><span className="label-text">City</span></label>
                                        <input type="text" name="city" placeholder="City" {...register('city')}
                                            className="input input-bordered w-full max-w-s email "/>
                                        <div className="invalid-feedback text-rose-600">{errors.city?.message}</div>
                                    </div>

                                    <div className="form-group col">
                                        <label className="label"><span className="label-text">Zip</span></label>
                                        <input type="number" name="zip" placeholder="Zip" {...register('zip')}
                                            className="input input-bordered w-full max-w-s email "/>
                                        <div className="invalid-feedback text-rose-600">{errors.zip?.message}</div>
                                    </div>
                                </div>


                                <div className='grid grid-cols-2 gap-8 '>
                                    <div className="form-group col mb-4 hidden lg:contents">
                                        <button onClick={handleSubmit(onSubmit)} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><HiOutlineDocument style={{marginTop: "3px", marginRight:"5px"}}/>Submit Application </button>
                                    </div>

                                    <div className="form-group col mb-4 hidden lg:contents ">
                                        <button onClick={goBack} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><AiOutlineRollback style={{marginTop: "3px", marginRight:"5px"}}/>Back </button>
                                    </div>
                                </div>
                                <div className="form-group col mb-4 lg:hidden">
                                     <button onClick={handleSubmit(onSubmit)}  className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><HiOutlineDocument style={{marginTop: "3px", marginRight:"5px"}}/>Submit Application </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
}

export default Apply;