import { Success, Error } from '../helpers/toasters';
import { RxReset } from 'react-icons/rx';
import AuthorService from "../Service/auth.service";
import React, { useRef } from 'react';

//Forgot Password Modal
function ForgotPassword() {
    const emailInputRefs = useRef();

    async function forgot_Password(e) {
        e.preventDefault();

        const enteredEmail = emailInputRefs.current.value;
        let data = {
            email: enteredEmail
        };

        AuthorService.forgotPassword(data).then((response) => {
            Success('Email send successfully ')
        }).catch((error) => {
            console.log("An error occurred:", error.response);
            Error("Unable to send an email")
        })
    };

    return (
        <div className='models'>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg text-center font-bold">Forgot Password</h3>

                    <div className="form-group col mb-4">
                 
                        <label className="label"><span className="label-text">Enter email to reset password</span></label>
                        <input ref={emailInputRefs} type="email" placeholder="Email" className="input input-bordered w-full max-w-s email " />

                    </div>

                    <div className="form-group col mb-8">
                        <button onClick={forgot_Password} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><RxReset style={{ marginTop: "3px", marginRight: "5px" }} />Reset</button>
                    </div>
                </label>
            </label>
        </div>
    );
}
export default ForgotPassword;