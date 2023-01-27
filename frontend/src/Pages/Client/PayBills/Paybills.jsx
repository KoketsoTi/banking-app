import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import Tab from "../Navigations/billsNav";

function PayBills() {
    return (
        <Box className="Box">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box className="heading">
                    <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >Pay Bills</Typography>
                </Box>
            </Box>

            {/* CONTENT */}
            <Box className="card-request mt-10 lg:xl:mt-10">
           
                <Tab />
                <Outlet />

              
            </Box>

            <Box>


          
            </Box>
        </Box>
    );
}

export default PayBills;
