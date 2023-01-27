import { Box, Typography} from "@mui/material";
import { useState } from "react";
import {BillsData} from '../../../Data/billsData';


function Bills(){


    const [inputValue,setInputValue]= useState("");
    const [amount,setAmount]=useState("");
    const [debit,setDebit]=useState("");
    const [accountype,setAccountType]= useState("");

    const handleCancel = () => {
        setInputValue("");
        setAmount("");
        setDebit("");
        setAccountType("");
    };


    const handleSave=(event) =>{
        console.log(inputValue,amount,debit, event);
        
    }
    
    

    return (
        <Box>
            <div className=" mt-2 lg:xl:mt-2">          
                {/*  View Bills */}  
                <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  gap-2 lg:xl:gap-4">  
                {BillsData.map((element, id) => 
                     <label htmlFor="my-modal-4" >
                        <div className="card h-28 bg-base-100 shadow-xl cursor-pointer" key={id}>
                            <div className="card-body">
                                <div className="text-center">{element}</div>
                            </div>
                        </div>
                    </label>
              
                    )}
                </div>
            </div> 

      {/* paybill modal */}
        <div className='models'>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">

                    <h3 className="text-lg text-center font-bold">Get bill</h3>

                    <div className="form-group col mb-8">
                 
                        <label className="label"><span className="label-text">Please enter your Pay@  reference number</span></label>
                        <input  type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Reference number" className="input input-bordered w-full max-w-s email " />
{/* 

                        <label className="label"><span className="label-text">Account type</span></label>
                        <input  type="text" value={accountype} onChange={(e) => setAccountType(e.target.value)} placeholder="Account type" className="input input-bordered w-full max-w-s email " /> */}
                       <label className="label"><span className="label-text">Account type</span></label>
                    <select aacounttype='accountype' placeholder="Account type" className="input input-bordered w-full max-w-s email">
                    <option disabled value="acc">Please select account type..</option>
                     <option value="savings">Savings Account</option>
                        <option value="easy">Easy Account</option>
                
                        </select>
                     

                        <label className="label"><span className="label-text">Please enter the amount</span></label>
                        <input  type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="input input-bordered w-full max-w-s email " />

                        <label className="label"><span className="label-text">Debit</span></label>
                        <input  type="text" value={debit} onChange={(e) => setDebit(e.target.value)} placeholder="Debit" className="input input-bordered w-full max-w-s email " />

                    </div>

                    <div className=" grid grid-cols-2 gap-8 mb-4">

                    <button  type=" sumbit" onClick={handleCancel}className="btn btn-link text-white bg-indigo-600 hover:bg-indigo-700">Cancel</button>
                    <button type=" sumbit" onClick={handleSave} className="btn btn-link text-white bg-indigo-600 hover:bg-indigo-700">Confirm</button>
                    </div>
                </label>
            </label>
        </div> 
        </Box>
        
    );
                }

export default Bills;