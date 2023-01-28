import { Box } from "@mui/material";
import { HiDatabase } from 'react-icons/hi';
import { useState } from 'react';
import { getToken } from '../Helpers/helpers';
import { Error, Success } from "../Helpers/toasters";
import { ToastContainer } from "react-toastify";
import UserService from "../Service/Client/client.service";

//Your account balance
export const Balances = ({ title, subtitle, balance  }) => {
    return (
        <div className="-mt-3">
            <p>{subtitle} </p>
            <p className="text-xl mt-2">R {balance} </p>
            <p className="-mb-3 mt-3">{title} </p>
        </div>
    );
};


//Your account Details
export const AccountDetails = ({ accnumber, acctype, accstatus, virtualcard, subtitle, icon  }) => {
    return (
        <div className="-mt-3">
            <div className="flex justify-between" >
                <h5 >{subtitle} </h5>
                <h5> {icon} </h5>
            </div>

            <hr className="divider"></hr>
            
            <div className="justify-between -mt-2" >
                <div className="flex justify-between mb-2" >
                    <h5 >Account Number</h5>
                    <h5 >{accnumber} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Account Type</h5>
                    <h5>{acctype} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Account Status</h5>
                    <h5 >{accstatus} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Virtual Card</h5>
                    <h5 >{virtualcard} </h5>
                </div>
            </div>
        </div>
    );
};


//User Information
export const GeneraInfo  = ({ firstname, lastname, email, birth_date, phone, address, surbub, city, zip, country, subtitle, icon  }) => {
    return (
        <div className="-mt-3">
            <div className="flex justify-between" >
                <h5>{subtitle} </h5>
                <h5> {icon} </h5>
            </div>

            <hr className="divider"></hr>
            
            <div className="justify-between -mt-2" >
                <div className="flex justify-between mb-2" >
                    <h5 >First Name</h5>
                    <h5 className="">{firstname} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Last Name</h5>
                    <h5 >{lastname} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Email</h5>
                    <h5 >{email} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Birth Date</h5>
                    <h5 >{birth_date} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Phone</h5>
                    <h5 >{phone} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Address</h5>
                    <h5 >{address} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Surbub</h5>
                    <h5 >{surbub} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >City</h5>
                    <h5 >{city} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5>Zip Code</h5>
                    <h5>{zip} </h5>
                </div>
                <div className="flex justify-between" >
                    <h5>Nationality</h5>
                    <h5>{country} </h5>
                </div>
                
            </div> 
        </div>
    );
};


//Your account Details
export const Loan  = ({ shortloan, shortstatus, amount, term, rate, month, totalInterest, totalDue, subtitle, icon  }) => {
    return (
        <div className="-mt-3">
            <div className="flex justify-between" >
                <h5>{subtitle} </h5>
                <h5> {icon} </h5>
            </div>

            <hr className="divider"></hr>
            
            <div className="justify-between -mt-2" >
                <div className="flex justify-between mb-2" >
                    <h5 >Loan</h5>
                    <h5 >{shortloan} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Amount</h5>
                    <h5 > {amount.toLocaleString()} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Term</h5>
                    <h5 > {term} months </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Rate</h5>
                    <h5 > {rate} p/a </h5>
                </div>
                <div className="flex justify-between mb-2" >
                    <h5 >Total Interest</h5>
                    <h5 >R {totalInterest.toLocaleString()} </h5>
                </div>
                
                <div className="flex justify-between mb-2" >
                    <h5 >Monthly Repayment</h5>
                    <h5 >R {month.toLocaleString()} </h5>
                </div>
                
                <div className="flex justify-between mb-2" >
                    <h5 >Total Repayment</h5>
                    <h5 >R {totalDue.toLocaleString()} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Loan Status</h5>
                    <h5 >{shortstatus} </h5>
                </div>
            </div>
        </div>
    );
};


//Edit profile
export const EditProfile = ({ id, subtitle, firstname, lastname, email, birth_date, phone, address, surbub, city, zip }) => {
    const token = getToken()
    const [formData, setFormData] = useState({phone:phone, address:address, surbub:surbub, city:city, zip:zip})

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }

    const click = () =>{
        let user = {
            data: {
                phone: formData.phone,
                street_address: formData.address,
                surbub: formData.surbub,
                city: formData.city,
                zipcode: formData.zip
            }
        }

        UserService.updateClientBeneficiaryList(id, user).then((response) => {
            Success("Client Details Updated successfully");
        }).catch((error) => {
            Error("Unable to update user information")
        })
    }
  
    return (
        <Box>
            <ToastContainer /> 
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative w-full" htmlFor="">
                    <h3 className="text-lg text-center font-bold">{subtitle}</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">First Name</span></label>
                            <input name="firstname" type="text"  disabled value={firstname} className="input input-bordered w-full max-w-s email " /> 
                            
                        </div>

                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">Last Name</span></label>
                            <input name="lastname" type="text" disabled value={lastname}className="input input-bordered w-full max-w-s email" />
                           
                        </div>
                    </div>
                    

                    <div className="form-group col mb-4">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input name="email" type="email" disabled value={email} className="input input-bordered w-full max-w-s email" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">Date of Birth</span></label>
                            <input name="birth_date" type="text" disabled value={birth_date} className="input input-bordered w-full max-w-s email" />
                          
                        </div>

                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">Phone</span></label>
                            <input name="phone" type="text" value={formData.phone}  onChange={handleChange} className="input input-bordered w-full max-w-s email" />
                          
                        </div>
                    </div>

                    <div className="form-group col mb-4">
                        <label className="label"><span className="label-text">Address</span></label>
                        <input name="address" type="text" value={formData.address} onChange={handleChange} className="input input-bordered w-full max-w-s email " />
                       
                    </div>


                    <div className="form-group col mb-4">
                        <label className="label"><span className="label-text">Surbub</span></label>
                        <input name="surbub" type="text" value={formData.surbub} onChange={handleChange} className="input input-bordered w-full max-w-s email "  />
                        
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">City</span></label>
                            <input name="city" type="text" value={ formData.city} onChange={handleChange} className="input input-bordered w-full max-w-s email " />
                           
                        </div>

                        <div className="form-group col mb-4">
                            <label className="label"><span className="label-text">Zip</span></label>
                            <input name="zip" maxLength={5} type="number" value={formData.zip} onChange={handleChange} className="input input-bordered w-full max-w-s email " />
                     
                        </div>
                    </div>

                    <div className="form-group col mt-4 mb-2">
                        <button onClick={click} className="rounded-none relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                            <HiDatabase style={{ marginRight: "5px", fontSize: "20px" }}  />Update
                        </button>
                    </div>
                </label>
            </label>
        </Box>
    );
}

