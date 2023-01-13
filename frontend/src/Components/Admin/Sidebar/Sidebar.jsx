import { useState } from "react";
import { Sidebar, SubMenu, ProSidebarProvider, Menu, MenuItem, } from 'react-pro-sidebar';
import { IconButton, Box, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from 'react-icons/ai';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { CgCloseO } from 'react-icons/cg';
import { MdOutlineVerified } from 'react-icons/md';
import { RiLuggageDepositLine } from 'react-icons/ri';
import { RxCrossCircled } from 'react-icons/rx';
import { BiTransferAlt, BiUserCircle, BiWalletAlt } from 'react-icons/bi';
import { BsCreditCard } from 'react-icons/bs'
import { FaSignOutAlt } from 'react-icons/fa';
import './sidebar.css'

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem className="v" style={{background: "#141b2d"}} active={selected === title} onClick={() => setSelected(title)}
      icon={icon} routerLink={<Link to={to} />} >
      <Typography >{title}</Typography>
    </MenuItem>
  );
};

const Sidenavbar  = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const navigate = useNavigate();
  
  function logout() {
    localStorage.removeItem('authToken');
    window.location.href = "/admin/Login";
  }

  return (
    <div >
      <ProSidebarProvider >
        <Sidebar defaultCollapsed={isCollapsed} style={{height: "100vh", background: "#141b2d", paddingTop: "20px"}} >
          <Menu iconShape="square" style={{height: "100%", background: "#141b2d", paddingTop: "20px"}}>
            <MenuItem onClick={() => setIsCollapsed(!isCollapsed)} icon={isCollapsed ? <HiOutlineMenuAlt1 style={{color: "#F9F9F9"}} /> : undefined}>

              {!isCollapsed && (
                <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px" >
                  <Typography variant="h3" style={{color: "#F9F9F9"}}>
                    ADMINIS
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <HiOutlineMenuAlt1 style={{color: "#F9F9F9"}} />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
              
            <Box paddingLeft={isCollapsed ? undefined : "10%"} style={{color: "#F9F9F9",  marginTop: "100px"}}> 
              <Item
                title="Dashboard"
                to="/admin/"
                icon={<AiOutlineHome style={{fontSize: "20px"}} />}
                selected={selected} 
                setSelected={setSelected}
              />

              <SubMenu style={{backgroundColor: "#141b2d"}} icon={<BiWalletAlt style={{fontSize: "20px", background: "#141b2d"}} />} label="Wallet">
                <Item 
                  title="Withdrawal"
                  to="/admin/widthdraw"
                  icon={<BiWalletAlt style={{fontSize: "20px"}} />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Deposit"
                  to="/admin/deposit"
                  icon={<RiLuggageDepositLine style={{fontSize: "20px"}} />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>
              

              <Item
                title="Transfer"
                to="/admin/transfer"
                icon={<BiTransferAlt style={{fontSize: "20px"}} />}
                selected={selected}
                setSelected={setSelected}
              />

              <SubMenu style={{backgroundColor: "#141b2d"}} icon={<BiUserCircle style={{fontSize: "20px", backgroundColor: "#141b2d"}} />} label="Customer Accounts">
                <Item
                  title="Active Account"
                  to="/admin/active"
                  icon={<MdOutlineVerified style={{fontSize: "20px"}} />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Deactive Account"
                  to="/admin/deactive"
                  icon={<CgCloseO style={{fontSize: "20px"}} />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Close Account"
                  to="/admin/close"
                  icon={<RxCrossCircled style={{fontSize: "20px"}} />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubMenu>
              
              <Item
                title="Verify Account"
                to="/admin/verify"
                icon={<MdOutlineVerified style={{fontSize: "20px"}} />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Card Requests"
                to="/admin/card"
                icon={<BsCreditCard style={{fontSize: "20px"}} />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>

            <Box paddingLeft={isCollapsed ? undefined : "10%"} style={{color: "#F9F9F9",  marginTop: "100px"}}>
              <MenuItem onClick={logout} className="logut" style={{background: "#141b2d"}} icon={<FaSignOutAlt style={{color: "#F9F9F9", fontSize: "20px"}} /> } >
                <Typography >LogOut</Typography>
              </MenuItem>
            </Box>
          </Menu>
        </Sidebar>
      </ProSidebarProvider>
    </div>
  );
}

export default Sidenavbar;
