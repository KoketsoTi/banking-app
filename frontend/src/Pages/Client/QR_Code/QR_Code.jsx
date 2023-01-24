
import { Box, Typography} from "@mui/material";
function QR_Code(){
    return (
        <Box m="20px" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box className="heading">
                    <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}>QR_Code</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default QR_Code;