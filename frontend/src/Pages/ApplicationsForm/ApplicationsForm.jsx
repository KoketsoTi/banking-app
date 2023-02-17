import React, { useState } from 'react';
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Success, Warning } from '../../Helpers/toasters';
import { ToastContainer } from 'react-toastify';
import NewUser from '../../Service/clients.service';
import * as Yup from 'yup';
import Navbar from '../../Components/Navbar';

function Apply() {
    let navigate = useNavigate();
    let randomDigits = 0;

    for (let i = 0; i < 8; i++) {
        let randomNum = parseInt(10000000 + Math.random() * (90000000 - 10000000))
        randomDigits = randomNum;
    }
     
    // form validation rules 
    const formSchema = Yup.object().shape({
        //Personal Information
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

        //Bank Account Infomation
        select: Yup.string().required('Account name is mendatory'),
        balance: Yup.string().required('Initial Deposit name is require or Put zero and deposit at a later stage'),       
    })

    const doSomething = async (value) => {
        // do something with my select value onChange
        await trigger(['select']) // Trigger validation on select
    };
    
    const [stepNext, setStepNext] = useState(1);
    const [goSteps, setGoSteps] = useState(1);

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, trigger, formState } = useForm(formOptions)
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
                account_name: data.select + " Account",
                balance: data.balance,
                account_type: data.select,
                account_status: "Pending",
            }
        }

        NewUser.ApplicationForm(userData).then((response) => { 
            Success("Application was successful");
            navigate("/auth/login");
        })
        .catch((error) => {  
            console.log('An error occurred:', error.response);
            Warning('Unable to apply ')
        });
        
        reset();
        return false
    }
    
    const nextStep = () => {
        if(stepNext < 3){
            setStepNext(stepNext => stepNext + 1);
            setGoSteps(goSteps => goSteps + 1);
        }
    }

    const previousStep = () => {
        if(stepNext > 1){
            setStepNext(stepNext => stepNext - 1);
            setGoSteps(goSteps => goSteps - 1);
        }
    }   

    return (
        <>
           <Navbar />
            <Box className='min-h-screen' >
                <ToastContainer />
                <div className=''>
                    <div className="flex justify-center pt-28">
                        {/* <div className="form-group col mb-4 back lg:hidden" >
                            <Link to={goBack} ><BiArrowBack  className="rounded-none border-none absolute justify-center text-3xl border rounded-md " style={{marginTop: "3px", marginRight:"5px"}} /></Link>
                        </div> */}
                        <div className="card lg:xl:w-3/5 w-96 rounded-none shadow-xl ">
                            <div className="card-body ">
                                <div className="body-header -mb-4">
                                    <div className="text-dark mt-2 text-2xl user-cicle">Application Form</div>
                                </div>

                                <div className="hozitontal-line -mb-4">
                                    <div className="divider"></div> 
                                </div>

                                <div className='text-start text-xl'>
                                    Step {stepNext}/{3}
                                </div>
                                <form className='text-start' >
                                    {goSteps === 1 && (
                                        <div>
                                            <div className='text-lg text-start'>Personal Information</div>
                                            <div className='grid grid-cols-1 md:grid-cols-1 lg:xl:grid-cols-2 lg:xl:gap-4 '>
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
                                            </div>
                                        </div> 
                                    )}
                                    {goSteps === 2 && (
                                        <div>
                                            <div className='text-lg text-start'>Continue Personal Information</div>
                                            <div className='grid grid-cols-1 md:grid-cols-1 lg:xl:grid-cols-2 lg:xl:gap-4 '>
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

                                                <div className="form-group mb-2">
                                                    <label className="label"><span className="label-text">Zip</span></label>
                                                    <input type="number" name="zip" placeholder="Zip" {...register('zip')}
                                                        className="input input-bordered w-full max-w-s email "/>
                                                    <div className="invalid-feedback text-rose-600">{errors.zip?.message}</div>
                                                </div>
                                            </div>

                                            <div className="form-group mb-2">
                                                <label className="label"><span className="label-text">Nationality</span></label>
                                                <input type="text" name="country" placeholder="Nationality" {...register('country')}
                                                    className="input input-bordered w-full max-w-s email "/>
                                                <div className="invalid-feedback text-rose-600">{errors.country?.message}</div>
                                            </div>
                                        </div>
                                    )}
                                    {goSteps === 3 && (
                                        <div>
                                            <div className='text-lg text-start'>Account Information</div>
                                        
                                                <div className="form-group col">
                                                    <label className="label"><span className="label-text">Account Name</span></label>
                                                    <select type="text" placeholder="Select account you wish to open" {...register('select')}
                                                        className="input input-bordered w-full max-w-s email" onChange={(e) => doSomething(e.target.value)}>
                                                            <option >Select Account Name</option>
                                                            <option value={"Cheque"}>Cheque Account</option>
                                                            <option value={"Savings"}>Saving Account</option>
                                                    </select>
                                                    <div className="invalid-feedback text-rose-600">{errors.select?.message}</div>
                                                </div>

                                                <div className="form-group col mb-2">
                                                    <label className="label"><span className="label-text">Balance</span></label>
                                                    <input type="number" min="0" max="10000"  name="balance" {...register('balance')}
                                                        className="input input-bordered w-full max-w-s email" />
                                                        <div className="invalid-feedback text-rose-600">{errors.balance?.message}</div>
                                                </div>
                                        
                                        </div>
                                    )}        
                                </form>   

                                <div className='flex justify-end'>
                                    {stepNext != 1
                                        ?   <div className="form-group col mb-2 mt-4  text-end">
                                                <button onClick={previousStep}  className="rounded-none relative flex w-24 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Previous </button>
                                            </div>
                                        :
                                            <>
                                            </>
                                    }
                                    {stepNext != 3
                                        ?   <div className="form-group col mb-2 mt-4  text-end">
                                                <button onClick={nextStep}  className="rounded-none ml-10 relative flex w-24 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Next </button>
                                            </div>
                                        :
                                            <div className="form-group col mb-2 mt-4  text-end">
                                                <button onClick={handleSubmit(onSubmit)}  className="rounded-none activate ml-10 relative flex    justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> Submit Application </button>
                                            </div>
                                    }           
                                </div>                       
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    );
}

export default Apply;
