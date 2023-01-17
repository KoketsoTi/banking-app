import './UserProfile.css';
import { Box, Typography, Grid, Button } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import { Balances, AccountDetails, GeneraInfo, Loan } from '../../../Models/RenderUserProfile';
import { FaUserEdit, FaRegUserCircle } from 'react-icons/fa'
import { GiReceiveMoney } from 'react-icons/gi';
import { AiOutlineBank } from 'react-icons/ai';

function UserProfile(){  
    return (
        <Box m="20px">
            <ToastContainer />
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                    <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}>Client Profile </Typography>
                </Box>
            </Box>
        
            <Box justifyContent="space-between" alignItems="center">
                {/* GRID */}
                {/* Row 1 */}
                <Grid container spacing={2} >
                   
                    {/* Column 1 */}
                    <Grid item md={3}>

                        {/* For Pictuire Upload */}
                        <Box className="card bg-base-100 shadow-xl" style={{backgroundColor: "#141b2d", color:"#F9F9F9" }}>
                            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                            <Box className="card-body text-center " >
                                <Typography variant='h4'>Excellent Mashengete</Typography>
                                <Typography >If a dog chews shoes whose shoes does he choose?</Typography>
                                <Box class="card-actions justify-center text-center ">
                                    <Button style={{background: "#F9F9F9", color:"#141b2d", borderColor: "#141b2d"}} ><FaUserEdit style={{ marginRight:"5px", fontSize:"20px"}}/>Edit Profile</Button>
                                </Box>   
                            </Box>

                        </Box>
                    </Grid>
                    
                    {/* Column 2 */}
                    <Grid item  md={4.5}>
                        {/* your Total  Balance */}
                        <Box style={{backgroundColor: "#141b2d"}}  alignItems="center" justifyContent="center">
                            <Balances
                                title= "Your Total Balance"
                                subtitle="Balance"
                                balance="2000" />
                        </Box>
                         
                        {/* Bank Account Details */}
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
                    
                
                    {/* Column 3 */}
                    <Grid item md={4.5}>
                        {/* your Total Savings Balance */}
                        <Box style={{backgroundColor: "#141b2d"}} >
                            <Balances
                                title= "Your Total Savings Balance"
                                subtitle="Savings Balance"
                                balance="2000"
                               /> 
                        </Box>

                        {/* your Account Details */}
                        <Box style={{backgroundColor: "#141b2d"}} alignItems="center" justifyContent="center">
                            <AccountDetails
                                subtitle="Account Details"
                                accnumber="1455535789"
                                acctype="Savings"
                                accstatus = "Active"
                                virtualcard="inactive"
                                icon={ <AiOutlineBank style={{ color: "#4cceac",  fontSize: "20px" }} /> } />
                        </Box>

                        {/* your Loan Details */}
                        <Box style={{backgroundColor: "#141b2d"}} alignItems="center" justifyContent="center">
                            <Loan
                                subtitle="Loan Details"
                                shortloan = "Short-Term Loan"
                                amount="80 000"
                                shortstatus="Active"
                                term="60"
                                rate="11%"
                                icon={ <GiReceiveMoney style={{ color: "#4cceac",  fontSize: "20px" }} /> } />
                        </Box>

                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default UserProfile;