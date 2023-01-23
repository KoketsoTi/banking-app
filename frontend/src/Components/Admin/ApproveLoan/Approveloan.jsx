import { Box, Typography, Grid, SliderValueLabel } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import { BsCurrencyDollar } from 'react-icons/bs';
import { AccountDetails, GeneraInfo, Loan } from '../../../Models/RenderLoans';
import { FaUserEdit, FaRegUserCircle } from 'react-icons/fa'
import { MdOutlineVerified } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GiReceiveMoney } from 'react-icons/gi';
import { useEffect, useState } from "react";
import { getToken } from "../../../helpers/helpers";
import Calculations from '../../../Models/CalculateLoans';
import Loans from "../../../Service/loan.service";
import { useLocation } from "react-router-dom";


function ApproveLoan(){ 
    const {state} = useLocation();
    const [status, setStatus] = useState();

    const [totalAmoutn, setTotalAmt] = useState(0);
    const [interetsUnpaid, setInterest] = useState(0);
    const [monthly, setMonthly] = useState(0);

    // const calculate = async() => {
    //     const value1 = Calculations.calcShortTerm(useData.amount, useData.interest, useData.term);
    //     const value2 = Calculations.interestpaid(useData.amount, value1);
    //     const value3 = Calculations.monthly(value1, useData.term)
    //     setTotalAmt(value1)
    //     setInterest(value2)
    //     setMonthly(value3)
    // }
   
    return (
        <Box m="20px">
            <ToastContainer />
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                    <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}>Approve Loan </Typography>
                </Box>
            </Box>
        
            <Box justifyContent="space-between" alignItems="center">
                {/* GRID */}
                {/* Row 1 */}
                <Grid container spacing={2} >
                    {/* Column 1 */}
                    <Grid item  md={4}>
                        {/* User Details */}
                        <Box style={{backgroundColor: "#141b2d"}} alignItems="center" justifyContent="center">
                            <GeneraInfo
                                subtitle="General Info"
                                firstname={state.params.attributes.firstname}
                                lastname={state.params.attributes.lastname}
                                email={state.params.attributes.email}
                                age={state.params.attributes.age}
                                phone={state.params.attributes.phone}
                                address={state.params.attributes.street_address}
                                surbub={state.params.attributes.surbub}
                                city={state.params.attributes.city}
                                zip={state.params.attributes.zipcode}
                                icon={ <FaRegUserCircle style={{ color: "#4cceac",  fontSize: "20px" }} /> } 
                            />
                        </Box>
                    </Grid>
                    
                    {/* Column 2 */}
                    <Grid item md={4}>
                        {/* your Loan Details */}
                        {state.params.attributes.loans.data.map((results) => 
                            <Box style={{backgroundColor: "#141b2d"}} alignItems="center" justifyContent="center" key={results.id} >
                            <Loan
                                subtitle="Loan Details"
                                shortloan = {results.attributes.loan_type}
                                amount={results.attributes.amount}
                                shortstatus={results.attributes.loan_status}
                                term={results.attributes.term}
                                rate={results.attributes.interest}
                                unpaid_interest={results.attributes.unpaid_interest}
                                repayment={results.attributes.monthly_pay}
                                totaldue={results.attributes.total_repay}
                                edit={ <FaUserEdit style={{ color: "#4cceac",  fontSize: "20px" }} /> }
                                icon={ <GiReceiveMoney style={{ color: "#4cceac",  fontSize: "20px" }} /> } 
                            />
                            </Box>
                        )}
                    </Grid>
                
                    {/* Column 3 */}
                    <Grid item md={4}>
                  
                        <Box  alignItems="center" justifyContent="center">
                            <Box width="100%"   p="0px">
                                <Box display="flex" justifyContent={"end"} style={{ marginBottom: "10px" }} >
                                    <Typography variant="h5" mr="15px" >
                                        <button style={{ color: "#141b2d", background:"#4cceac" }} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white"><MdOutlineVerified  style={{  marginRight: "10px", fontSize: "20px" }} /> Approve </button>
                                    </Typography>

                                    <Typography variant="h5">
                                        <button style={{ color: "#F9F9F9", background:"#FF5823" }} className="rounded-none w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white"><AiOutlineCloseCircle  style={{ fontSize: "20px", marginRight:"10px" }} />Decline </button>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    

                        {/* your Account Details */}
                        <Box style={{backgroundColor: "#141b2d"}} alignItems="center" justifyContent="center">
                            <AccountDetails
                                subtitle="Account Details"
                                accnumber="{useAccount.accountnumber}"
                                acctype="{useAccount.account_type}"
                                accstatus = "{useAccount.account_status}"
                                virtualcard="{useCard.card_status}"
                                icon={ <BsCurrencyDollar style={{ color: "#4cceac",  fontSize: "20px" }} /> } 
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default ApproveLoan;