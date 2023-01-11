import './App.css';
import Login from './components/admin/Login/Login';
import Home from './components/admin/AdminLanding/home';
import Widthdraw from './components/admin/Widthdraw/Widthdraw';
import Deposit from './components/admin/Deposit/Deposit';
import Transfer from './components/admin/Transfer/Transfer';
import Profile from './components/admin/AdminLanding/home';
import Active from './components/admin/ActiveUsers/ActiveUsers';
import Deactive from './components/admin/Deactive/Deactive'
import Close from './components/admin/Close/Close';
import Verify from './components/admin/Verify/Verify';
import Cards from './components/admin/Card/Cards';
import Sidenavbar from "./components/admin/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes,  Route, Navigate } from "react-router-dom";
import { getToken } from "./helpers/helpers";
import { CssBaseline, ThemeProvider,} from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useState } from "react";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='App'> 
        <Router>
          <Routes>
            
          </Routes>
          <Sidenavbar isSidebar={isSidebar} />
            <main className="content">
                <Routes>
                  <Route path="/admin/signin" element={!getToken() ? <Login /> : <Navigate to="/admin/" /> } />
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
          </Router>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
