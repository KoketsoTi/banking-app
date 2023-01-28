import { Box, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { FiDatabase } from "react-icons/fi";
import { useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import LoadingSpinner from "../../../Components/Loader/LoaderSpinner";
import { useState } from "react";

function RegisterAdmin() {
 // form validation rules 
    const formSchema = Yup.object().shape({
        firstname: Yup.string().required('First Name is mendatory'),

        lastname: Yup.string().required('Last name is mendatory'),

        username: Yup.string().required('Username is mendatory'),

        email: Yup.string().required('Email is mendatory')
            .email('invalid Email'),

        age: Yup.string().required('Age is mendatory')
            .min(2, 'Age must be at least 2 char long'),

        phone: Yup.string().required('Phone is mendatory'),
    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState
    
    function onSubmit(data) {
        console.log(JSON.stringify(data, null, 4))
        let _data = {
            code : searchParams.get('code'),
            firstname: data.firstname,
            lastname : data.lastname,
            username: data.username,
            email: data.email,
            usertype: "Admin",
            phone: data.phone,
        }

        console.log(_data)
        return false
    }

    return (
        <Box m="20px">
            {loading ? <LoadingSpinner /> :
                (
                    <>
                        <ToastContainer />
                        {/* HEADER */}
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box mb="30px">
                                <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> Add New Admin </Typography>
                            </Box>
                        </Box>

                        <div className="container ">
                            <div className="flex justify-center">
                                <div className="card lg:xl:w-1/2 w-96 rounded-none shadow-xl ">
                                    <div className="card-body">
                            
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
                                                <label className="label"><span className="label-text">Username</span></label>
                                                <input type="text" name="username"  placeholder="Username" {...register('username')}
                                                        className="input input-bordered w-full max-w-s email "/>
                                                <div className="invalid-feedback text-rose-600">{errors.username?.message}</div>
                                            </div>

                                            <div className="form-group col mb-2">
                                                <label className="label"><span className="label-text">Email</span></label>
                                                <input type="text" name="email" placeholder="Email" {...register('email')}
                                                        className="input input-bordered w-full max-w-s email "/>
                                                <div className="invalid-feedback text-rose-600">{errors.email?.message}</div>
                                            </div>

                                            <div className="form-group col mb-2">
                                                <label className="label"><span className="label-text">Phone</span></label>
                                                <input type="text" name="phone"  placeholder="Phone Number" {...register('phone')}
                                                        className="input input-bordered w-full max-w-s email "/>
                                                <div className="invalid-feedback text-rose-600">{errors.phone?.message}</div>
                                            </div>

                                            <div className="form-group col mb-10">
                                                <button onClick={handleSubmit(onSubmit)} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><FiDatabase style={{marginTop: "3px", marginRight:"5px"}}/>Register Admin </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </Box>
    );
}

export default RegisterAdmin;