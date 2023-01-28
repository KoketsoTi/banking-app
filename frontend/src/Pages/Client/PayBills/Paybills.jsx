
import { Box, Typography} from "@mui/material";
import { useState } from "react";
import LoadingSpinner from "../../../Components/Loader/LoaderSpinner";

function PayBills(){
    const [loading, setLoading] = useState(false);
    return (
        <Box className="Box" >
            {loading ? <LoadingSpinner /> :
                (
                    <>
                        {/* HEADER */}
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box className="heading">
                                <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >Pay Bills</Typography>
                            </Box>
                        </Box>
                    </>
                )
            }
        </Box>
    );
}

export default PayBills;