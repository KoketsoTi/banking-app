import { Box, Typography} from "@mui/material";
import { Outlet } from 'react-router-dom';
import Tab from "../Navigations/TabNavbar";

function ViewAccount(){

    return (
        <Box className="Box" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box className="heading">
                    <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} ></Typography>
                </Box>
            </Box>

            <Box className="card-request mt-10 lg:xl:mt-10">
                <div className="card " >
                    <Box className="text-start mb-5">
                        <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >My Accounts</Typography>
                    </Box>

                    <Box className="mb-5">
                        <div className="card w-full bg-base-100 shadow-xl">
                            <div className="card-body" >
                                <div className="flex justify-between">
                                    <div className="text-sm lg:xl:text-lg">Savings Account</div> 
                                    <div className="text-sm lg:xl:text-lg">Bal R 5000 </div>
                                </div>    
                            </div>
                        </div>
                    </Box>
                    
                    {/*  View all Accounts */} 
                    <Box className="text-start mb-2">
                        <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >Transactions</Typography>
                    </Box>
                    <Tab />
                    <Outlet />
                </div>
            </Box>
        </Box>
    );
}

export default ViewAccount;