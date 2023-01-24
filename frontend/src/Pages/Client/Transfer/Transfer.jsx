
import { Box, Typography} from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as Yup from 'yup';

function Transfer(){

    // form validation rules 
    const formSchema = Yup.object().shape({
        amount: Yup.string().required('Amount Name is mendatory'),
        ownref: Yup.string().required('Own Reference is mendatory'),
    })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState;

    function onSubmit(data, event) {
        event.preventDefault();
        let userData = {
            data:{
                beneficiary: data.amount,
                ownref : data.ownref,
            }
        }
        console.log(userData)
        return false
    }

    return (
        <Box className="Box" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                    <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}>Transfer</Typography>
                </Box>
            </Box>
            {/* CONTENT */}
            <Box>
                <div className="card md:w-3/5 lg:xl:w-1/2 w-96 ">
                    <div className="card-body">
                        <div className='grid grid-cols-2 gap-4'>
                            <div><h1 >FROM</h1></div>
                            <div><h1 >TO</h1></div>
                            <div className="card ben-card text-center bg-base-100 shadow-xl">
                                
                                <div className="card-body">
                                    <h1>Savings Account</h1>
                                    <h1>R 5000 Bal</h1>
                                </div>
                            </div>

                            <div className="card ben-card bg-base-100  shadow-xl">
                                <div className="card-body">
                                    <h1>Savings Account</h1>
                                    <h1>R 5000 Bal</h1>
                                </div>
                            </div>
                        </div>

                        <div className="hozitontal-line -mb-4">
                            <div className="divider"></div> 
                        </div>

                        <form >
                            <div className='grid grid-cols-1  md:grid-cols-2 lg:xl:grid-cols-2 gap-4'>
                                <div className="form-group col ">
                                    <label className="label"><span className="label-text">Amount:</span></label>
                                    <input type="number" name="amount" {...register('amount')}
                                        className="input input-bordered w-full max-w-s email "/>
                                    <div className="invalid-feedback text-start text-rose-600">{errors.amount?.message}</div>
                                </div>

                                <div className="form-group col ">
                                    <label className="label"><span className="label-text">Own Ref:</span></label>
                                    <input type="text" name="ownref" {...register('ownref')}
                                        className="input input-bordered w-full max-w-s email "/>
                                    <div className="invalid-feedback text-start text-rose-600">{errors.ownref?.message}</div>
                                </div>
                            </div>
                            <div className="form-group text-start pay-button col mt-10">
                                <button onClick={handleSubmit(onSubmit)} className="rounded-none relative w-full lg:xl:w-28 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Transfer</button>
                            </div>           
                        </form>
                    </div>
                </div>
            </Box>
        </Box>
    );
}

export default Transfer;