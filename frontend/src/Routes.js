import Home from './Components/Admin/AdminLanding/home';
import Widthdraw from './Components/Admin/Widthdraw/Widthdraw';
import Deposit from './Components/Admin/Deposit/Deposit';
import Transfer from './Components/Admin/Transfer/Transfer';
import Profile from './Components/Admin/Profile/Profile';
import Active from './Components/Admin/ActiveUsers/ActiveUsers';
import Deactive from './Components/Admin/Deactive/Deactive'
import Close from './Components/Admin/Close/Close';
import Verify from './Components/Admin/Verify/Verify';
import Cards from './Components/Admin/Card/Cards';
import Innecontent from "./Components/Admin/Innercontent/Innercontent";
import ChangePassword from "./Components/Admin/ChangePassword/Changepassword"
import { Routes,  Route, Navigate } from "react-router-dom";
import { getToken } from "./helpers/helpers";
import Login from './Components/Admin/Login/Login'

const Navigation = () => {
    return(
        <Routes>
            <Route path="/admin" element={getToken() ? <Innecontent /> : <Navigate replace to="/admin/Login" />} >
                <Route path="/admin" element={<Navigate replace to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="widthdraw" element={<Widthdraw />} />
                <Route path="deposit" element={<Deposit /> } />
                <Route path="transfer" element={<Transfer /> } />
                <Route path="active" element={<Active /> } />
                <Route path="deactive" element={<Deactive /> } />
                <Route path="close" element={<Close /> } />
                <Route path="verify" element={<Verify /> } />
                <Route path="card" element={<Cards /> } />  
                <Route path="profile" element={<Profile /> } />
                <Route path="changePassword" element={<ChangePassword /> } />
            </Route>
            <Route path='/' element={<Navigate replace to="/admin/Login" />} />
            <Route path="/admin/Login" element={!getToken() ? <Login /> : <Navigate replace to="/admin/" />} />

        </Routes> 
    );
}

export default Navigation;