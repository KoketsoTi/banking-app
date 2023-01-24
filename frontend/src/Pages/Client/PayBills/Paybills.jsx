
import { Box, Typography} from "@mui/material";

function PayBills(){
    return (
        <Box className="Box" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box className="heading">
                    <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >Pay Bills</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default PayBills;