/////////////////////////Admin Imports /////////////////////////////////////////////////
import Admin from "./Components/Admin/Innercontent/Innercontent";
import Home from './Components/Admin/Dashboard/home';
import AllUsers from './Components/Admin/Customers/AllUsers';
import VerifyApplications from './Components/Admin/Customers/VerifyNewApplications';
import UserProfile from './Components/Admin/UserProfile/UserProfile';
import ShortTerm from './Components/Admin/Loans/Short-term';
import LongTerm from './Components/Admin/Loans/Long-term';
import ApproveLoan from './Components/Admin/ApproveLoan/Approveloan';
import Verify from './Components/Admin/Card/Verify';
import Cards from './Components/Admin/Card/Cards';
import Profile from './Components/Admin/Profile/Profile';
import ChangePassword from "./Components/Admin/ChangePassword/Changepassword";
import RegisterAdmin from './Components/Admin/RegisterAdmin/RegisterAdmin';


/////////////////////////Pages that don't require users to be logged in//////////////////
import Login from './Components/Login/Login'
import Confirmpassword from './Components/Confirmpassword/Confirmpassword';
import Applications from './Components/ApplicationsForm/ApplicationsForm';


/////////////////////////Client Imports /////////////////////////////////////////////////
import Client from "./Components/Client/ClientInnerContent/ClientInnerContent";
import ClientHome from "./Components/Client/Home/Home";
import PayBeneficiary from "./Components/Client/Paybeneficiary/Paybeneficiary";
import PayBills from "./Components/Client/PayBills/Paybills";
import Transfer from "./Components/Client/Transfer/Transfer";
import CardRequest from "./Components/Client/Card/CardRequest";
import LoanApplication from "./Components/Client/Loans/Loans";
import QR_Code from "./Components/Client/QR_Code/QR_Code";
import Messages from "./Components/Client/Nortifications/Messages";

import { Routes,  Route, Navigate } from "react-router-dom";
import { getToken } from "./helpers/helpers";

const Navigation = () => {
    return(   
        <Routes>  
            <Route path="/admin" element={getToken() ? <Admin /> : <Navigate replace to="/admin/Login" />} >
                <Route path="/admin" element={<Navigate replace to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="users" element={<AllUsers /> } />
                <Route path="activateUser" element={<VerifyApplications /> } />
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
            
            <Route path="/client" element={ <Client />} >
                <Route path="/client" element={<Navigate replace to="home" />} />
                <Route path="home" element={<ClientHome /> } />
                <Route path="paybeneficiary" element={<PayBeneficiary /> } />
                <Route path="paybills" element={<PayBills /> } />
                <Route path="transfer" element={<Transfer /> } />
                <Route path="cardRequest" element={<CardRequest /> } />
                <Route path="loanApplications" element={<LoanApplication /> } />
                <Route path="qrcode" element={<QR_Code /> } />
                <Route path="messages" element={<Messages /> } />
            </Route>
            
            <Route path="application" element={<Applications /> } />
            <Route path="Confirmpassword" element={<Confirmpassword /> } />
            <Route path='/' element={<Navigate replace to="/admin/Login" />} />
            <Route path="/admin/Login" element={!getToken() ? <Login /> : <Navigate replace to="/admin/" />} />  
        </Routes> 
    );
}

export default Navigation;