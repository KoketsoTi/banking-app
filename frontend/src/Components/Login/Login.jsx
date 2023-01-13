import './Login.css';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { Success, Warning } from '../../helpers/toasters';
import { FaSignInAlt} from 'react-icons/fa';
import { API } from '../../Environment/constant';
import { setToken } from "../../helpers/helpers";
import { useAuthContext } from "../Admin/AuthProvider/AuthContext";
import ForgotPassword from '../../Models/forgotPasswordModel';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({ identifier: "", password: "" }); 
    const [errors, setErrors] = useState({});
    const { setUser } = useAuthContext();   
    
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newErrors = validateForm(formData);

        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
          // form is valid, send data to server
        }

        axios.post(`${ API}auth/local`, {
            identifier: formData.identifier,
            password: formData.password
        })
        .then(response => { 
            // set the token
            setToken(response.data.jwt);
    
            // set the user
            setUser(response.data.user);

            Success(`Welcome back ${response.data.user.username}!`)
            window.location.href = "/admin/";
           
        })
        .catch(error => {  
            console.log('An error occurred:', error.response);
            Warning('Incorrect email or password entered')
        });
    }

    //Validate Form
    function validateForm(formData) {
        const errors = {};
        if (!formData.identifier) {
          errors.identifier = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.identifier)) {
          errors.identifier = "Email address is invalid";
        }
        if (!formData.password) {
          errors.password = "Password is required";
        }
        return errors;
    }

    return (
        <Container className='login' >
            <ToastContainer />
            
            <div className="md:container md:mx-auto">
                <div className="flex justify-center">
                    <div className="card cards lg:xl:1/2 w-96 rounded-none shadow-xl ">
                        <div className="card-body">
                            <div className="body-header -mb-4">
                                <div className="text-dark mt-2 user-cicle">Admin Login</div>
                            </div>

                            <div className="hozitontal-line -mb-4">
                                <div className="divider"></div> 
                            </div>
                 
                            <form >
                                <div className="form-group col mb-4">
                                    <label className="label"><span className="label-text">USERNAME OR EMAIL</span>  </label>
                                    <input type="email" name="identifier"  placeholder="Email" value={formData.identifier} onChange={handleChange}
                                        className="input input-bordered w-full max-w-s email "/>
                                       {errors.identifier && <span>{errors.identifier}</span>}
                                </div>

                                <div className="form-group col mb-4">
                                    <label className="label"><span className="label-text">PASSWORD</span></label>
                                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                                        className="input input-bordered w-full max-w-s email "/>
                                   {errors.password && <span>{errors.password}</span>}
                                </div>

                                <div className="form-group col mb-4">
                                    <label htmlFor="my-modal-4" className="forgot" >Forgot Password</label>
                                    <ForgotPassword />
                                </div>

                                <div className="form-group col mb-8">
                                    <button onClick={handleSubmit} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><FaSignInAlt style={{marginTop: "3px", marginRight:"5px"}}/>Login </button>
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