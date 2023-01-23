import React, { useContext } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { UserContext } from '../../../Authorization/userContext';
import "./navbar.css";

const  AppHeader = () => {
    const {user } = useContext(UserContext);
    
    return (
        <Box style={{ background: "#141b2d" }}>
            {/* HEADER */}
            <Box display="flex" justifyContent="space-around"  alignItems="center" ></Box>

            {/* ICONS */}
            <Box justifyItems={"end"}>
                <Typography variant="h5" style={{ color: "#F9F9F9" }}></Typography>
                <IconButton style={{ color: "#F9F9F9" }}>
                {/* {user.firstname}  {user.lastname} */}
              ddsad
                </IconButton>
            </Box>
        </Box>
    );
};

export default AppHeader;
