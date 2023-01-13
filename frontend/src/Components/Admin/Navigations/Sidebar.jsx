import { useState } from "react";
import { Sidebar, SubMenu, ProSidebarProvider, Menu, MenuItem, } from 'react-pro-sidebar';
import { IconButton, Box, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { CgCloseO } from 'react-icons/cg';
import { MdOutlineVerified } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
import { BsCreditCard } from 'react-icons/bs'
import { FaSignOutAlt } from 'react-icons/fa';
import './navbar.css'

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
              
            <Box paddingLeft={isCollapsed ? undefined : "10%"} style={{color: "#F9F9F9",  marginTop: "30px"}}> 
              <Item
                title="Dashboard"
                to="/admin/"
                icon={<AiOutlineHome style={{fontSize: "20px"}} />}
                selected={selected} 
                setSelected={setSelected}
              />

              <Typography  variant="h6" style={{color: "#a3a3a3"}} sx={{ m: "15px 0 5px 20px" }} >
                Customer Data
              </Typography>

                <Item
                  title="Active Account"
                  to="/admin/active"
                  icon={<MdOutlineVerified style={{fontSize: "20px"}} />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Suspended Accounts"
                  to="/admin/deactive"
                  icon={<CgCloseO style={{fontSize: "20px"}} />}
                  selected={selected}
                  setSelected={setSelected}
                />

              <Typography  variant="h6" style={{color: "#a3a3a3"}} sx={{ m: "15px 0 5px 20px" }} >
                Loans
              </Typography>

                <Item
                  title="Short-Term Loans"
                  to="/admin/short-term"
                  icon={<MdOutlineVerified style={{fontSize: "20px"}} />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Long-Term Loans"
                  to="/admin/long-term"
                  icon={<CgCloseO style={{fontSize: "20px"}} />}
                  selected={selected}
                  setSelected={setSelected}
                />

              <Typography  variant="h6" style={{color: "#a3a3a3"}} sx={{ m: "15px 0 5px 20px" }} >
                Visual Cards
              </Typography>              
              
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

              <Typography  variant="h6" style={{color: "#a3a3a3"}} sx={{ m: "15px 0 5px 20px" }} >
                User Settings
              </Typography>  

              <Item
                title="Profile"
                to="/admin/profile"
                icon={<BiUserCircle style={{fontSize: "20px"}} />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Change Password"
                to="/admin/changePassword"
                icon={<AiOutlineSetting style={{fontSize: "20px"}} />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>

            <Box paddingLeft={isCollapsed ? undefined : "10%"} style={{color: "#F9F9F9",  marginTop: "10px"}}>
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