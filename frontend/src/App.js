// import Dashboard from './components/admin/Dashboard/Dash';
import Login from './components/admin/Login/Login';
import './App.css'; 
import Home from './components/admin/AdminLanding/home';
import Profile from './components/admin/AdminLanding/home';
import Clients from './components/admin/Clients/Clients';
import Deposit from './components/admin/Deposit/Deposit';
import Transaction from './components/admin/Transaction/Transaction';

import {BrowserRouter as Router, Routes,  Route, Navigate } from "react-router-dom";
import { getToken } from "./helpers/helpers";
function App() {
  return (
    <div className="App">
      <Home></Home>
      {/* <Router>
        <Routes>
          <Route path="/admin/signin" element={!getToken() ? <Login /> : <Navigate to="/admin/" /> } />
          <Route path="/admin/" element={getToken() ? <Home /> : <Navigate to="/admin/signin" /> } />
          <Route path="/admin/clients" element={getToken() ? <Clients /> : <Navigate to="/admin/signin" />} />
          <Route path="/admin/transact" element={getToken() ? <Transaction /> : <Navigate to="/admin/signin" />} />
          <Route path="/admin/deposit" element={getToken() ? <Deposit /> : <Navigate to="/admin/signin" />} />
          <Route path="/admin/profile" element={getToken() ? <Profile /> : <Navigate to="/admin/signin" />} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
