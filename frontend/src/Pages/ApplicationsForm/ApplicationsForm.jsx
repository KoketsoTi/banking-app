import React from 'react';
import { Box } from "@mui/material";
import { HiOutlineDocument} from 'react-icons/hi';
import { AiOutlineRollback } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Success, Warning } from '../../Helpers/toasters';
import { ToastContainer } from 'react-toastify';
import NewUser from '../../Service/clients.service';
import * as Yup from 'yup';
import { useState } from 'react';

function Apply() {
    let navigate = useNavigate();
    let randomDigits = 0;

    for (let i = 0; i < 8; i++) {
        let randomNum = parseInt(10000000 + Math.random() * (90000000 - 10000000))
        randomDigits = randomNum;
    }
     
    // form validation rules 
    const formSchema = Yup.object().shape({
        firstname: Yup.string().required('First Name is mendatory'),
        lastname: Yup.string().required('Last name is mendatory'),
        email: Yup.string().required('Email is mendatory')
            .email('invalid Email'),
        birth_date: Yup.string().required('Date of birth is mendatory'),
        phone: Yup.string().required('Phone is mendatory'),
        address: Yup.string().required('address is mendatory'),
        surbub: Yup.string().required('surbub is mendatory'),
        city: Yup.string().required('city is mendatory'),
        zip: Yup.string().required('zip is mendatory')
            .min(3, 'zip must be at least 3 char long')
            .max(4, 'zip must not be longer than 4 characters'),
        country: Yup.string().required('Nationality is mendatory'),
        Occupation: Yup.string().required('Occupation is mendatory'),
        accName: Yup.string().required('Account name is mendatory')
    })

    const [stepTotal, setStepTotal] = useState(3);
    const [stepNext, setStepNext] = useState(1);


    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState
    
    function onSubmit(data, event) {
        event.preventDefault();
        let userData = {
            data:{
                firstname: data.firstname,
                lastname : data.lastname,
                email: data.email,
                usertype: "Client",
                birth_date: data.birth_date,
                phone: data.phone,
                street_address : data.address,
                surbub: data.surbub,
                city : data.city,
                zipcode : data.zip,
                country: data.country,
                Occupation: data.Occupation,

                //BANK ACCOUNT
                accountno: "14" + randomDigits,
                account_name: data.accName + " Account",
                balance: 0,
                account_type: data.accName,
                account_status: "Pending",
                
                //LOGIN DETAILS
                username: data.username,
                email: data.email,
                password: data.password,
                role: 1,
            }
        }

        console.log(userData);

        NewUser.ApplicationForm(userData).then((response) => { 
            Success("Application was successful");
        })
        .catch((error) => {  
            console.log('An error occurred:', error.response);
            Warning('Unable to apply ')
        });
       
        return false
    }

    const goBack = () => {
		navigate("/auth/login");
	}
    
    return (
        <Box className='login' >
            <ToastContainer />
            <div className='mt-20'>
                <div className="flex justify-center ">
                    <div className="form-group col mb-4 back lg:hidden" >
                        <Link to={goBack} ><BiArrowBack  className="rounded-none border-none absolute justify-center text-3xl border rounded-md " style={{marginTop: "3px", marginRight:"5px"}} /></Link>
                    </div>
                    <div className="card  lg:xl:w-3/5 w-96 rounded-none shadow-xl ">
                        <div className="card-body">
                            
                            <div className="body-header -mb-4">
                                <div className="text-dark mt-2 text-2xl user-cicle">Application Form</div>
                            </div>

                            <div className="hozitontal-line -mb-4">
                                <div className="divider"></div> 
                            </div>

                            <div className='text-start text-xl'>
                                Step {stepNext}/{stepTotal}
                            </div>
                            <form >
                                <div className='step 1' >
                                    <div className='text-lg text-start'>Personal Information</div>
                                    <div className='grid grid-cols-1 lg:xl:grid-cols-2 lg:xl:gap-4 '>
                                        <div className="form-group">
                                            <label className="label"><span className="label-text">First Name</span></label>
                                            <input type="text" name="firstname" placeholder="First Name" {...register('firstname')}
                                                className="input input-bordered w-full max-w-s email "/>
                                            <div className="invalid-feedback text-rose-600">{errors.firstname?.message}</div>
                                        </div>

                                        <div className="form-group">
                                            <label className="label"><span className="label-text">Last Name</span></label>
                                            <input type="text" name="lastname" placeholder="Last Name" {...register('lastname')}
                                                className="input input-bordered w-full max-w-s email "/>
                                            <div className="invalid-feedback text-rose-600">{errors.lastname?.message}</div>
                                        </div>

                                        <div className="form-group">
                                            <label className="label"><span className="label-text">Email</span></label>
                                            <input type="email" name="email" placeholder="Email" {...register('email')}
                                                    className="input input-bordered w-full max-w-s email "/>
                                            <div className="invalid-feedback text-rose-600">{errors.email?.message}</div>
                                        </div>

                                        <div className="form-group">
                                            <label className="label"><span className="label-text">Date of birth</span></label>
                                            <input type="date" name="birth_date" placeholder="date of birth" {...register('birth_date')}
                                                className="input input-bordered w-full max-w-s email "/>
                                            <div className="invalid-feedback text-rose-600">{errors.birth_date?.message}</div>  
                                        </div>

                                        <div className="form-group">
                                            <label className="label"><span className="label-text">Phone</span></label>
                                            <input type="text" name="phone" placeholder="Phone" {...register('phone')}
                                                className="input input-bordered w-full max-w-s email "/>
                                            <div className="invalid-feedback text-rose-600">{errors.phone?.message}</div>
                                        </div>
                
                                        <div className="form-group">
                                            <label className="label"><span className="label-text">Occupation</span></label>
                                            <input type="text" name="Occupation" placeholder="Occupation" {...register('Occupation')}
                                                className="input input-bordered w-full max-w-s email "/>
                                            <div className="invalid-feedback text-rose-600">{errors.Occupation?.message}</div>
                                        </div>

                                        <div className="form-group">
                                            <label className="label"><span className="label-text">Address</span></label>
                                            <input type="text" name="address" placeholder="Address" {...register('address')}
                                                    className="input input-bordered w-full max-w-s email "/>
                                            <div className="invalid-feedback text-rose-600">{errors.address?.message}</div>
                                        </div>

                                        <div className="form-group">
                                            <label className="label"><span className="label-text">Surbub</span></label>
                                            <input type="text" name="surbub" placeholder="Surbub" {...register('surbub')}
                                                    className="input input-bordered w-full max-w-s email "/>
                                            <div className="invalid-feedback text-rose-600">{errors.surbub?.message}</div>
                                        </div>

                                        <div className="form-group">
                                            <label className="label"><span className="label-text">City</span></label>
                                            <input type="text" name="city" placeholder="City" {...register('city')}
                                                className="input input-bordered w-full max-w-s email "/>
                                            <div className="invalid-feedback text-rose-600">{errors.city?.message}</div>
                                        </div>

                                        <div className="form-group">
                                            <label className="label"><span className="label-text">Zip</span></label>
                                            <input type="number" name="zip" placeholder="Zip" {...register('zip')}
                                                className="input input-bordered w-full max-w-s email "/>
                                            <div className="invalid-feedback text-rose-600">{errors.zip?.message}</div>
                                        </div>
                                    </div>
                                    <div className="form-group col mb-2">
                                        <label className="label"><span className="label-text">Country</span></label>
                                        <input type="text" name="country" placeholder="Country" {...register('country')}
                                            className="input input-bordered w-full max-w-s email "/>
                                        <div className="invalid-feedback text-rose-600">{errors.country?.message}</div>
                                    </div>
                                </div>        
                            </form>   

                            <div>
                                <div className="form-group col mb-2 mt-4  text-end">
                                    <button className="rounded-none relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Next </button>
                                </div>
                            </div>                       
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
}

export default Apply;


                                   
       /*                         <div className="form-group col">
                                    <label className="label"><span className="label-text">Account Name</span></label>
                                    <select type="text" name="accName" placeholder="Select account you wish to open" {...register('accName')}
                                        className="input input-bordered w-full max-w-s email ">
                                            <option>Select Account Name</option>
                                            <option value={"Cheque"}>Cheque Account</option>
                                            <option value={"Savings"}>Saving Account</option>
                                    </select>
                                    <div className="invalid-feedback text-rose-600">{errors.accName?.message}</div>
                                </div>

                                <div className='grid grid-cols-1 lg:xl:grid-cols-2 lg:xl:gap-8 mb-8'>
                                    <div className="form-group col mb-2">
                                        <label className="label"><span className="label-text">Username</span></label>
                                        <input type="text" name="username" placeholder="Country" {...register('username')}
                                            className="input input-bordered w-full max-w-s email "/>
                                        <div className="invalid-feedback text-rose-600">{errors.username?.message}</div>
                                    </div>

                                    <div className="form-group col">
                                        <label className="label"><span className="label-text">Password</span></label>
                                        <input type="password" name="password" placeholder="Password" {...register('password')}
                                            className="input input-bordered w-full max-w-s email "/>
                                        <div className="invalid-feedback text-rose-600">{errors.password?.message}</div>
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

  <div className="form-group col mb-4 lg:hidden">
                                     <button onClick={handleSubmit(onSubmit)}  className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><HiOutlineDocument style={{marginTop: "3px", marginRight:"5px"}}/>Submit Application </button>
                                </div>
                            */