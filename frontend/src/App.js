import './App.css';
import Login from './Components/Admin/Login/Login';
import Home from './Components/Admin/AdminLanding/home';
import Widthdraw from './Components/Admin/Widthdraw/Widthdraw';
import Deposit from './Components/Admin/Deposit/Deposit';
import Transfer from './Components/Admin/Transfer/Transfer';
import Profile from './Components/Admin/AdminLanding/home';
import Active from './Components/Admin/ActiveUsers/ActiveUsers';
import Deactive from './Components/Admin/Deactive/Deactive'
import Close from './Components/Admin/Close/Close';
import Verify from './Components/Admin/Verify/Verify';
import Cards from './Components/Admin/Card/Cards';
import Sidenavbar from "./Components/Admin/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes,  Route, Navigate } from "react-router-dom";
import { getToken } from "./helpers/helpers";
import { CssBaseline, ThemeProvider,} from "@mui/material";
import { useMode } from "./theme";

function App() {
  const [theme] = useMode();

  return (

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='App'> 
        <Router>
          <Sidenavbar  />
            <main className="content contents">
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
  
  );
}

export default App;
