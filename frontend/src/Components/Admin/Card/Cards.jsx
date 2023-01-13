import './Cards.css';
import { Box, Typography} from "@mui/material";
function Cards(){
    return (
        <Box m="20px" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                    <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}>Active Cards</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Cards;