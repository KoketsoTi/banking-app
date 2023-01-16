import './UserProfile.css';
import { Box, Typography, Grid } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { BsCurrencyDollar } from 'react-icons/bs';

function UserProfile(){  
    const pic = "https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png";
    
    //Your account balance
    const StatBox = ({ title, subtitle, icon, increase  }) => {
        return (
            <Box width="100%" p="20px 30px">
                <Box display="flex" justifyContent="space-between" mt="2px" style={{ marginBottom: "10px" }} >
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {subtitle} </Typography>
                  
                </Box>
     
                <Box display="flex" className="mt-6"  >
                    <Typography variant="h5" > {icon} </Typography>
                    <Typography variant="h5" style={{ color: "#4cceac",  fontSize: "40px", }} > {increase} </Typography>
                </Box>

                <Box className="mt-2">
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {title} </Typography>
                </Box>
            </Box>
        );
    };

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
                {/* GRID & CHARTS */}
                <Grid container spacing={2} >
                    {/* For Pictuire Upload */}
                    <Grid item md={4}>
                        <Box className="card-body picture rounded-md flex justify-center">
                            <Box className="flex card-profile-image justify-center">
                                <img className="img w-36" src={pic} alt="" />   
                            </Box>
                
                            <Box className="body text-center">
                                <Typography variant='h5' className="body-name" ></Typography>
                                <Typography variant='h5' className="body-name" ></Typography>
                            </Box>  
                        </Box>
                    </Grid>

                    {/* your Total  Balance */}
                    <Grid item xs={2} md={4}>
                        <Box style={{backgroundColor: "#141b2d"}}  alignItems="center" justifyContent="center">
                            <StatBox
                                title= "Your Total Balalnce"
                                subtitle="Balance"
                                increase="2000"
                                icon={ <BsCurrencyDollar style={{ color: "#4cceac",  fontSize: "40px", marginTop: "6px", marginLeft: "-10px " }} /> }  />
                        </Box>

                        <Box style={{backgroundColor: "#141b2d"}} >

                        </Box>
                    </Grid>
                    
                   {/* your Total Savings Balance */}
                    <Grid item xs={2} md={4}>
                        <Box style={{backgroundColor: "#141b2d"}} >
                            <StatBox
                                title= "Your Total Savings Balance"
                                subtitle="Savings Balance"
                                increase="2000"
                                icon={ <BsCurrencyDollar style={{ color: "#4cceac",  fontSize: "40px", marginTop: "6px", marginLeft: "-10px " }} /> }  />  
                        </Box>

                        <Box style={{backgroundColor: "#141b2d"}} >
                            <Box>

                            </Box>  
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default UserProfile;
