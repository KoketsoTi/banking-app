import { Box, Typography } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { HiOutlineDocument } from 'react-icons/hi';
import { AiOutlineRollback } from 'react-icons/ai';
import { Success, Warning } from '../../../Helpers/toasters';
import { ToastContainer } from 'react-toastify';
import "./Loan.css";

// import Newloan from '../../../Service/clients.service';

function LoanApplication() {

  // form validation rules 
  const formSchema = Yup.object().shape({

    // title: Yup.string().required('address is mendatory'),

    firstname: Yup.string().required('First Name is mendatory'),
    lastname: Yup.string().required('Last name is mendatory'),
    identity: Yup.string().required('Identity Number is required')
      .max(13, 'Identity Number should be at most 13 characters long')
      .min(13, 'Identity Number should be at least 13 characters long'),
    phone: Yup.string().required('Phone is mendatory'),
    address: Yup.string().required('address is mendatory'),
    // surbub: Yup.string().required('surbub is mendatory'),
    // city: Yup.string().required('city is mendatory'),
    // zip: Yup.string().required('zip is mendatory')
    //     .min(3, 'zip must be at least 3 char long')
    //     .max(4, 'zip must not be longer than 4 characters'),
    // desiredAmount: Yup.string().required('Last name is mendatory'),
    occupation: Yup.string().required('Last name is mendatory'),
    // monthlyIncome: Yup.string().required('Last name is mendatory'),

  })

  const [loading, setLoading] = React.useState(true);
  function handleClick() {
    setLoading(false);
  }
  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const [isDisabled, setIsDisabled] = useState(true);
  const { errors } = formState

  function onSubmit(data, event) {
    event.preventDefault();
    console.log(JSON.stringify(data, null, 4))
    let userData = {
      data: {
        // title: data.title,
        firstname: data.firstname,
        lastname: data.lastname,
        identity: data.identity,
        phone: data.phone,
        address: data.address,
        // surbub: data.surbub,
        // city: data.city,
        // zip: data.zip,
        desiredAmount: userValues.amount,
        occupation: data.occupation,
        monthlyIncome: results.monthlyPayment,

      }
  
    }

    // Newloan.ApplicationForm(userData).then((response) => {
    //     Success("Application was successful");
    // })
    //     .catch((error) => {
    //         console.log('An error occurred:', error.response);
    //         Warning('Unable to apply ')
    //     });

    console.log(userData)
    // return false
  }

  // state to storage the values given by the user when filling the input fields
  const [userValues, setUserValues] = useState({
    amount: '',
    interest: 12,
    years: '',
  });

  // state to store the results of the calculation
  const [results, setResults] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
    isResult: false,
  });

  

  // state to storage error message
  const [error, setError] = useState('');

  // event handler to update state when the user enters values
  const handleInputChange = (event) =>
    setUserValues({ ...userValues, [event.target.name]: event.target.value });

  // Manage validations and error messages
  const isValid = () => {
    const { amount, interest, years } = userValues;
    let actualError = '';
    // Validate if there are values
    if (!amount || !interest || !years) {
      actualError = 'All the values are required';
    }
    // Validade if the values are numbers
    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
      actualError = 'All the values must be a valid number';
    }
    // Validade if the values are positive numbers
    if (Number(amount) <= 0 || Number(interest) <= 0 || Number(years) <= 0) {
      actualError = 'All the values must be a positive number';
    }
    if (actualError) {
      setError(actualError);
      return false;
    }
    return true;
  };


  // Handle the data submited - validate inputs and send it as a parameter to the function that calculates the loan
  const handleSubmitValues = (e) => {
    e.preventDefault();
    if (isValid()) {
      setError('');
      calculateResults(userValues);
      // this.setState({condition: false}); // to enable the button
      setIsDisabled(false);
      console.log(isDisabled,"False disbled");
    }
    else {
      // this.setState({condition: true}); // to disable the button
      setIsDisabled(true);
      console.log(isDisabled,"True disabled");
    }
  };
  

  // Calculation
  const calculateResults = ({ amount, interest, years }) => {
    const userAmount = Number(amount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(years) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (monthly * calculatedPayments -userAmount ).toFixed(2);

      // Set up results to the state to be displayed to the user
      setResults({
        monthlyPayment: monthlyPaymentCalculated,
        totalPayment: totalPaymentCalculated,
        totalInterest: totalInterestCalculated,
        isResult: true,
      });
    }
    return;

  };

  // Clear input fields
  const clearFields = () => {
    setUserValues({
      amount: '',
      interest: '',
      years: '',
    });

    setResults({
      monthlyPayment: '',
      totalPayment: '',
      totalInterest: '',
      isResult: false,
    });
  };



  return (
    <>
<Box>
    <div className='calculator'>
                  <div className='formcalc'>
                    <h1>Calculate loan</h1><br />
                    {/* Display the error when it exists */}
                    <p className='error'>{error}</p>
                    <form onSubmit={handleSubmitValues}>
                      {/* ternary operator manages when the calculator and results will be displayed to the user */}
                      {!results.isResult ? (
                        //   Form to collect data from the user
                        <div className=' grid grid-cols-1 lg:xl:grid-cols-2 lg:xl:grid-cols-3 lg:xl:gap-8 mb-2'>
                          <div className=' form-group col mb-2'>
                            <label id='label'>Amount:</label>
                            <input className="input input-bordered w-full max-w-s "
                              type='text'
                              name='amount'
                              placeholder='Loan amount'
                              value={userValues.amount}
                              // onChange method sets the values given by the user as input to the userValues state
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <label id='label'>Interest:</label>
                            <input className="input input-bordered w-full  " disabled
                              type='text'
                              name='interest'
                              placeholder=' 12'
                              value={userValues.interest}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <label id='label'>Years:</label>
                            <input className="input input-bordered w-full max-w-s "
                              type='text'
                              name='years'
                              placeholder='Years to repay'
                              value={userValues.years}
                              onChange={handleInputChange}
                            />
                          </div>
                          <input type='submit' className='b-button' />
                        </div>
                      ) : (
                        //   Form to display the results to the user
                        <div className='form-items'>
                          <h4>
                            Loan amount: R{userValues.amount} <br /> Interest:{' '}
                            {userValues.interest}% <br /> Years to repay: {userValues.years}
                          </h4>
                          <div>
                            <label id='label'>Monthly Payment:</label>
                            <input className="input input-bordered w-full max-w-s " type='text' value={results.monthlyPayment} disabled />
                          </div>
                          <div>
                            <label id='label'>Total Payment: </label>
                            <input type='text' value={results.totalPayment} disabled />
                          </div>
                          <div>
                            <label id='label'>Total Interest:</label>
                            <input type='text' value={results.totalInterest} disabled />
                          </div>
                          {/* Button to clear fields */}
                          <input
                            className='b-button'
                            value='Calculate again'
                            type='button'
                            onClick={clearFields}
                          />
                        </div>
                      )}
                    </form>
                  </div>
                </div>
    </Box>

    <Box className='login' >
      <ToastContainer />
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

                {/* <div className="form-group col mb-2">
                                   <label className="label"><span className="label-text">Title</span></label>
                                   <input type="text" name="firstname" placeholder="First Name" {...register('title')}
                                       className="input input-bordered w-full max-w-s title "/>
                                   <div className="invalid-feedback text-rose-600">{errors.title?.message}</div>
                               </div> */}
                <div className='grid grid-cols-1 lg:xl:grid-cols-2 lg:xl:gap-8 mb-2'>
                  <div className="form-group col mb-2">
                    <label className="label"><span className="label-text">First Name</span></label>
                    <input type="text" name="lastname" placeholder="Last Name" {...register('firstname')}
                      className="input input-bordered w-full max-w-s firstname " />
                    <div className="invalid-feedback text-rose-600">{errors.firstname?.message}</div>
                  </div>

                  <div className="form-group col mb-2">
                    <label className="label"><span className="label-text">Last Name</span></label>
                    <input type="text" name="lastname" placeholder="lastname" {...register('lastname')}
                      className="input input-bordered w-full max-w-s lastname " />
                    <div className="invalid-feedback text-rose-600">{errors.lastname?.message}</div>
                  </div>
                </div>

                <div className="form-group col mb-2">
                  <label className="label"><span className="label-text">Identity</span></label>
                  <input type="text" name="identity" placeholder="identity" {...register('identity')}
                    className="input input-bordered w-full max-w-s identity " />
                  <div className="invalid-feedback text-rose-600">{errors.identity?.message}</div>
                </div>

                <div className="form-group col mb-2">
                  <label className="label"><span className="label-text">Phone</span></label>
                  <input type="text" name="phone" placeholder="phone" {...register('phone')}
                    className="input input-bordered w-full max-w-s phone " />
                  <div className="invalid-feedback text-rose-600">{errors.phone?.message}</div>
                </div>
                <div className="form-group col mb-2">
                  <label className="label"><span className="label-text">Address</span></label>
                  <input type="text" name="address" placeholder="address" {...register('address')}
                    className="input input-bordered w-full max-w-s address " />
                  <div className="invalid-feedback text-rose-600">{errors.address?.message}</div>
                </div>

                {/* <div className='grid grid-cols-1 lg:xl:grid-cols-2 lg:xl:grid-cols-2 lg:xl:gap-8 mb-2'>

                                    <div className="form-group col mb-2">
                                        <label className="label"><span className="label-text">Surbub</span></label>
                                        <input type="text" name="surbub" placeholder="surbub" {...register('surbub')}
                                            className="input input-bordered w-full max-w-s surbub " />
                                        <div className="invalid-feedback text-rose-600">{errors.surbub?.message}</div>
                                    </div>
                                    <div className="form-group col mb-2">
                                        <label className="label"><span className="label-text">City</span></label>
                                        <input type="text" name="city" placeholder="city" {...register('city')}
                                            className="input input-bordered w-full max-w-s city " />
                                        <div className="invalid-feedback text-rose-600">{errors.city?.message}</div>
                                    </div>

                                    <div className="form-group col mb-2">
                                        <label className="label"><span className="label-text">Zip</span></label>
                                        <input type="text" name="zip" placeholder="zip" {...register('zip')}
                                            className="input input-bordered w-full max-w-s zip " />
                                        <div className="invalid-feedback text-rose-600">{errors.zip?.message}</div>
                                    </div>
                                </div> */}


                {/* <div className="form-group col mb-2">
                                        <label className="label"><span className="label-text">Desired Amount</span></label>
                                        <input type="number" name="desiredAmount" placeholder="desiredAmount" {...register('desiredAmount')}
                                            className="input input-bordered w-full max-w-s desiredAmount " />
                                        <div className="invalid-feedback text-rose-600">{errors.desiredAmount?.message}</div>
                                    </div> */}
                <div className="form-group col mb-2">
                  <label className="label"><span className="label-text">Occupation</span></label>
                  <input type="text" name="occupation" placeholder="occupation" {...register('occupation')}
                    className="input input-bordered w-full max-w-s occupation " />
                  <div className="invalid-feedback text-rose-600">{errors.occupation?.message}</div>
                </div>

                {/* <div className="form-group col mb-2">
                                    <label className="label"><span className="label-text">Monthly Income</span></label>
                                    <input type="number" name="monthlyIncome" placeholder="monthlyIncome" {...register('monthlyIncome')}
                                        className="input input-bordered w-full max-w-s monthlyIncome " />
                                    <div className="invalid-feedback text-rose-600">{errors.monthlyIncome?.message}</div>
                                </div> */}

                <div className='grid grid-cols-2 gap-8 '>
                  <div className="form-group col mb-4 hidden lg:contents">
                    <button disabled={isDisabled ? true : false} onClick={handleSubmit(onSubmit)} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><HiOutlineDocument style={{ marginTop: "3px", marginRight: "5px" }} />Submit Application </button>
                  </div>

                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </Box>

    
</>
  );
}

export default LoanApplication;