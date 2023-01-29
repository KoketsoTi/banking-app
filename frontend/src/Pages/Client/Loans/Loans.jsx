import { Box, Typography } from "@mui/material";
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { HiOutlineDocument } from 'react-icons/hi';
import { Error, Success } from '../../../Helpers/toasters';
import { getToken } from "../../../Helpers/helpers";
import { GiReceiveMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import User from '../../../Service/Client/client.service';
import LoadingSpinner from "../../../Components/Loader/LoaderSpinner";
import Calculations from '../../../Components/CalculateLoans';

function LoanApplication() {
  const general ={
    attributes:{
      birth_date: "2002-01-09",
      city: "Johannesburg",
      country: "South Africa",
      createdAt: "2023-01-25T13:42:36.280Z",
      email: "fridah.dikobe@dadevs.co.za",
      firstname: "Fridah",
      lastname: "Dikobe",
      phone: "079-222-1123",
      street_address:  "14th street",
      surbub: "Randburg",
      zipcode: "0012"
    },
    id: 1
  }

  const [loanType, setLoanTpye] = useState('Long-term');
  const [loanPer, setLoanPer] = useState(0.105);
  const [loanMonths, setLoanMonths] = useState(2);
  const [loans, setLoans] = useState([]);
  const [monthlyPayment, setmonthly] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalDue, seTotalDue] = useState(0);
  const [getId, setId] = useState([]);
  const [useClientData, setClientData] = useState(general);
  const [client, setClient] = useState();
  const [loading, setLoading] = useState(false);
  const auth_token = getToken();
  const setNewID = [];
  const navigate = useNavigate();

  let seTotal = 0;
  let setInterest = 0;
  let setMonth = 0;

  const [formData, setFormData] = useState({ loanType: "", interest: "", loanAmt: "", numYears: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }


  function getUserAccounts(){
    setLoading(true);
    //Fetch client id
    User.getClientUser().then((response) => {
        setId(response.data.client_id.id)
        //fetch client accounts using the id returned by the request above
        User.getBeneficiaries(response.data.client_id.id).then((response) => {
            setClientData(response.data.data);
            setLoans(response.data.data.attributes.loans_ids.data);
            setClient(response.data.data.attributes.loans_ids.data)
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            console.log("unable to get user accounts");
        }).finally(() => {
          setLoading(false);
        });
    })
  }

  useEffect(() => {
      setLoading(true);

      if(auth_token){
          getUserAccounts(); 
      }
  },[])

  function CalCulateLoan(event) {
    setLoading(true);
    event.preventDefault();

    switch (loanType) {
      case "Long-term":
        seTotal = Calculations.calcLongTerm(formData.loanAmt,loanPer, loanMonths);
        setInterest = Calculations.interestpaid( formData.loanAmt, seTotal);
        setMonth = Calculations.monthly(seTotal, loanMonths);
        break;
      case "Short-term":
        seTotal = Calculations.calcShortTerm(formData.loanAmt,loanPer, loanMonths);
        setInterest = Calculations.interestpaid( formData.loanAmt, seTotal);
        setMonth = Calculations.monthly(seTotal, loanMonths);
          break;
      default:
        break;
    }

    setTotalInterest(setInterest)
    seTotalDue(seTotal)
    setmonthly(setMonth)
    setLoading(false);
    return
  }

  function onSubmit(event){
    event.preventDefault();
    setLoading(true);

    let userData = {
      data: {
        loan_type: loanType,
        amount: formData.loanAmt,
        loan_status: 'Pending',
        term: loanMonths ,
        interest: loanPer,
        unpaid_interest: totalInterest.toFixed(2),
        monthly_pay: monthlyPayment.toFixed(2), 
        total_repay: totalDue.toFixed(2),
      }
    }

    client.map((response) => {
      setNewID.push(response.id)
    })
 
    User.applyForLoan(userData).then((response) => {  
      setNewID.push(response.data.data.id);

      let id = {data:{loans_id : setNewID}}
     
      User.updateClientLoanApplicationList(getId, id).then((response) => {
        Success("Application successful")
        setLoading(false);
      })
    }).catch((error) => {
      Error('Unable to apply for a loan')
    }) 
  }


  const handleChangePer = (e) => {
    setLoanPer(e.target.value);
  }
  const handleChangeMonths = (e) => {
    setLoanMonths(e.target.value);
  }

  const handleChangeLoanTerm = (e) => {
    setLoanTpye(e.target.value);
    switch (e.target.value) {
      case "Long-term":
        setLoanPer(10.5);
        setLoanMonths(24);
        break;
      case "Short-term":
        setLoanPer(10);
        setLoanMonths(3);
        break;
      default:
        break;
    }
  }

  const changeLength = () => {
    navigate('/client/loanApplication')
  }

  return (
    <Box className="Box">
      {loading ? <LoadingSpinner /> :
        (
          <>
            <ToastContainer />
            {/* HEADER */}
            <Box className="card-request mt-10 lg:xl:mt-10">
              <div className="card p-4 lg:xl:p-0" >
                <div className="flex justify-between">
                  <Box className="text-start mb-5 hed">
                    <Typography variant="h5" fontWeight="bold" style={{ color: "#141b2d" }} >Loans</Typography>
                  </Box>
                  {loans.length !== 0 ?
                    <button onClick={changeLength} className="rounded-none bg-base-100 shadow-xl add-savings cursor-pointer relative flex py-4 px-4 border border-transparent text-sm font-medium rounded-md text-black ">
                      <GiReceiveMoney style={{ color: "#009DE0", marginTop: "1px" }} className="mr-2.5 text-2xl" />
                      <h1 className="text-xl" >Apply For loan</h1>
                    </button>
                    : <></>
                  }
                </div>
              </div>

              {/* CONTENTS */}
              {loans.length !== 0 ?
                <Box className="card-request lg:xl:mt-5">
                  <div className="card p-4 lg:xl:p-0" >
                    <div className="grid grid-cols-1 lg:xl:grid-cols-2 gap-2 lg:xl:gap-5 ">
                      { loans.map((response) => 
                        <div className="card bg-base-100 shadow-xl" key={response.id} >
                          <div className="card-body" >
                            <div className="flex">
                              <div className="avatar placeholder">
                                <div className="bg-neutral-focus text-neutral-content rounded-full w-14 lg:xl:w-20">
                                  <span className="text-2xl lg:xl:text-3xl">
                                    {useClientData.attributes.firstname.slice(0, 1)?.toUpperCase()}
                                  </span>
                                </div>
                              </div>

                              <div className="ml-5 block">
                                <div className="text-sm font-semibold lg:xl:text-lg text-start">{response.attributes.term} Months</div>
                                
                                <div className="flex justify-between">
                                  <div>
                                    <div className="text-sm lg:xl:text-lg text-start">Status</div>
                                    <div className="text-sm lg:xl:text-lg  text-start">Initial Amount</div>
                                  </div>

                                  <div>
                                    <div className="text-sm justify-end lg:xl:text-lg ml-16 lg:xl:ml-42"> {response.attributes.loan_status}</div>
                                    <div className="text-sm justify-end lg:xl:text-lg ml-16 lg:xl:ml-42">R {response.attributes.amount.toLocaleString()}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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
                                        [loanMonths === "3" 
                                        ?
                                          <select className="input input-bordered w-full max-w-s email" name="interest" onChange={handleChangePer}>
                                            <option value={10}>10%</option>
                                          </select>
                                        :
                                          [loanMonths === "6" 
                                          ?
                                            <select className="input input-bordered w-full max-w-s email" name="interest" onChange={handleChangePer}>
                                              <option value={15}>15%</option>
                                            </select>
                                          :
                                            <select className="input input-bordered w-full max-w-s email" name="interest" onChange={handleChangePer}>
                                              <option value={20}>20%</option>
                                            </select>
                                          ]
                                        ]  
                                      :
                                        <select selected className="input input-bordered w-full max-w-s email" name="interest" onChange={handleChangePer}>
                                          <option value={10.5}>10.5%</option>
                                        </select>
                                    }
                                  </div>
                                </div>
                                <div className="form-group col text-left mt-4">
                                  <button onClick={CalCulateLoan} className="rounded-none relative w-full lg:xl:w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 ">Calculate </button>
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
                                <div className="card card1 bg-base-100 shadow-xl" >
                                  <div className="card-body items-center" >
                                    <div className="results-money text-xl"> {monthlyPayment.toFixed(2) } </div>
                                    <div className="results-body"> Monthly Payment</div>
                                  </div>
                                </div>

                                <div className="card card2 bg-base-100 shadow-xl" >
                                  <div className="card-body items-center" >
                                    <div className="results-body text-xl"> {totalInterest.toFixed(2) } </div>
                                    <div className="results-body">Total Interest (%)</div>
                                  </div>
                                </div>

                                <div className="card card3 bg-base-100 shadow-xl" >
                                  <div className="card-body items-center" >
                                    <div className="results-body text-xl">R {totalDue.toFixed(2) } </div>
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

                          <form >
                            <div className='grid grid-cols-1 lg:xl:grid-cols-2 lg:xl:gap-8 mb-2'>
                              <div className="form-group col mb-2">
                                <label className="label"><span className="label-text">First Name</span></label>
                                <input type="text" name="lastname" disabled placeholder="Last Name" value={useClientData.attributes.firstname}
                                  className="input input-bordered w-full max-w-s firstname " />
                              </div>

                              <div className="form-group col mb-2">
                                <label className="label"><span className="label-text">Last Name</span></label>
                                <input type="text" name="lastname" disabled placeholder="lastname" value={useClientData.attributes.lastname}
                                  className="input input-bordered w-full max-w-s lastname " />
                              </div>
                            </div>

                            <div className="form-group col mb-2">
                              <label className="label"><span className="label-text">Email</span></label>
                              <input type="text" name="phone" disabled placeholder="phone" value={useClientData.attributes.email}
                                className="input input-bordered w-full max-w-s phone " />
                            </div>

                            <div className="grid grid-cols-1 lg:xl:grid-cols-2 gap-3">
                              <div className="form-group col mb-2">
                                <label className="label"><span className="label-text">Identity</span></label>
                                <input type="text" name="identity" disabled placeholder="identity" value={useClientData.attributes.birth_date}
                                  className="input input-bordered w-full max-w-s identity " />
                              </div>

                              <div className="form-group col mb-2">
                                <label className="label"><span className="label-text">Phone</span></label>
                                <input type="text" name="phone" disabled placeholder="phone" value={useClientData.attributes.phone}
                                  className="input input-bordered w-full max-w-s phone " />
                              </div>
                            </div>
                          
                            <div className="form-group col mb-2">
                                <label className="label"><span className="label-text">Address</span></label>
                                <input type="text" name="address" disabled placeholder="address" value={useClientData.attributes.street_address}
                                  className="input input-bordered w-full max-w-s address " />
                              </div> 

                              <div className="form-group col mb-2">
                                <label className="label"><span className="label-text">Surbub</span></label>
                                <input type="text" name="surbub"disabled placeholder="surbub" value={useClientData.attributes.surbub}
                                  className="input input-bordered w-full max-w-s surbub " />
                              </div>
                            <div className='grid grid-cols-1 lg:xl:grid-cols-2 lg:xl:grid-cols-2 lg:xl:gap-3 mt-4'>
                            

                              <div className="form-group col mb-2">
                              <label className="label"><span className="label-text">City</span></label>
                                  <input type="text" name="city" disabled placeholder="city" value={useClientData.attributes.city}
                                  className="input input-bordered w-full max-w-s city " />
                              </div>

                              <div className="form-group col mb-2">
                                <label className="label"><span className="label-text">Zip</span></label>
                                <input type="text" name="zip" disabled placeholder="zip" value={useClientData.attributes.zipcode}
                                  className="input input-bordered w-full max-w-s zip " />
                              </div>
                                      
                                                  
                            </div>

                            <div className="form-group col mb-2">
                              <label className="label"><span className="label-text">Occupation</span></label>
                              <input type="text" name="occupation" disabled placeholder="occupation" value={useClientData.attributes}
                                className="input input-bordered w-full max-w-s occupation " />
                            </div>
                          
                            <div className="form-group col mb-2 mt-7">
                              <button onClick={onSubmit} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"><HiOutlineDocument style={{ marginTop: "3px", marginRight: "5px" }} />Submit Application </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              }
            </Box>
          </>
        )
      }
    </Box>
  );
}

export default LoanApplication;
