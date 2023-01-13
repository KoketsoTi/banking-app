import React ,{useState}from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../AuthProvider/AuthContext";
import { Box, Typography, IconButton } from "@mui/material";
import { useEffect } from "react";
import { getToken } from "../../../helpers/helpers";
import { BEARER, API } from "../../../Environment/constant"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import axios from "axios";

const AppHeader = () => {
    const [userData, setUserData] = useState();

    const authToken = getToken();

    useEffect(() => {
        if (authToken) {
            axios.get(`${API}users/me`, {
                headers: { 
                    Authorization: `${BEARER} ${authToken}`
                }
            }).then((response) => { 
               
                setUserData(response.data.username)
            }).catch(error => {  
                console.log('An error occurred:', error);
            });
        }
    }, []);

  return (
    <Box style={{background: "#141b2d"}}>
        {/* HEADER */}
        <Box display="flex" justifyContent="space-around" alignItems="center">

        </Box>
            
        {/* ICONS */}
        <Box justifyItems={"end"} >
            <Typography variant="h5" style={{color: "#F9F9F9" }} ></Typography>
            <IconButton style={{color: "#F9F9F9" }}>
            {userData}
            </IconButton>
    
        </Box>    
    </Box>
  );
};

export default AppHeader;