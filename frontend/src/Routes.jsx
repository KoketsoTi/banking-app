/////////////////////////Admin Imports /////////////////////////////////////////////////
import Admin from "./Pages/Admin/Innercontent/Innercontent";
import Home from './Pages/Admin/Dashboard/home';
import AllUsers from './Pages/Admin/Customers/AllUsers';
import VerifyApplications from './Pages/Admin/Customers/VerifyNewApplications';
import UserProfile from './Pages/Admin/UserProfile/UserProfile';
import ShortTerm from './Pages/Admin/Loans/Short-term';
import LongTerm from './Pages/Admin/Loans/Long-term';
import Verify from './Pages/Admin/Card/Verify';
import Cards from './Pages/Admin/Card/Cards';
import Profile from './Pages/Admin/Profile/Profile';
import ChangePassword from "./Pages/Admin/ChangePassword/Changepassword";
import RegisterAdmin from './Pages/Admin/RegisterAdmin/RegisterAdmin';
import LoanApplications from './Pages/Admin/ApproveLoan/AproveLoanApplication';


/////////////////////////Pages that don't require users to be logged in//////////////////
import Login from './Pages/Login/Login'
import Confirmpassword from './Pages/Confirmpassword/Confirmpassword';
import Applications from './Pages/ApplicationsForm/ApplicationsForm';
import Landing from "./Pages/Landing/Home";
import VerifyAccount from "./Pages/VerifyAccount/VerifyAccount";

/////////////////////////Client Imports /////////////////////////////////////////////////
import Client from "./Pages/Client/ClientInnerContent/ClientInnerContent";
import ClientHome from "./Pages/Client/Home/Home";
import PayBeneficiary from "./Pages/Client/Paybeneficiary/Paybeneficiary";
import Pay from "./Pages/Client/Paybeneficiary/Pay";
import PayBills from "./Pages/Client/PayBills/Paybills";
import Transfer from "./Pages/Client/Transfer/Transfer";
import CardRequest from "./Pages/Client/Card/CardRequest";
import LoanApplication from "./Pages/Client/Loans/Loans";
import ApplyLoan from "./Pages/Client/Loans/applyLoan";
import Messages from "./Pages/Client/Nortifications/Messages";
import ViewAccount from "./Pages/Client/ViewAccount/ViewAccount";
import All from "./Pages/Client/TransactionHistory/All";
import In from "./Pages/Client/TransactionHistory/In";
import Out from "./Pages/Client/TransactionHistory/Out";
import Bills from "./Pages/Client/TransactionHistory/Bills";
import History from "./Pages/Client/TransactionHistory/History";

    
import { Routes,  Route, Navigate } from "react-router-dom";
import { getToken } from "./Helpers/helpers";

const Navigation = () => {
    return(   
        <Routes>  
            <Route path="/" element={<Landing />} />
            <Route path="/admin" element={getToken() ? <Admin /> : <Navigate replace to="/auth/login" />} >
                <Route path="/admin" element={<Navigate replace to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="users" element={<AllUsers /> } />
                <Route path="activateUser" element={<VerifyApplications /> } />
                <Route path="verify" element={<Verify /> } />
                <Route path="card" element={<Cards /> } />  
                <Route path="profile" element={<Profile /> } />
                <Route path="userprofile" element={<UserProfile /> } />
                <Route path="changePassword" element={<ChangePassword /> } />
                <Route path="short-term" element={<ShortTerm /> } />
                <Route path="long-term" element={<LongTerm /> } />
                <Route path="addnewadmin" element={<RegisterAdmin />} />
                <Route path="loan-application" element={<LoanApplications />} />
            
            </Route>
            
            {/* Nested routings */}
            <Route path="/client" element={getToken() ? <Client />  : <Navigate replace to="/auth/login" />} >
                <Route path="/client" element={<Navigate replace to="home" />} />
                <Route path="home" element={<ClientHome /> } />
                <Route path="pay" element={<Pay /> } />
                <Route path="paybeneficiary" element={<PayBeneficiary /> } />
                <Route path="paybills" element={<PayBills /> } >
                    <Route path="/client/paybills" element={<Navigate replace to="bills" />} />
                    <Route path="bills" element={<Bills /> } />
                    <Route path="history" element={<History /> } />
                </Route> 
                <Route path="transfer" element={<Transfer /> } />
                <Route path="cardRequest" element={<CardRequest /> } />
                <Route path="loanApplications" element={<LoanApplication /> } />
                <Route path="loanApplication" element={<ApplyLoan />} />
                <Route path="messages" element={<Messages /> } />
                <Route path="viewAccount" element={<ViewAccount /> } >
                    <Route path="/client/viewAccount" element={<Navigate replace to="all" />} />
                    <Route path="all" element={<All /> } />
                    <Route path="in" element={<In /> } />
                    <Route path="out" element={<Out /> } />
                </Route>
            </Route>
            
            <Route path="application" element={<Applications /> } />
            <Route path="/auth/verifyAccount" element={<VerifyAccount />} />
            <Route path="/auth/Confirmpassword" element={<Confirmpassword /> } />
            <Route path='/' element={<Navigate replace to="/auth/login" />} />
            <Route path="/auth/login" element={ <Login /> } />  
        </Routes> 
    );
}

export default Navigation;