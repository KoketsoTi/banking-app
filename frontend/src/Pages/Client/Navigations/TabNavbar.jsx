import { Box, Typography} from "@mui/material";
import { NavLink } from "react-router-dom";

function Tab() {
    const Item = ({ title, to }) => {
        let activeClassName = "navlink";
      
        return (
            <NavLink className={({ isActive }) => isActive ? activeClassName : 'undefined' } to={to} >
                <Typography >{title}</Typography>
            </NavLink>
        );
    };
      
    return(
        <Box>
            <div className="navbar">
                <div className="flex-1">
                    <ul className="menu menu-horizontal ">
                        <li>
                            <Item
                                title="All"
                                to="/client/viewAccount/all"
                            />
                        </li>

                        <li>
                            <Item
                                title="Money In"
                                to="/client/viewAccount/in"
                            />
                        </li>

                        <li>
                            <Item
                                title="Money Out"
                                to="/client/viewAccount/out"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </Box>
    );
}

export default Tab;