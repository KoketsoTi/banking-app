import React from 'react'
import { useForm } from "react-hook-form";
import { Box} from "@mui/material";
import { TbExchange } from 'react-icons/tb';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSearchParams , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Success, Warning } from '../../helpers/toasters';
import { ToastContainer } from 'react-toastify';

function Confirmpassword() {
  
  // form validation rules 
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is mendatory')
      .min(6, 'Password must be at 6 char long'),
      
    confirmPwd: Yup.string()
      .required('Password is mendatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  })

  const formOptions = { resolver: yupResolver(formSchema) }
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  //get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState

  function onSubmit(data) {
    console.log(JSON.stringify(data, null, 4))

    let _data = {
      code : searchParams.get('code'),// this "code" is the code that you get from the link in confrim password
      password: data.password,
      passwordConfirmation : data.confirmPwd,
    }

    axios
    .post(
      'http://localhost:1337/api/auth/reset-password',_data,
      {
        headers: {
          Authorization:
            "Bearer 78becf3fa526372d3566ac856efc2446a9bd06be3a6a741903efa9fc0ea802a66db28b067bea38dd6bd95b7acef8d64e1fab7a27ec6eb1972fd438e44fa907604fdef9d66330bba9abb7296b67b2bd9130f2a6a31c24adb91adc7e4fb63a5310cccc93ad55bebb3a9b493125d96806742e839d55408a8ab5e8aa74d0b9b85528",
            
          },
      }
    )
    .then((response) => {
      // Handle success.
      Success("Password reset successful")
      navigate("/Admin/Login",{replace: true});

    })
    .catch((error) => {
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
                          <div className="text-dark mt-2 user-cicle">Change Password </div>
                      </div>

                      <div className="hozitontal-line -mb-4">
                          <div className="divider"></div> 
                      </div>
          
                      <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="form-group col mb-4">
                              <label className="label"><span className="label-text">Password</span></label>
                              <input type="password" name="password" placeholder="Enter Password" 
                                  className="input input-bordered w-full max-w-s email " {...register('password')}
                                  />
                                <div className="invalid-feedback text-rose-600">{errors.password?.message}</div>
                          </div>

                          <div className="form-group col mb-4">
                              <label className="label"><span className="label-text">Confirm Password</span></label>
                              <input type="password" name="confirmPwd" placeholder="Confirm Password"   {...register('confirmPwd')}
                                  className="input input-bordered w-full max-w-s email "/>
                              <div className="invalid-feedback text-rose-600">{errors.confirmPwd?.message}</div>
                          </div>

                          <div className="form-group col mt-10 mb-8">
                              <button className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><TbExchange style={{marginTop: "3px", marginRight:"5px"}}/>Change Password </button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </Box>

  )
}
export default Confirmpassword

