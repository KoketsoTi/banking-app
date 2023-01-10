import './Login.css';
import React from 'react';
import Container from 'react-bootstrap/Container'
import {FaSignInAlt} from 'react-icons/fa';
import {RxReset} from 'react-icons/rx';
function Login() {

    const model  = (
        <div>
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

    return (
        <Container className='login' >
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
                            <form>
                                <div className="form-group col mb-4">
                                    <label className="label"><span className="label-text">USERNAME OR EMAIL</span></label>
                                    <input type="email"  placeholder="Email"
                                        className="input input-bordered w-full max-w-s email "/>
                                </div>

                                <div className="form-group col mb-4">
                                    <label className="label"><span className="label-text">PASSWORD</span></label>
                                    <input type="email"  placeholder="Email"
                                        className="input input-bordered w-full max-w-s email "/>
                                </div>

                                <div className="form-group col mb-4">
                                    <label htmlFor="my-modal-4" className="forgot" >Forgot Password</label>
                                    {model}
                                </div>

                                <div className="form-group col mb-8">
                                    <button type="submit" className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><FaSignInAlt style={{marginTop: "3px", marginRight:"5px"}}/>Login</button>
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