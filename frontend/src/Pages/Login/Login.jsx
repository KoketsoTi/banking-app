import './Login.css';
import React, { useState, useContext } from 'react';
import { Box } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import { FaSignInAlt} from 'react-icons/fa';
import { Success, Warning } from '../../Helpers/toasters';
import { setToken } from "../../Helpers/helpers";
import { UserContext } from "../../Authorization/userContext";
import { useNavigate } from 'react-router-dom';
import ForgotPassword from '../../Models/forgotPasswordModel';
import AuthorService from '../../Service/auth.service';

function Login() {
    const [formData, setFormData] = useState({ identifier: "", password: "" }); 
    const [errors, setErrors] = useState({}); 
    const {user, setUser } = useContext(UserContext);
  
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }

    function applicationForm(){
        navigate("/application", { replace: true });
    }
   
    function handleSubmit(event) {
        event.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors); 
        if (Object.keys(newErrors).length === 0) {
          // form is valid, send data to server
        }

        //Post data in the backend
        AuthorService.login(formData.identifier, formData.password).then((response) => { 
            // set the token
            if (response.data.user.usertype === 'Admin') {
                setToken(response.data.jwt);
                console.log(response.data.user.usertype);
               
                //Store data in a state using context
                setUser(response.data.user);
                Success(`Welcome back ${response.data.user.username}!`)

                //redirect to correct page
                window.location.href = "/admin/";  
            } else if(response.data.user.usertype === 'Client'){
                setToken(response.data.jwt);
                console.log(response.data.user.usertype);
               
                //Store data in a state using context
                setUser(response.data.user);
                Success(`Welcome back ${response.data.user.username}!`)
                
                //redirect to correct page
                window.location.href = "/client/";  
            }
           
        })
        .catch((error) => {  
            if(error.response.data.error.message === 'Your account email is not confirmed') {
                // console.log('An error occurred:', error.response.data.error.message);
                Warning('Your account email is not confirmed')
            }else{
                console.log('An error occurred:', error.response);
                Warning('Incorrect Username/Email or password entered')
            } 
        })
    }

    //Validate Form
    function validateForm(formData) {
        const errors = {};
        if (!formData.identifier) {
          errors.identifier = "Username or Email is required";
        } 
        if (!formData.password) {
          errors.password = "Password is required";
        }
        return errors;
    }

    return (
        <Box className='login' >
            <ToastContainer />
            <div className="card cards lg:xl:mt-10 mt-16 lg:xl:w-2/5 w-96 rounded-none shadow-xl ">
                <div className="card-body">
                    <div className="body-header mb-4">
                        <div className="text-dark text-left mt-2 text-xl">BANK</div>
                    </div>
                    
                    <div className="body-header -mb-4">
                        <div className="text-dark mt-2 text-left text-lg">Sign in to your account</div>
                    </div>

                    <div className="hozitontal-line -mb-4">
                        <div className="divider"></div> 
                    </div>
                 
                    <form >
                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">USERNAME OR EMAIL</span>  </label>
                            <input type="text" name="identifier"  placeholder="Username or Email" value={formData.identifier} onChange={handleChange}
                                className="input input-bordered w-full max-w-s email "/>
                               {errors.identifier && <span className='errors text-left'>{errors.identifier}</span>}
                        </div>

                        <div className="form-group col mb-8">
                            <label className="label"><span className="label-text">PASSWORD</span></label>
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                                className="input input-bordered w-full max-w-s email "/>
                           {errors.password && <span className='errors justify-start'>{errors.password}</span>}
                        </div>
                                
                        <div className="form-group col text-left mb-4">
                            <button onClick={handleSubmit} className="rounded-none relative  w-full lg:xl:w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><FaSignInAlt style={{marginTop: "3px", marginRight:"5px"}}/>Login </button>
                        </div>
                    </form>
                    <div className="form-group col text-left">
                        <label htmlFor="my-modal-4" className="forgot" >Forgot Password?</label>
                        <ForgotPassword />
                    </div>

                    <div className="form-group text-left col">
                        <div>Don't have an account? click  <label htmlFor="my-modal-4" onClick={applicationForm} className="apply" >here </label>to Apply</div>
                    </div>
                </div>
            </div>      
        </Box>
    );
}

export default Login;