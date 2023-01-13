import './ChangePassword.css'
import { useState } from 'react';
import { TbExchange } from 'react-icons/tb';
import { Box, Typography } from "@mui/material";
import Container from 'react-bootstrap/Container';

function ChangePassword(){
    const [formData, setFormData] = useState({ identifier: "", password: "" }); 
    const [errors, setErrors] = useState({});

    return(
        <Box m="20px">
             {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                    <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> CHANGE PASSWORD </Typography>
                </Box>
            </Box>
            <div className="container ">
                <div className="flex justify-center">
                    <div className="card changep lg:xl:1/2 w-96 rounded-none shadow-xl ">
                        <div className="card-body">
                 
                            <form >
                                <div className="form-group col mb-4">
                                    <label className="label"><span className="label-text">OLD PASSWORD</span></label>
                                    <input type="password" name="newpassword" placeholder="Enter old Password" 
                                        className="input input-bordered w-full max-w-s email "/>
                                </div>


                                <div className="form-group col mb-4">
                                    <label className="label"><span className="label-text">NEW PASSWORD</span></label>
                                    <input type="password" name="newpassword" placeholder="New Password" 
                                        className="input input-bordered w-full max-w-s email "/>
                                </div>

                                <div className="form-group col mb-10">
                                    <label className="label"><span className="label-text">CONFIRM PASSWORD</span></label>
                                    <input type="password" name="confirmpassword" placeholder="Confirm new Password" 
                                        className="input input-bordered w-full max-w-s email "/>
                                </div>

                                <div className="form-group col mb-10">
                                    <button  className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><TbExchange style={{marginTop: "3px", marginRight:"5px"}}/>Change Password </button>
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