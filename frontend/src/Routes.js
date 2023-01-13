import Home from './Components/Admin/Dashboard/home';
import Profile from './Components/Admin/Profile/Profile';
import Active from './Components/Admin/Customers/ActiveUsers';
import Deactive from './Components/Admin/Customers/Suspended'
import Verify from './Components/Admin/Card/Verify';
import Cards from './Components/Admin/Card/Cards';
import Innecontent from "./Components/Admin/Innercontent/Innercontent";
import ChangePassword from "./Components/Admin/ChangePassword/Changepassword";
import ShortTerm from './Components/Admin/Loans/Short-term';
import LongTerm from './Components/Admin/Loans/Long-term';
import { Routes,  Route, Navigate } from "react-router-dom";
import { getToken } from "./helpers/helpers";
import Login from './Components/Login/Login'

const Navigation = () => {
    return(
        <Routes>
            <Route path="/admin" element={getToken() ? <Innecontent /> : <Navigate replace to="/admin/Login" />} >
                <Route path="/admin" element={<Navigate replace to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="active" element={<Active /> } />
                <Route path="deactive" element={<Deactive /> } />
                <Route path="verify" element={<Verify /> } />
                <Route path="card" element={<Cards /> } />  
                <Route path="profile" element={<Profile /> } />
                <Route path="changePassword" element={<ChangePassword /> } />
                <Route path="short-term" element={<ShortTerm /> } />
                <Route path="long-term" element={<LongTerm /> } />
            </Route>
            <Route path='/' element={<Navigate replace to="/admin/Login" />} />
            <Route path="/admin/Login" element={!getToken() ? <Login /> : <Navigate replace to="/admin/" />} />

        </Routes> 
    );
}

export default Navigation;