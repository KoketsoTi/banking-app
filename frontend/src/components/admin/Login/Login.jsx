import './Login.css';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { Success, Warning, Error } from '../../../helpers/toasters';
import { FaSignInAlt} from 'react-icons/fa';
import { RxReset} from 'react-icons/rx';
import axios from 'axios';
import { API } from '../../../environment/constant';
import { setToken } from "../../../helpers/helpers";

function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');   
    

    let login = async(e)=>{
        e.preventDefault();
        try {
            await axios.post(`${ API}auth/local`, {
                identifier: identifier,
                password: password
            })
            .then(response => { 
                // console.log('User profile', response.data.user);
                // console.log('User token', response.data.jwt);
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
        } catch (error) {
            console.error(error);
            Error('Something went wrong!')
        } 
    }

    //Forgot Password Modal
    const model  = (
        <div className='models'>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg text-center font-bold">Forgot Password</h3>
                    <div className="form-group col mb-4">
                        <label className="label"><span className="label-text">Enter email to reset password</span></label>
                        <input type="email" placeholder="Email" className="input input-bordered w-full max-w-s email "/>
                    </div>

                    <div className="form-group col mb-8">
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><RxReset style={{marginTop: "3px", marginRight:"5px"}}/>Reset</button>
                    </div>
                </label>
            </label>
        </div>
    );

    //Login Form
    const setForm = (
        <div>
            <form onSubmit={login}>
                <div className="form-group col mb-4">
                    <label className="label"><span className="label-text">USERNAME OR EMAIL</span></label>
                    <input type="email" name="identifier"  placeholder="Email" value= {identifier} onChange={(e)=>{ setIdentifier(e.target.value) }}
                        className="input input-bordered w-full max-w-s email "/>
                </div>

                <div className="form-group col mb-4">
                    <label className="label"><span className="label-text">PASSWORD</span></label>
                    <input type="password" name="password" placeholder="Password" value= {password} onChange={(e)=>{ setPassword(e.target.value)}}
                        className="input input-bordered w-full max-w-s email "/>
                </div>

                <div className="form-group col mb-4">
                    <label htmlFor="my-modal-4" className="forgot" >Forgot Password</label>
                    {model}
                </div>

                <div className="form-group col mb-8">
                    <button type="submit" className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><FaSignInAlt style={{marginTop: "3px", marginRight:"5px"}}/>Login </button>
                </div>
            </form>
        </div>
    );

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
                 
                            {setForm}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Login;