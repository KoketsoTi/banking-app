import React from 'react'
import { Outlet } from 'react-router-dom';
import { ProfileView } from '../../../Models/ClientProfile';
import Bottom from '../Navigations/BottomNav';
import Sidebar from '../Navigations/SIdeNavBar';

function Client() {
    return(
        <div className="drawer drawer-mobile" > 
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <div className="drawer-content flex flex-col">
                {/* <!-- Navbar--> */}
               
                
                {/* <!-- Page content here --> */}
                <div className="container w-full mt-20 lg:mt-8">
                    {/* <!-- Page content here --> */}
                    <Outlet />
                    
                    {/* <!-- Logged User infor --> */}
                    <ProfileView 
                        fname={"Excellent"}
                        lname={"Mabasa"} 
                        age={"23"}
                        phone={"071-255-3566"}
                        street_address={"12 Mabunda Street"}
                        surbub={"Saulsville"} city={"Pretoria"} zip={"1100"} country={"South Africa"} />
                </div>
                <div>
                <Bottom />
                </div>
            </div> 
            <div className="drawer-side " >
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
                    <ul  className="menu p-4 overflow-y-auto w-60"> 
                        <Sidebar />
                       
                    </ul> 
                   
            </div>
        </div> 
    );
}

export default Client;