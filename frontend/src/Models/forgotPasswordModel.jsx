import { RxReset } from 'react-icons/rx';
import React, { useRef } from 'react';
import axios from 'axios';


//Forgot Password Modal
function ForgotPassword() {

   
    const emailInputRefs = useRef();

    async function forgot_Password(e) {
        e.preventDefault();

    

        const enteredEmail = emailInputRefs.current.value;
        let data = {
            email: enteredEmail,
        };

        console.log( 'my data ',enteredEmail);
      


            axios
                .post(
                    "http://localhost:1337/api/auth/forgot-password",
                    data
                   ,
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