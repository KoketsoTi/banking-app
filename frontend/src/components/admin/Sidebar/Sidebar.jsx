import { useState } from "react";
import { Sidebar, SubMenu, ProSidebarProvider, Menu, MenuItem, } from 'react-pro-sidebar';
import { IconButton, useTheme, Box, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome, AiFillEdit } from 'react-icons/ai';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { CgCloseO } from 'react-icons/cg';
import { MdOutlineVerified } from 'react-icons/md';
import { RiLuggageDepositLine } from 'react-icons/ri';
import { RxCrossCircled } from 'react-icons/rx';
import { BiTransferAlt, BiUserCircle, BiWalletAlt } from 'react-icons/bi';
import { BsCreditCard } from 'react-icons/bs'
import { FaSignOutAlt } from 'react-icons/fa';
import { tokens } from "../../../theme";
import { removeToken } from "../../../helpers/helpers";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem active={selected === title} onClick={() => setSelected(title)}
      icon={icon} routerLink={<Link to={to} />} >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidenavbar  = () => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    navigate("/admin/signin", { replace: true });
  };

  return (
    <div  >
      <ProSidebarProvider >
        <Sidebar defaultCollapsed={isCollapsed}  >
          <Menu iconShape="square">
            <MenuItem onClick={() => setIsCollapsed(!isCollapsed)} icon={isCollapsed ? <HiOutlineMenuAlt1 style={{color: "#000000"}} /> : undefined}
              >

              {!isCollapsed && (
                <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px" >
                  <Typography variant="h3" style={{color: "#000000"}}>
                    ADMINIS
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <HiOutlineMenuAlt1 />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
              
            <Box paddingLeft={isCollapsed ? undefined : "10%"} style={{color: "#000000"}}> 
              <Item
                title="Dashboard"
                to="/admin/"
                icon={<AiOutlineHome style={{fontSize: "20px"}} />}
                selected={selected}
                setSelected={setSelected}
              />

              <SubMenu  icon={<BiWalletAlt style={{fontSize: "20px"}} />} label="Wallet">
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

              <SubMenu icon={<BiUserCircle style={{fontSize: "20px"}} />} label="Customer Accounts">
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

              <Item
                title="Logout"
                onClick={handleLogout}
                icon={<FaSignOutAlt style={{fontSize: "20px"}} />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </Sidebar>
      </ProSidebarProvider>
    </div>
  );
}

export default Sidenavbar;
