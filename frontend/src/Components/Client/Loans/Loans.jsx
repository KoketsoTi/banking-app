import { Box, Typography} from "@mui/material";

function LoanApplication(){
    return (
        <Box m="20px" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                    <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}>Loan Application</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default LoanApplication;