import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

function Navbar(){

    return(
        <Box>
            <div className="navbar bg-sky-100 ">
                <div className="navbar bg-sky-100">
                    <div className="flex-1">
                        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li><NavLink to="#"> Home </NavLink></li>
                            <li><NavLink to="#"> About </NavLink></li>
                            <li><NavLink to="/auth/login"> Login </NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default Navbar;