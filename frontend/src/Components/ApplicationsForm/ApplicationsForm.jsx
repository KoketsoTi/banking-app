import React, { useState } from 'react';
import { Box } from "@mui/material";
import { FaSignInAlt} from 'react-icons/fa';

function Apply() {
    const [formData, setFormData] = useState({
        firstname: "", lastname: "", email: "", usertype: "", age:"", phone:"",  address:"", surbub:"", city:"", zip:""
    }); 

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }

    return (
        <Box className='login' >
            <div className="md:container md:mx-auto">
                <div className="flex justify-center">
                    <div className="card  lg:xl:w-1/2 w-96 rounded-none shadow-xl ">
                        <div className="card-body">
                            <div className="body-header -mb-4">
                                <div className="text-dark mt-2 user-cicle">Application Form</div>
                            </div>

                            <div className="hozitontal-line -mb-4">
                                <div className="divider"></div> 
                            </div>
                 
                            <form >
                                <div className='grid grid-cols-1 lg:xl:grid-cols-2 gap-8'>
                                    <div className="form-group col">
                                        <label className="label"><span className="label-text">First Name</span></label>
                                        <input type="text" name="firstname" placeholder="First Name" onChange={handleChange}
                                            className="input input-bordered w-full max-w-s email "/>
                                    </div>

                                    <div className="form-group col">
                                        <label className="label"><span className="label-text">Last Name</span></label>
                                        <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange}
                                            className="input input-bordered w-full max-w-s email "/>
                                    </div>
                                </div>

                                <div className="form-group col">
                                    <label className="label"><span className="label-text">Email</span></label>
                                    <input type="text" name="email" placeholder="Email" onChange={handleChange}
                                            className="input input-bordered w-full max-w-s email "/>
                                </div>

                                <div className="form-group col">
                                    <label className="label"><span className="label-text">usertype</span></label>
                                    <input type="text" name="usertype" placeholder="Usertype" onChange={handleChange}
                                            className="input input-bordered w-full max-w-s email "/>
                                </div>

                                <div className='grid grid-cols-1 lg:xl:grid-cols-2 gap-8'>
                                    <div className="form-group col">
                                        <label className="label"><span className="label-text">Phone</span></label>
                                        <input type="text" name="phone" placeholder="Phone" onChange={handleChange}
                                            className="input input-bordered w-full max-w-s email "/>
                                    </div>

                                    <div className="form-group col">
                                        <label className="label"><span className="label-text">Age</span></label>
                                        <input type="text" name="age" placeholder="Age" onChange={handleChange}
                                            className="input input-bordered w-full max-w-s email "/>
                                    </div>
                                </div>
                                <div className="form-group col">
                                    <label className="label"><span className="label-text">Address</span></label>
                                    <input type="text" name="address" placeholder="Address" onChange={handleChange}
                                            className="input input-bordered w-full max-w-s email "/>
                                </div>
                                <div className="form-group col">
                                    <label className="label"><span className="label-text">Surbub</span></label>
                                    <input type="text" name="surbub" placeholder="Surbub" onChange={handleChange}
                                            className="input input-bordered w-full max-w-s email "/>
                                </div>
                                <div className='grid grid-cols-1 lg:xl:grid-cols-2 gap-8'>
                                    <div className="form-group col">
                                        <label className="label"><span className="label-text">City</span></label>
                                        <input type="text" name="city" placeholder="City" onChange={handleChange}
                                            className="input input-bordered w-full max-w-s email "/>
                                    </div>

                                    <div className="form-group col">
                                        <label className="label"><span className="label-text">Zip</span></label>
                                        <input type="text" name="zip" placeholder="Zip" onChange={handleChange}
                                            className="input input-bordered w-full max-w-s email "/>
                                    </div>
                                </div>
                                <div className="form-group col mb-8">
                                    <button className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><FaSignInAlt style={{marginTop: "3px", marginRight:"5px"}}/>Login </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
}

export default Apply;