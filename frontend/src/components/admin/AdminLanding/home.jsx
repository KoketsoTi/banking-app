import { useState } from "react";
import Sidenavbar from "./Dashboard/Navigation/Sidebar";
import Dashboard from "./Dashboard/Dash/Dash";
import { Box, Typography, CssBaseline, ThemeProvider, AppBar, Toolbar } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme";
import { Sidebar, SubMenu, ProSidebarProvider, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

function Home(){
    const { collapseSidebar } = useProSidebar();

    return (

      <div style={{ display: 'flex', height: '100%' }}>
        <ProSidebarProvider>
 
            <Menu>
                <SubMenu label="Charts">
                <MenuItem> Pie charts </MenuItem>
                <MenuItem> Line charts </MenuItem>
                </SubMenu>
                <MenuItem> Documentation </MenuItem>
                <MenuItem> Calendar </MenuItem>
            </Menu>

        </ProSidebarProvider>
      
      
      </div>
    );
}

export default Home;