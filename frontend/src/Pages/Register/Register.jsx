import './Register.css';
import React, { useState } from 'react';
import { Box } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import { FaSignInAlt} from 'react-icons/fa';
import { Error, Success } from '../../Helpers/toasters';
import { getToken } from "../../Helpers/helpers";
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import AuthorService from '../../Service/auth.service';
import LoadingSpinner from '../../Components/Loader/LoaderSpinner';
import * as Yup from 'yup';
import Navbar from '../../Components/Navbar';

function Register() {

    const formSchema = Yup.object().shape({
        firstname: Yup.string().required('First Name is mendatory'),
        lastname: Yup.string().required('Last name is mendatory'),
        phone: Yup.string().required('Phone is mendatory'),
        username: Yup.string().required('Username is mendatory'),
        email: Yup.string().required('Email is mendatory')
            .email('invalid Email'),
        password: Yup.string().required('Password is mendatory')
            .min(6, 'Password must be at 6 char long'),
        confirmPwd: Yup.string().required('Password is mendatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })

    const [loading, setLoading] = useState(false);
    const token = getToken();
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState
    const navigate = useNavigate();

    function onSubmit(data, event) {
        event.preventDefault();
        setLoading(true);
        let userData = {
                //LOGIN DETAILS
                username: data.username,
                email: data.email,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname,
                phone: data.phone,
                usertype: "Client", 
                role: 1
        }

        //register User
        AuthorService.register(userData).then((response) => {
            console.log(response); 
            Success("Successfully registered");
            navigate("/application")
        }).catch((error) => {
            if(error.response.data.error.message === 'Email or Username are already taken') {
                Error('Email or Username are already taken');
                navigate("/auth/login");
            }else{
                console.log('An error occurred:', error.response);
                Error('Incorrect Username/Email or password entered')
            }
        }).finally(() => {
            setLoading(false);
        })

        reset();
        return false;
    }

    return (
        <>
            <Navbar />
            <Box className=' hero min-h-screen' >
                
                {loading ? <LoadingSpinner /> :
                    (
                        <>
                            {/* HEADER */}
                            <ToastContainer />
                            <div className="card cards lg:xl:mt-10 mt-16 lg:xl:w-2/5 w-96 rounded-none shadow-xl ">
                                <div className="card-body">
                                    <div className="body-header mb-4">
                                        <div className="text-dark text-left mt-2 text-xl">SkyBank</div>
                                    </div>
                                    
                                    <div className="body-header -mb-4">
                                        <div className="text-dark mt-2 text-left text-lg">Sign up to your account</div>
                                    </div>

                                    <div className="hozitontal-line -mb-4">
                                        <div className="divider"></div> 
                                    </div>
                                
                                    <form >
                                        <div className='grid grid-cols-1 lg:xl:grid-cols-2 gap-2'>
                                            <div className="form-group col mb-4">
                                                <label className="label"><span className="label-text">USERNAME OR EMAIL</span>  </label>
                                                <input type="text" name="firstname" placeholder="Enter First Name" {...register('firstname')}
                                                    className="input input-bordered w-full max-w-s email "/>
                                                    <div className="invalid-feedback text-rose-600">{errors.firstname?.message}</div>
                                            </div>

                                            <div className="form-group col mb-4">
                                                <label className="label"><span className="label-text">USERNAME OR EMAIL</span>  </label>
                                                <input type="text" name="lastname" placeholder="Enter Last Name" {...register('lastname')}
                                                    className="input input-bordered w-full max-w-s email "/>
                                                    <div className="invalid-feedback text-rose-600">{errors.lastname?.message}</div>
                                            </div>
                                        </div>

                                            <div className="form-group col mb-4">
                                                <label className="label"><span className="label-text">USERNAME </span>  </label>
                                                <input type="text" name="username" placeholder="Username " {...register('username')}
                                                    className="input input-bordered w-full max-w-s email "/>
                                                    <div className="invalid-feedback text-rose-600">{errors.username?.message}</div>
                                            </div>

                                            <div className="form-group col mb-4">
                                                <label className="label"><span className="label-text"> EMAIL</span>  </label>
                                                <input type="email" name="email" placeholder="Email" {...register('email')}
                                                    className="input input-bordered w-full max-w-s email "/>
                                                    <div className="invalid-feedback text-rose-600">{errors.email?.message}</div>
                                            </div>

                                            <div className="form-group col mb-4">
                                                <label className="label"><span className="label-text">CONTACT</span>  </label>
                                                <input type="text" name="phone" placeholder="PHONE NUMBER " {...register('phone')}
                                                    className="input input-bordered w-full max-w-s email "/>
                                                    <div className="invalid-feedback text-rose-600">{errors.phone?.message}</div>
                                            </div>
                                            
                                        <div className='grid grid-cols-1 lg:xl:grid-cols-2 gap-2'>
                                            <div className="form-group col mb-4">
                                                <label className="label"><span className="label-text">PASSWORD</span></label>
                                                <input type="password" name="password" placeholder="Password"  {...register('password')}
                                                    className="input input-bordered w-full max-w-s email "/>
                                                    <div className="invalid-feedback text-rose-600">{errors.password?.message}</div>
                                            </div>

                                            <div className="form-group col mb-4">
                                                <label className="label"><span className="label-text">Confirm Password</span></label>
                                                <input type="password" name="confirmPwd" placeholder="Confirm Password"  {...register('confirmPwd')}
                                                    className="input input-bordered w-full max-w-s email "/>
                                                    <div className="invalid-feedback text-rose-600">{errors.confirmPwd?.message}</div>
                                            </div>
                                        </div>
                                        <div className="form-group col text-left ">
                                            <button onClick={handleSubmit(onSubmit)} className="btn normal-case text-xl w-full lg:xl:w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" style={{backgroundColor:"#009DE0"}}><FaSignInAlt style={{marginTop: "3px", marginRight:"5px"}}/>Register </button>
                                        </div>
                                    </form>
                                    <div className="form-group mt-4">
                                        <p className = "Already">
                                            Already have an account? Click
                                            <NavLink to={"/auth/login"}  className="reg cursor-pointer" > here</NavLink> to log in
                                        </p>
                                    </div>
                                </div>
                            </div> 
                        </>
                    )
                }     
            </Box>
        </>
    );
}

export default Register;