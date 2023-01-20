import Home from './Components/Admin/Dashboard/home';
import Profile from './Components/Admin/Profile/Profile';
import Active from './Components/Admin/Customers/AllUsers';
import Deactive from './Components/Admin/Customers/VerifyNewApplications'
import Verify from './Components/Admin/Card/Verify';
import Cards from './Components/Admin/Card/Cards';
import Innecontent from "./Components/Admin/Innercontent/Innercontent";
import ChangePassword from "./Components/Admin/ChangePassword/Changepassword";
import ShortTerm from './Components/Admin/Loans/Short-term';
import LongTerm from './Components/Admin/Loans/Long-term';
import Login from './Components/Login/Login'
import Confirmpassword from './Components/Confirmpassword/Confirmpassword';
import UserProfile from './Components/Admin/UserProfile/UserProfile';
import ApproveLoan from './Components/Admin/ApproveLoan/Approveloan';
import Applications from './Components/ApplicationsForm/ApplicationsForm';
import ClientHome from "./Components/Client/Home/Home"
import RegisterAdmin from './Components/Admin/RegisterAdmin/RegisterAdmin';
import { Routes,  Route, Navigate } from "react-router-dom";
import { getToken } from "./helpers/helpers";

const Navigation = () => {
    return(   
        <Routes>  
            <Route path="/admin" element={getToken() ? <Innecontent /> : <Navigate replace to="/admin/Login" />} >
                <Route path="/admin" element={<Navigate replace to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="users" element={<Active /> } />
                <Route path="activateUser" element={<Deactive /> } />
                <Route path="verify" element={<Verify /> } />
                <Route path="card" element={<Cards /> } />  
                <Route path="profile" element={<Profile /> } />
                <Route path="userprofile/:id" element={<UserProfile /> } />
                <Route path="changePassword" element={<ChangePassword /> } />
                <Route path="short-term" element={<ShortTerm /> } />
                <Route path="long-term" element={<LongTerm /> } />
                <Route path="addnewadmin" element={<RegisterAdmin />} />
                <Route path="approveLoans/:id" element={<ApproveLoan /> } />
            </Route>
            
            <Route path="/landing" element={<ClientHome /> } />
            <Route path="application" element={<Applications /> } />
            <Route path="Confirmpassword" element={<Confirmpassword /> } />
            <Route path='/' element={<Navigate replace to="/admin/Login" />} />
            <Route path="/admin/Login" element={!getToken() ? <Login /> : <Navigate replace to="/admin/" />} />  
        </Routes> 
    );
}

export default Navigation;