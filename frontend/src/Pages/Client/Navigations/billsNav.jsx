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
                                title="Bills"
                                to="/client/paybills/bills"
                            />
                        </li>

                        <li>
                            <Item
                                title="History"
                                to="/client/paybills/history"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </Box>
    );
}
export default Tab;