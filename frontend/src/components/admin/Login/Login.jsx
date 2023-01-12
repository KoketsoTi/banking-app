import './Login.css';
import React, { useRef } from 'react';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { Success, Warning, Error } from '../../../helpers/toasters';
import { FaSignInAlt } from 'react-icons/fa';
import ForgotPassword from '../../../Models/forgotPasswordModel';
import axios from 'axios';
import { API } from '../../../environment/constant';
import { setToken } from "../../../helpers/helpers";
import { useFormInputValidation } from "react-form-input-validation";




function Login() {
    const forms = useRef();
    const [fields, errors, form] = useFormInputValidation({
        identifier: "",
        password: "",
    }, {
        identifier: "required|email",
        password: "required|min:8"
    });



    // const [identifier, setIdentifier] = useState('');
    // const [password, setPassword] = useState('');

   async function login (e)  {

        e.preventDefault();

        console.log(fields)
 
        const isValid = await form.validate(e)

    console.log(isValid)

        if (isValid) {
         
            await axios.post(`${API}auth/local`, {
                identifier: fields.identifier,
                password: fields.password
            })
                .then(response => {
                    // console.log('User profile', response.data.user);
                    console.log('User token', response.data.jwt);
                    // set the token
                    setToken(response.data.jwt);

                    // set the user
                    // setUser(response.data.user);

                    Success('Successfuly logged in')
                })
                .catch(error => {
                    console.log('An error occurred:', error.response);
                    Warning('Incorrect email or password entered')
                });

        }
    }

    return (
        <Container className='login' >
            <ToastContainer />

            <div className="md:container md:mx-auto">
                <div className="flex justify-center">
                    <div className="card lg:xl:1/2 w-96 rounded-none shadow-xl ">
                        <div className="card-body">
                            <div className="body-header -mb-4">
                                <div className="text-dark mt-2 user-cicle">Admin Login</div>
                            </div>

                            <div className="hozitontal-line -mb-4">
                                <div className="divider"></div>
                            </div>

                            <form noValidate  ref={forms} >
                                <div className="form-group col mb-4">
                                    <label className="label"><span className="label-text">USERNAME OR EMAIL</span></label>
                                    <input
                                     type="email"
                                     name="identifier"
                                      placeholder="Email"
                                     onBlur={form.handleBlurEvent}
                                     required
                                        onChange={form.handleChangeEvent}
                                        value={fields.identifier}
                                        className="input input-bordered w-full max-w-s email "
                                        />

                                    <label className="error">
                                        {errors.identifier
                                            ? errors.identifier
                                            : ""}
                                    </label>
                                    
                                </div>

                                <div className="form-group col mb-4">
                                    <label className="label"><span className="label-text">PASSWORD</span></label>
                                    <input type="password" name="password" placeholder="Password" onBlur={form.handleBlurEvent}
                                        onChange={form.handleChangeEvent}
                                        value={fields.password}
                                        minLength={8}
                                        maxLength={16}
                                    
                                        className="input input-bordered w-full max-w-s email "
                                        required />
                                    <label className="error">
                                        {errors.password
                                            ? errors.password
                                            : ""}
                                    </label>
                                </div>


                                <div className="form-group col mb-4">
                                    <label htmlFor="my-modal-4" className="forgot" >Forgot Password</label>
                                    <ForgotPassword />
                                </div>

                                <div className="form-group col mb-8">
                                    <button onClick={login} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><FaSignInAlt style={{ marginTop: "3px", marginRight: "5px" }} />Login </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Login;