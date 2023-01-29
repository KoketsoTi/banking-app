
import { Box, Typography} from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Tab from "../Navigations/billsNav";
import LoadingSpinner from "../../../Components/Loader/LoaderSpinner";

function PayBills(){
    const [loading, setLoading] = useState(false);
    return (
        <Box className="Box" >
            {loading ? <LoadingSpinner /> :
                (
                    <>
                        {/* HEADER */}
                        <Box display="flex" mt="20px" justifyContent="space-between" alignItems="center">
                            <Box className="heading">
                                <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >Pay Bills</Typography>
                            </Box>
                        </Box>

                        {/* CONTENT */}
                        <Box className="card-request mt-10 lg:xl:mt-10">
                            <Tab />
                            <Outlet />
                        </Box>
                    </>
                )
            }
        </Box>
    );
}

export default PayBills;