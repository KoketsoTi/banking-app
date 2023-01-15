import React from 'react'
import { useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import { TbExchange } from 'react-icons/tb';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSearchParams } from 'react-router-dom';

import axios from 'axios';



function Confirmpassword() {


  // form validation rules 
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is mendatory')
      .min(3, 'Password must be at 3 char long'),
    confirmPwd: Yup.string()
      .required('Password is mendatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),

  })

  const formOptions = { resolver: yupResolver(formSchema) }
  const [searchParams, setSearchParams] = useSearchParams();

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState

  function onSubmit(data) {
    console.log(JSON.stringify(data, null, 4))

    let _data = {
      code : searchParams.get('code'),
      password: data.password,
      passwordConfirmation : data.confirmPwd,
    }
    console.log(_data)
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
      console.log(response);

    })
    .catch((error) => {
      // Handle error.
      console.log("An error occurred:", error.response);
    });

    return false

  }

  return (
<Box m="20px">
<Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                    <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> Change Password </Typography>
                </Box>
            </Box>

            <div className="flex justify-center">
                    <div className="card changep lg:xl:1/2 w-96 rounded-none shadow-xl ">
                        <div className="card-body">
                 
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group col mb-4">
          <label className="label"><span className="label-text">PASSWORD</span></label>
          <input
            name="password"
            placeholder="Enter Password"
            type="password"
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        
        <div className="form-group col mb-4">
          <label><span className="label-text">CONFIRM PASSWORD</span></label>
          <input
            name="confirmPwd"
            placeholder="Confirm Password"
            type="password"
            {...register('confirmPwd')}
            className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
        </div>
        <div  className="form-group col mb-10">
          <button type="submit"  className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><TbExchange style={{marginTop: "3px", marginRight:"5px"}}/>
          Change Password
          </button>
        </div>
      </form>
      </div>
      </div>
    </div>

    </Box>

  )
}
export default Confirmpassword
