import Home from './AdminLanding/home';
import Widthdraw from './Widthdraw/Widthdraw';
import Deposit from './Deposit/Deposit';
import Transfer from './Transfer/Transfer';
import Profile from './AdminLanding/home';
import Active from './ActiveUsers/ActiveUsers';
import Deactive from './Deactive/Deactive'
import Close from './Close/Close';
import Verify from './Verify/Verify';
import Cards from './Card/Cards';
import Sidenavbar from "./Sidebar/Sidebar";
import AppHeader from "./Topbar/Topbar";
import { Routes,  Route, Navigate } from "react-router-dom";
import { getToken } from "../../helpers/helpers";
import { CssBaseline, ThemeProvider,} from "@mui/material";
import { useMode } from "../../theme";

function Navigation() {
    const [theme] = useMode();
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className='dash'>
                <Sidenavbar  />
                    <main className="content">
                    <AppHeader />
                    <Routes>
                        <Route path="/admin/" element={getToken() ? <Home /> : <Navigate to="/admin/signin" /> } />
                        <Route path="/admin/widthdraw" element={getToken() ? <Widthdraw /> : <Navigate to="/admin/signin" />} />
                        <Route path="/admin/deposit" element={getToken() ? <Deposit /> : <Navigate to="/admin/signin" />} />
                        <Route path="/admin/transfer" element={getToken() ? <Transfer /> : <Navigate to="/admin/signin" />} />
                        <Route path="/admin/active" element={getToken() ? <Active /> : <Navigate to="/admin/signin" />} />
                        <Route path="/admin/deactive" element={getToken() ? <Deactive /> : <Navigate to="/admin/signin" />} />
                        <Route path="/admin/close" element={getToken() ? <Close /> : <Navigate to="/admin/signin" />} />
                        <Route path="/admin/verify" element={getToken() ? <Verify /> : <Navigate to="/admin/signin" />} />
                        <Route path="/admin/card" element={getToken() ? <Cards /> : <Navigate to="/admin/signin" />} />  
                        <Route path="/admin/profile" element={getToken() ? <Profile /> : <Navigate to="/admin/signin" />} />
                    </Routes> 
                </main>
            </div>
        </ThemeProvider>
    );
}

export default Navigation;