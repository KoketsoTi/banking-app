import { Box, Typography, Grid } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import { BsCurrencyDollar } from 'react-icons/bs';
import { AccountDetails, GeneraInfo, Loan } from '../../../Models/RenderLoans';
import { FaUserEdit, FaRegUserCircle } from 'react-icons/fa'
import { MdOutlineVerified } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GiReceiveMoney } from 'react-icons/gi';
import { useState } from "react";

function ApproveLoan(){ 
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
                                firstname="Excellent"
                                lastname="Mashengete"
                                email="mashengete@live.com"
                                age="40"
                                phone="079-551-7898"
                                address="25 Mareka Street"
                                surbub="Auckland Park"
                                city="Johannesburg"
                                zip="0125"
                                icon={ <FaRegUserCircle style={{ color: "#4cceac",  fontSize: "20px" }} /> } />
                        </Box>
                    </Grid>
                    
                    {/* Column 2 */}
                    <Grid item md={4}>
                        {/* your Loan Details */}
                        <Box style={{backgroundColor: "#141b2d"}} alignItems="center" justifyContent="center">
                            <Loan
                                subtitle="Loan Details"
                                shortloan = "Short-Term Loan"
                                amount="15 000"
                                shortstatus="Active"
                                term="12"
                                rate="20%"
                                unpaid_interest="3 000"
                                repayment="18 000"
                                edit={ <FaUserEdit style={{ color: "#4cceac",  fontSize: "20px" }} /> }
                                icon={ <GiReceiveMoney style={{ color: "#4cceac",  fontSize: "20px" }} /> } />
                        </Box>
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
                                accnumber="1455535789"
                                acctype="Savings"
                                accstatus = "Active"
                                virtualcard="inactive"
                                icon={ <BsCurrencyDollar style={{ color: "#4cceac",  fontSize: "20px" }} /> } />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default ApproveLoan;