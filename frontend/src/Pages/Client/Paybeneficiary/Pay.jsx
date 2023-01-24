import { Box,Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GrAddCircle } from 'react-icons/gr';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function Pay(){
    const navigate = useNavigate()

    const payUser  = (params) => {
        navigate('/client/paybeneficiary', {state:{params} })
    }

    // form validation rules 
    const formSchema = Yup.object().shape({
        beneficiary: Yup.string().required('Beneficiary Name is mendatory'),
        accNumber: Yup.string().required('Account Number is mendatory'),
    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState;

    function onSubmit(data, event) {
        event.preventDefault();
        let userData = {
            data:{
                beneficiary: data.beneficiary,
                accnumber : data.accNumber,
            }
        }
        return false
    }

    return (
        <Box className="Box">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box className="heading">
                    <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >Pay beneficiary</Typography>
                </Box>
            </Box>
            
            {/* CONTENT */}
            <Box>
                <div className=" mb-5 ">
                    <label htmlFor="my-modal-4"  className="rounded-none cursor-pointer relative flex justify-start py-4 px-4 border border-transparent text-sm font-medium rounded-md text-black ">
                        <GrAddCircle className="mr-2.5 text-4xl" />
                        <h1 className="text-2xl" >Add Beneficiary</h1>
                    </label>
                </div>
                
                {/*  View added beneficiaries */}  
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-2 lg:xl:gap-4">                
                    <div className="card lg:xl:w-96 bg-base-100 shadow-xl cursor-pointer"  onClick={() => payUser()} >
                        <div className="card-body" >
                            <div className="flex ">
                                <div className="avatar placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-16 lg:xl:w-20">
                                        <span className="text-2xl lg:xl:text-3xl">
                                            E
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-5 mt-1">
                                    <div className="text-sm lg:xl:text-lg text-start">Excellent</div>
                                    <div className="text-xs lg:xl:text-base text-start">Last paid: 11/june/2022</div>
                                    <div className="text-xs lg:xl:text-base text-start">R 5000</div>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </Box>

            {/*  Add new beneficiary */}       
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box modal-top" htmlFor="">
                <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute text-black hover:text-white right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Add Beneficiary</h3>
                    <p className="py-4">The beneficiary's details are not verified against the actual accountholder. Ensure you enter the correct details</p>
                
                    <form >
                        <div className="form-group col ">
                            <label className="label"><span className="label-text">Beneficiary Name:</span></label>
                            <input type="text" name="beneficiary" {...register('beneficiary')}
                                className="input input-bordered w-full max-w-s email "/>
                            <div className="invalid-feedback text-start text-rose-600">{errors.beneficiary?.message}</div>
                        </div>

                        <div className="form-group col ">
                            <label className="label"><span className="label-text">Account Number:</span></label>
                            <input type="number" name="accNumber" {...register('accNumber')}
                                className="input input-bordered w-full max-w-s email "/>
                            <div className="invalid-feedback text-start text-rose-600">{errors.accNumber?.message}</div>
                        </div>
                
                        <div className="form-group text-start pay-button col mt-10">
                            <label htmlFor="my-modal-4" onClick={handleSubmit(onSubmit)} className="rounded-none relative w-full lg:xl:w-36 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Add Beneficiary</label>
                        </div>           
                    </form>
                </label>
            </label>
        </Box>
    );
}

export default Pay;