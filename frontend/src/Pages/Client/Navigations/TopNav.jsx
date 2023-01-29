import { NavLink } from "react-router-dom";
import { Box, Typography} from "@mui/material";
import { FcMenu } from 'react-icons/fc';

function Top(){
    return(
        <Box>
            <div className="navbar bg-base-100 shadow-xl fixed top-0 z-50  lg:hidden"> 
                <div class="flex-1 ">
                    <div>
                        SKY BANK
                    </div>
                </div>

                <div className="end-part flex-none justify-end">
                    <label for="my-drawer-3" className="btn btn-ghost btn-circle lg:hidden">
                        <FcMenu className="text-2xl" />
                    </label>  
                </div>
            </div>        
        </Box>
    )
}

export default Top
