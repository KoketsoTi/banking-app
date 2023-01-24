import { Box, Typography} from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { HiOutlineDocument} from 'react-icons/hi';
import { AiOutlineRollback } from 'react-icons/ai';

function LoanApplication(){


 // form validation rules 
 const formSchema = Yup.object().shape({

    title: Yup.string().required('address is mendatory'),

    firstname: Yup.string().required('First Name is mendatory'),

    lastname: Yup.string().required('Last name is mendatory'),

    identity: Yup.string().required('surbub is mendatory')
    .max(13, 'zip must not be longer than 13 characters'),

})


const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState

    function onSubmit(data, event) {
        event.preventDefault();
        console.log(JSON.stringify(data, null, 4))
        let userData = {
            data:{
                title: data.title,
                firstname: data.firstname,
                lastname : data.lastname,
                identity: data.identity,
                
            }
        }
    }

    return (
        <Box className='login' >
        {/* <ToastContainer /> */}
       <div className="md:container md:mx-auto">
           <div className="flex justify-center">
               <div className="form-group   col mb-4 back lg:hidden" >
                   {/* <Link to={goBack} ><BiArrowBack  className="rounded-none border-none absolute justify-center text-3xl border rounded-md " style={{marginTop: "3px", marginRight:"5px"}} /></Link> */}
               </div>
               
               <div className="card  lg:xl:w-1/2 w-96 rounded-none shadow-xl ">
                   <div className="card-body">
                       
                       <div className="body-header -mb-4">
                           <div className="text-dark mt-2 user-cicle">Application Form</div>
                       </div>

                       <div className="hozitontal-line -mb-4">
                           <div className="divider"></div> 
                       </div>
            
                       <form >
                          
                               <div className="form-group col mb-2">
                                   <label className="label"><span className="label-text">Title</span></label>
                                   <input type="text" name="firstname" placeholder="First Name" {...register('firstname')}
                                       className="input input-bordered w-full max-w-s email "/>
                                   <div className="invalid-feedback text-rose-600">{errors.title?.message}</div>
                               </div>

                               <div className="form-group col">
                                   <label className="label"><span className="label-text">First Name</span></label>
                                   <input type="text" name="lastname" placeholder="Last Name" {...register('lastname')}
                                       className="input input-bordered w-full max-w-s email "/>
                                   <div className="invalid-feedback text-rose-600">{errors.firstname?.message}</div>
                               </div>
                          

                           <div className="form-group col mb-2">
                               <label className="label"><span className="label-text">Last Name</span></label>
                               <input type="text" name="email" placeholder="Email" {...register('email')}
                                       className="input input-bordered w-full max-w-s email "/>
                               <div className="invalid-feedback text-rose-600">{errors.lastname?.message}</div>
                           </div>

                           <div className="form-group col mb-2">
                               <label className="label"><span className="label-text">Identity</span></label>
                               <input type="text" name="email" placeholder="Email" {...register('email')}
                                       className="input input-bordered w-full max-w-s email "/>
                               <div className="invalid-feedback text-rose-600">{errors.lastname?.message}</div>
                           </div>

                           <div className='grid grid-cols-2 gap-8 '>
                               <div className="form-group col mb-4 hidden lg:contents">
                                   <button onClick={handleSubmit(onSubmit)} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><HiOutlineDocument style={{marginTop: "3px", marginRight:"5px"}}/>Submit Application </button>
                               </div>

                               
                           </div>
                        
                       </form>
                   </div>
               </div>
           </div>
       </div>
   </Box>




    );
}

export default LoanApplication;