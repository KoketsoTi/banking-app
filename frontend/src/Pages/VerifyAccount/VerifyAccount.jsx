import React from 'react'
import { useForm } from "react-hook-form";
import { Box} from "@mui/material";
import { AiOutlineLock } from 'react-icons/ai';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Success, Warning } from '../../Helpers/toasters';
import AuthorService from "../../Service/auth.service";
import * as Yup from 'yup';

function VerifyAccount() {

    // form validation rules 
    const formSchema = Yup.object().shape({
        password: Yup.string().required('Password is mendatory')
            .min(3, 'Password must be at 3 char long'),

        confirmPwd: Yup.string().required('Password is mendatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const [searchParams, setSearchParams] = useSearchParams();

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState

    const navigate = useNavigate();

    function onSubmit(data) {
        console.log(JSON.stringify(data, null, 4))
        
        let _data = {
            data:{
                code : searchParams.get('code'),
                password: data.password,
                passwordConfirmation : data.confirmPwd,
                confirmed: "True"
            }
        }
        console.log(_data);
        
        //call confirm password here
        AuthorService.SetNewPassword(_data).then((response) => { 
            // Handle success.
            Success("Password has been set you can proceed to login")
            navigate("/admin/Login",{replace: true});
        }).catch((error) => {
            // Handle error.
            Warning("Password was not successfull")
            console.log("An error occurred:", error.response);
        });
        return false
    }

    return (
        <Box className='login' >
            <ToastContainer />
            <div className="md:container md:mx-auto">
                <div className="flex justify-center">
                    <div className="card cards lg:xl:1/2 w-96 rounded-none shadow-xl ">
                        <div className="card-body">
                            <div className="body-header -mb-4">
                                <div className="text-dark mt-2 text-xl user-cicle">Set Up a Password</div>
                            </div>

                            <div className="body-header -mb-4">
                                <div className="text-dark mt-2 text-sm user-cicle">Create a password to login to your account, your email is your username</div>
                            </div>

                            <div className="hozitontal-line -mb-4">
                                <div className="divider"></div> 
                            </div>
                
                            <form >
                                <div className="form-group col mb-4">
                                    <label className="label"><span className="label-text">Password</span></label>
                                    <input type="password" name="password" placeholder="Enter Password" 
                                        className="input input-bordered w-full max-w-s email " {...register('password')}  />
                                    <div className="invalid-feedback text-rose-600">{errors.password?.message}</div>
                                </div>

                                <div className="form-group col mb-4">
                                    <label className="label"><span className="label-text">Confirm Password</span></label>
                                    <input type="password" name="confirmPwd" placeholder="Confirm Password" {...register('confirmPwd')} 
                                        className="input input-bordered w-full max-w-s email "/>
                                    <div className="invalid-feedback text-rose-600">{errors.confirmPwd?.message}</div>
                                </div>

                                <div className="form-group col mt-10 mb-8">
                                    <button onClick={handleSubmit(onSubmit)} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><AiOutlineLock style={{marginTop: "3px", marginRight:"5px"}}/>Create Password </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}
export default VerifyAccount;