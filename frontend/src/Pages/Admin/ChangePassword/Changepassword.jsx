import './ChangePassword.css'
import { useState } from 'react';
import { TbExchange } from 'react-icons/tb';
import { Box, Typography } from "@mui/material";
import { ToastContainer } from 'react-toastify';

function ChangePassword(){
    const [formData, setFormData] = useState({ oldpassword: "", newpassword: "" , confirmpassword: ""}); 
    const [errors, setErrors] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }

    function validateForm(formData) {
        const errors = {};
        if (!formData.oldpassword) {
          errors.oldpassword = "Old password is required";
        }

        if (!formData.newpassword) {
            errors.newpassword = "New Password is required";
        }else if(formData.oldpassword === formData.newpassword){
            errors.oldpassword = "Old Password match with the new passowrd, Please create new password";
        }

        if (!formData.confirmpassword) {
          errors.confirmpassword = "Confirm Password is required";
        }else if(formData.newpassword !== formData.confirmpassword ){
            errors.confirmpassword = "Password Mismatch";
        }
        return errors;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
          // form is valid, send data to server
        }
    }


    return(
        <Box m="20px">
            <ToastContainer />
             {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                    <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> Change Password </Typography>
                </Box>
            </Box>
            <div className="container ">
                <div className="flex justify-center">
                    <div className="card changep lg:xl:1/2 w-96 rounded-none shadow-xl ">
                        <div className="card-body">
                 
                            <form >
                                <div className="form-group col mb-4">
                                    <label className="label"><span className="label-text">OLD PASSWORD</span></label>
                                    <input type="password" name="oldpassword" placeholder="Enter old Password" value={formData.oldpassword} onChange={handleChange}
                                        className="input input-bordered w-full max-w-s email "/>
                                        {errors.oldpassword && <span className='errors'>{errors.oldpassword}</span>}
                                </div>


                                <div className="form-group col mb-4">
                                    <label className="label"><span className="label-text">NEW PASSWORD</span></label>
                                    <input type="password" name="newpassword" placeholder="New Password" value={formData.newpassword} onChange={handleChange}
                                        className="input input-bordered w-full max-w-s email "/>
                                        {errors.newpassword && <span className='errors'>{errors.newpassword}</span>}
                                </div>

                                <div className="form-group col mb-10">
                                    <label className="label"><span className="label-text">CONFIRM PASSWORD</span></label>
                                    <input type="password" name="confirmpassword" placeholder="Confirm new Password" value={formData.confirmpassword} onChange={handleChange}
                                        className="input input-bordered w-full max-w-s email "/>
                                        {errors.confirmpassword && <span className='errors'>{errors.confirmpassword}</span>}
                                </div>

                                <div className="form-group col mb-10">
                                    <button onClick={handleSubmit}  className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><TbExchange style={{marginTop: "3px", marginRight:"5px"}}/>Change Password </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
}

export default ChangePassword;