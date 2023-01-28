
import { Box, Typography} from "@mui/material";
import { useState } from "react";
import LoadingSpinner from "../../../Components/Loader/LoaderSpinner";

function Cards(){
    const [loading, setLoading] = useState(false);
    return (
        <Box m="20px" >
            {loading ? <LoadingSpinner /> :
                (
                    <>
                        {/* HEADER */}
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box mb="30px">
                                <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}>Active Cards</Typography>
                            </Box>
                        </Box>
                    </>
                )
            }
        </Box>
    );
}

export default Cards;