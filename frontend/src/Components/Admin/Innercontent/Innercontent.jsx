import React from 'react'
import { Outlet } from 'react-router-dom';
import AppHeader from "../Topbar/Topbar";
import { CssBaseline, ThemeProvider,} from "@mui/material";
import { useMode } from "../../../theme";
import Sidenavbar from "../Sidebar/Sidebar";

function Innecontent() {
    const [theme] = useMode();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className='dash'>
                <Sidenavbar  />
                <main className="content">
                    <AppHeader />
                    <Outlet />
                </main>
            </div>
        </ThemeProvider>
    )
}

export default Innecontent;