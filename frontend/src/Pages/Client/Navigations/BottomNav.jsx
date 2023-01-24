import { NavLink } from "react-router-dom";
import { Box, Typography} from "@mui/material";
import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';
import { BsCreditCard } from 'react-icons/bs';

const Item = ({ title, to, icon }) => {
    let activeClassName = "navlink";
  
    return (
        <NavLink className={({ isActive }) => isActive ? activeClassName : 'undefined' } to={to} >
            <Typography >{icon} </Typography>
            <Typography >{title}</Typography>
        </NavLink>
    );
};

function Bottom(){
    return(
        <Box>  
            {/* Dashboard and user Accounts*/}
            <li>
                <Item
                    title="Dashboard"
                    to="/client/home"
                    icon={<AiOutlineHome style={{fontSize: "25px",  color:"#009DE0"}} />}
                />
            </li>

            {/* Card Request */}
            <li>
                <Item
                    title="Card"
                    to="/client/cardRequest"
                    icon={<BsCreditCard style={{fontSize: "25px",  color:"#009DE0"}} />}
                />
            </li>

            {/* Push Notifications */}
            <li >
                <Item
                    title="Messages"
                    to="/client/messages"
                   icon={<AiOutlineMessage style={{fontSize: "25px",  color:"#009DE0"}} />}
                />
            </li>
        </Box>
    )
}

export default Bottom
