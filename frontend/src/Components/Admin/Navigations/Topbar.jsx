import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { getUser } from "../../../helpers/helpers";
import "./navbar.css";

const  AppHeader = () => {
    const user = getUser();
    console.log(user[1], user[2])
    return (
        <Box style={{ background: "#141b2d" }}>
        {/* HEADER */}
        <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
        ></Box>

        {/* ICONS */}
        <Box justifyItems={"end"}>
            <Typography variant="h5" style={{ color: "#F9F9F9" }}></Typography>
            <IconButton style={{ color: "#F9F9F9" }}>
            {user[1] }  {user[2]}
            </IconButton>
        </Box>
        </Box>
    );
};

export default AppHeader;
