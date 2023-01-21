import React from 'react'
import { Outlet } from 'react-router-dom';
import AppHeader from "../Navigations/Topbar";
import { CssBaseline, ThemeProvider,} from "@mui/material";
import { useMode } from "../../../theme";
import Sidenavbar from "../Navigations/Sidebar";

function Admin() {
    const [theme] = useMode();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className='dash'>
                <Sidenavbar />
                <main className="content">
                    <AppHeader />
                    <Outlet />
                </main>
            </div>
        </ThemeProvider>
    )
}

export default Admin;