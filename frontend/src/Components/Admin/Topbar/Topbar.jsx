

import React from "react";
import { CgWebsite } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../AuthProvider/AuthContext";
import { Box, Typography, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const AppHeader = () => {
  const { user } = useAuthContext();
  
  console.log(user)

  const navigate = useNavigate();

  return (
    <Box style={{background: "#141b2d"}}>
        {/* HEADER */}
        <Box display="flex" justifyContent="space-around" alignItems="center">

        </Box>
            
        {/* ICONS */}
        <Box justifyItems={"end"}>
            <Typography variant="h5" style={{color: "#F9F9F9" }} >{user}</Typography>
            <IconButton >
                <NotificationsOutlinedIcon style={{fontSize: "30px", color: "#F9F9F9"}}  />
            </IconButton>
            <IconButton>
                <SettingsOutlinedIcon style={{fontSize: "30px", color: "#F9F9F9"}}  />
            </IconButton>
            <IconButton>
                <PersonOutlinedIcon style={{fontSize: "30px", color: "#F9F9F9"}}  />
            </IconButton>
        </Box>    
    </Box>
  );
};

export default AppHeader;