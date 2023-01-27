import { Box, Typography } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import { useState, useRef } from 'react';

import { ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

import { HiOutlineDocument } from 'react-icons/hi';
import { AiOutlineRollback } from 'react-icons/ai';
import { Success, Warning } from '../../../Helpers/toasters';
import Calculations from '../../../Components/CalculateLoans';
import "./Loan.css";
import { GiReceiveMoney } from "react-icons/gi";



// import Newloan from '../../../Service/clients.service';

function LoanApplication() {

  // // form validation rules 
  // const formSchema = Yup.object().shape({

  //   // title: Yup.string().required('address is mendatory'),

  //   firstname: Yup.string().required('First Name is mendatory'),
  //   lastname: Yup.string().required('Last name is mendatory'),
  //   identity: Yup.string().required('Identity Number is required')
  //     .max(13, 'Identity Number should be at most 13 characters long')
  //     .min(13, 'Identity Number should be at least 13 characters long'),
  //   phone: Yup.string().required('Phone is mendatory'),
  //   address: Yup.string().required('address is mendatory'),
  //   // surbub: Yup.string().required('surbub is mendatory'),
  //   // city: Yup.string().required('city is mendatory'),
  //   // zip: Yup.string().required('zip is mendatory')
  //   //     .min(3, 'zip must be at least 3 char long')
  //   //     .max(4, 'zip must not be longer than 4 characters'),
  //   // desiredAmount: Yup.string().required('Last name is mendatory'),
  //   occupation: Yup.string().required('Last name is mendatory'),
  //   // monthlyIncome: Yup.string().required('Last name is mendatory'),

  // })

  // const [loading, setLoading] = React.useState(true);
  // function handleClick() {
  //   setLoading(false);
  // }
  // const formOptions = { resolver: yupResolver(formSchema) }
  // const { register, handleSubmit, reset, formState } = useForm(formOptions)
  // const [isDisabled, setIsDisabled] = useState(true);
  // const { errors } = formState

  // function onSubmit(data, event) {
  //   event.preventDefault();
  //   console.log(JSON.stringify(data, null, 4))
  //   let userData = {
  //     data: {
  //       // title: data.title,
  //       firstname: data.firstname,
  //       lastname: data.lastname,
  //       identity: data.identity,
  //       phone: data.phone,
  //       address: data.address,
  //       // surbub: data.surbub,
  //       // city: data.city,
  //       // zip: data.zip,
  //       desiredAmount: userValues.amount,
  //       occupation: data.occupation,
  //       monthlyIncome: results.monthlyPayment,

  //     }

  //   }

  //   // Newloan.ApplicationForm(userData).then((response) => {
  //   //     Success("Application was successful");
  //   // })
  //   //     .catch((error) => {
  //   //         console.log('An error occurred:', error.response);
  //   //         Warning('Unable to apply ')
  //   //     });

  //   console.log(userData)
  //   // return false
  // }

  // // state to storage the values given by the user when filling the input fields
  // const [userValues, setUserValues] = useState({
  //   amount: '',
  //   interest: 12,
  //   years: '',
  // });

  // // state to store the results of the calculation
  // const [results, setResults] = useState({
  //   monthlyPayment: '',
  //   totalPayment: '',
  //   totalInterest: '',
  //   isResult: false,
  // });



  // // state to storage error message
  // const [error, setError] = useState('');

  // // event handler to update state when the user enters values
  // const handleInputChange = (event) =>
  //   setUserValues({ ...userValues, [event.target.name]: event.target.value });

  // // Manage validations and error messages
  // const isValid = () => {
  //   const { amount, interest, years } = userValues;
  //   let actualError = '';
  //   // Validate if there are values
  //   if (!amount || !interest || !years) {
  //     actualError = 'All the values are required';
  //   }
  //   // Validade if the values are numbers
  //   if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
  //     actualError = 'All the values must be a valid number';
  //   }
  //   // Validade if the values are positive numbers
  //   if (Number(amount) <= 0 || Number(interest) <= 0 || Number(years) <= 0) {
  //     actualError = 'All the values must be a positive number';
  //   }
  //   if (actualError) {
  //     setError(actualError);
  //     return false;
  //   }
  //   return true;
  // };


  // // Handle the data submited - validate inputs and send it as a parameter to the function that calculates the loan
  // const handleSubmitValues = (e) => {
  //   e.preventDefault();
  //   if (isValid()) {
  //     setError('');
  //     calculateResults(userValues);
  //     // this.setState({condition: false}); // to enable the button
  //     setIsDisabled(false);
  //     console.log(isDisabled, "False disbled");
  //   }
  //   else {
  //     // this.setState({condition: true}); // to disable the button
  //     setIsDisabled(true);
  //     console.log(isDisabled, "True disabled");
  //   }
  // };


  // // Calculation
  // const calculateResults = ({ amount, interest, years }) => {
  //   const userAmount = Number(amount);
  //   const calculatedInterest = Number(interest) / 100 / 12;
  //   const calculatedPayments = Number(years) * 12;
  //   const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  //   const monthly = (userAmount * x * calculatedInterest) / (x - 1);

  //   if (isFinite(monthly)) {
  //     const monthlyPaymentCalculated = monthly.toFixed(2);
  //     const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
  //     const totalInterestCalculated = (monthly * calculatedPayments - userAmount).toFixed(2);

  //     // Set up results to the state to be displayed to the user
  //     setResults({
  //       monthlyPayment: monthlyPaymentCalculated,
  //       totalPayment: totalPaymentCalculated,
  //       totalInterest: totalInterestCalculated,
  //       isResult: true,
  //     });
  //   }
  //   return;

  // };

  // // Clear input fields
  // const clearFields = () => {
  //   setUserValues({
  //     amount: '',
  //     interest: '',
  //     years: '',
  //   });

  //   setResults({
  //     monthlyPayment: '',
  //     totalPayment: '',
  //     totalInterest: '',
  //     isResult: false,
  //   });
  // };

  const [loans, setLoans] = useState([]);
  const [monthlyPayment, setmonthly] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalDue, seTotalDue] = useState(0);

  let seTotal = 0;
  let setInterest = 0;
  let setMonth = 0;

  const [formData, setFormData] = useState({ loanType: "", interest: "", loanAmt: "", numYears: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));

  }

  function onSubmit(event) {
    event.preventDefault();

    seTotal = Calculations.calcShortTerm(formData.loanAmt,loanPer, loanMonths, loanType)
    setInterest = Calculations.interestpaid( formData.loanAmt, seTotal)
    setMonth = Calculations.monthly(seTotal, loanMonths)

    // seTotal = Calculations.calcShortTerm(formData.loanAmt,loanPer, loanMonths, loanType)
    // setInterest = Calculations.interestpaid( formData.loanAmt, seTotal)
    // setMonth = Calculations.monthly(seTotal, loanMonths)

    setTotalInterest(setInterest)
    seTotalDue(seTotal)
    setmonthly(setMonth)

    let userData = {
      data: {
        loan_type: loanType,
        amount: formData.loanAmt,
        loan_status: 'Inactive',
        term: loanMonths ,
        interest: loanPer,
        totalInterest: setInterest,
        totalDue: seTotal,
        monthlyPayment: setMonth, 
       
      }
    }

    // Calculations
    // const calculateResults = ({ loanAmt, interest, numYears }) => {
     
        // totalDue = loanAmt * (1+ totalInterest ) * numYears;
        // monthlyPayment = totalDue / 12;


    //   return;
    // }
    

    console.log(userData)
  }

  const [loanType, setLoanTpye] = useState('Long-term');
  const [loanPer, setLoanPer] = useState(0.105);
  const [loanMonths, setLoanMonths] = useState(2);

  const handleChangePer = (e) => {
    setLoanPer(e.target.value);
  }
  const handleChangeMonths = (e) => {
    setLoanMonths(e.target.value);
  }

  const handleChangeLoanTerm = (e) => {
    setLoanTpye(e.target.value);
    switch (e.target.value) {
      case "long-term":
        setLoanPer(10.5);
        setLoanMonths(24);
        break;
      case "short-term":
        setLoanPer(10);
        setLoanMonths(3)
      default:
        break;
    }
  }

  return (
    <Box className="Box">
      <ToastContainer />

      {/* HEADER */}

      <Box className="card-request mt-10 lg:xl:mt-10">
        <div className="card p-4 lg:xl:p-0" >
          <div className="flex justify-between">
            <Box className="text-start mb-5 hed">
              <Typography variant="h5" fontWeight="bold" style={{ color: "#141b2d" }} >Loans</Typography>
            </Box>
            {loans.length != 0 ?
              <label htmlFor="my-modal-4" className="rounded-none bg-white add-savings cursor-pointer relative flex py-4 px-4 border border-transparent text-sm font-medium rounded-md text-black ">
                <GiReceiveMoney style={{ color: "#009DE0", marginTop: "1px" }} className="mr-2.5 text-2xl" />
                <h1 className="text-xl" >Apply For loan</h1>
              </label>
              : <></>
            }
          </div>
        </div>

        {/* CONTENTS */}
        {loans.length != 0 ?
          <Box className="card-request lg:xl:mt-5">
            <div className="card p-4 lg:xl:p-0" >
              <div className="grid grid-cols-1 lg:xl:grid-cols-2 gap-2 lg:xl:gap-5 ">
                <div className="card bg-base-100 shadow-xl cursor-pointer" >
                  <div className="card-body" >
                    <div className="flex">
                      <div className="avatar placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-10 lg:xl:w-20">
                          <span className="text-xl lg:xl:text-3xl">
                            E
                          </span>
                        </div>
                      </div>

                      <div className="ml-5 block">
                        <div className="text-sm font-semibold lg:xl:text-lg text-start">6 Months</div>
                        <div className="flex justify-between">
                          <div className="text-sm lg:xl:text-lg">Initial Amount</div>
                          <div className="text-sm lg:xl:text-lg ml-16 lg:xl:ml-48">R 2000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
          :
          <Box className="card-request lg:xl:mt-2">
            <div className="card p-4 lg:xl:p-0" >
              <div className="grid grid-cols-1 lg:xl:grid-cols-2 gap-2 lg:xl:gap-5 ">
                <div className="card">
                  <div className="card bg-base-100 rounded-none shadow-xl">
                    <div className="card-body">
                      <div>
                        <Typography variant="h5" fontWeight="bold" style={{ color: "#141b2d" }} >Loan Calculations</Typography>
                      </div>

                      <div>
                        <form>
                          <div className="form-group col">
                            <label className="label"><span className="label-text">Loan Type</span>  </label>
                            <select className="input input-bordered w-full max-w-s email" value={loanType} name="loanType" onChange={handleChangeLoanTerm} >
                              <option value={"Long-term"}>Long-Term Loan</option>
                              <option value={"Short-term"}>Short-Term Loan</option>
                            </select>
                          </div>

                          <div className="form-group col">
                            <label className="label"><span className="label-text">Loan Amount</span>  </label>
                            <input type="text" name="loanAmt" onChange={handleChange}
                              className="input input-bordered w-full max-w-s email " />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="form-group col">
                              <label className="label"><span className="label-text">Number of Years/Months</span></label>
                              {loanType === "Short-term"
                                ?
                                <select className="input input-bordered w-full max-w-s email" name="numYears" onChange={handleChangeMonths}>
                                  <option value={3}>3 Months</option>
                                  <option value={6}>6 Months</option>
                                  <option value={12}>12 Months</option>
                                </select>
                                :
                                <select className="input input-bordered w-full max-w-s email" name="numYears" onChange={handleChangeMonths} >
                                  <option value={24}>24 Months</option>
                                  <option value={36}>36 Months</option>
                                  <option value={48}>48 Months</option>
                                  <option value={60}>60 Months</option>
                                </select>
                              }
                            </div>

                            <div className="form-group col ">
                              <label className="label"><span className="label-text">Interest</span>  </label>
                              {loanType === "Short-term"
                                ?
                                <select className="input input-bordered w-full max-w-s email" name="interest" onChange={handleChangePer}>
                                  <option value={10}>10%</option>
                                  <option value={15}>15%</option>
                                  <option value={20}>20%</option>
                                </select>
                                :
                                <select selected className="input input-bordered w-full max-w-s email" name="interest" onChange={handleChangePer}>
                                  <option value={10.5}>10.5%</option>
                                </select>

                              }
                            </div>
                          </div>

                          <div className="form-group col text-left mt-4">
                            <button onClick={onSubmit} className="rounded-none relative w-full lg:xl:w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 ">Calculate </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-base-100 mt-4 rounded-none shadow-xl">
                    <div className="card-body">
                      <div className="mb-4">
                        <Typography variant="h5" fontWeight="bold" style={{ color: "#141b2d" }} >Calculated Results</Typography>
                      </div>

                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:xl:grid-cols-3  gap-3">
                          <div className="card bg-base-100 shadow-xl" >
                            <div className="card-body items-center" >
                              <div className="results-money text-xl"> {monthlyPayment } </div>
                              <div className="results-body"> Monthly Payment</div>
                            </div>
                          </div>


                          <div className="card bg-base-100 shadow-xl" >
                            <div className="card-body items-center" >
                              <div className="results-body text-xl"> {totalInterest } </div>
                              <div className="results-body">Total Interest (%)</div>
                            </div>
                          </div>

                          <div className="card bg-base-100 shadow-xl" >
                            <div className="card-body items-center" >
                              <div className="results-body text-xl">R {totalDue } </div>
                              <div className="results-body">Total Amount to be paid Pay</div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-100  rounded-none shadow-xl">
                  <div className="card-body">
                    <div className="mb-4">
                      <Typography variant="h5" fontWeight="bold" style={{ color: "#141b2d" }} >Application Form</Typography>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </Box>
        }
      </Box>
    </Box>
  );
}

export default LoanApplication;
