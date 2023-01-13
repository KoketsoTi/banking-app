import './Cards.css';
import { Box, Typography} from "@mui/material";
function Verify(){
    return (
        <Box m="20px" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                    <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> Approve Card Request</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Verify;