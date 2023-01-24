import "./navbar.css";
import { Box, Typography} from "@mui/material";
import { AiOutlineHome, AiOutlineMessage, AiOutlineQrcode } from 'react-icons/ai';
import { HiOutlineUsers} from 'react-icons/hi';
import { GiTakeMyMoney, GiPayMoney } from 'react-icons/gi';
import { BiUserCircle, BiTransfer } from 'react-icons/bi';
import { BsCreditCard } from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';
import { removeToken } from '../../../Helpers/helpers';
import { NavLink } from "react-router-dom";

const Item = ({ title, to, icon }) => {
  let activeClassName = "navlink";

    return (
        <NavLink className={({ isActive }) => isActive ? activeClassName : 'undefined' } to={to} >
            <Typography >{icon} </Typography>
            <Typography >{title}</Typography>
        </NavLink>
    );
};

function Sidebar() {
    let activeClassName = "navlink";
    const logout =() =>{
        removeToken();
        window.location.href = "/auth/login";
    }

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
            <li ></li>
             {/* Transactions */}
            <li>
                <Item
                    title="Pay Beneficiary"
                    to="/client/Pay"
                    icon={<HiOutlineUsers style={{fontSize: "25px",  color:"#009DE0"}} />}
                />
            </li>
            <li ></li>
            <li>
                <Item
                    title="Pay Bills"
                    to="/client/paybills"
                    icon={<GiPayMoney style={{fontSize: "25px",  color:"#009DE0"}} />}
                />
            </li>
            <li ></li>
            <li>
                <Item
                    title="Transfer"
                    to="/client/transfer"
                    icon={<BiTransfer style={{fontSize: "25px", color:"#009DE0"}} />}
                />
            </li>
            <li ></li>
             {/* Card Request */}
            <li>
                <Item
                    title="Card"
                    to="/client/cardRequest"
                    icon={<BsCreditCard style={{fontSize: "25px",  color:"#009DE0"}} />}
                />
            </li>
            <li ></li>
            {/* Loans Application */}
            <li>
                <Item
                    title="Loans"
                    to="/client/loanApplications"
                    icon={<GiTakeMyMoney style={{fontSize: "25px",  color:"#009DE0"}} />}
                />
            </li>
            <li ></li>
            {/* QR Code */}
            <li>
                <Item
                    title="QR Code"
                    to="/client/qrcode"
                   icon={<AiOutlineQrcode style={{fontSize: "25px",  color:"#009DE0"}} />}
                />
            </li>
            <li ></li>
            {/* Push Notifications */}
            <li>
                <Item
                    title="Messages"
                    to="/client/messages"
                   icon={<AiOutlineMessage style={{fontSize: "25px",  color:"#009DE0"}} />}
                />
            </li>

            {/* User Profile*/}
            <div className="dropdown dropdown-top absolute lg:bottom-59 ">
                <div tabIndex={0} className="flex cursor-pointer">
                    <label  className="btn btn-ghost btn-circle avatar">
                        <div className="avatar placeholder">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-11   ">
                                <span className="text-xl">
                                E
                                </span>
                            </div>
                        </div>
                        
                    </label>
                    <div className="mt-4 ml-2">Excellent Mashengete</div>
                </div>
            
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                    
                        <label htmlFor="my-modal-4" className={({ isActive }) => isActive ? activeClassName : 'undefined' } >
                            <Typography ><BiUserCircle style={{fontSize: "20px", color:"#009DE0"}} /> </Typography>
                            <Typography >Profile</Typography>
                        </label>

                        <label onClick={logout} className={({ isActive }) => isActive ? activeClassName : 'undefined' }>
                            <Typography ><FaSignOutAlt style={{fontSize: "20px", color:"#009DE0"}} /> </Typography>
                            <Typography >Logout</Typography>
                        </label>    
                    </li> 
                </ul>
            </div>
        </Box>
    );
}

export default Sidebar;