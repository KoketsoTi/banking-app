import React from 'react'
import { useForm } from "react-hook-form";
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
    <div className="container mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            name="confirmPwd"
            type="password"
            {...register('confirmPwd')}
            className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
export default Confirmpassword
