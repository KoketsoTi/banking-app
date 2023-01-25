import React, { useEffect } from 'react';
import "./client.css";
import { Outlet } from 'react-router-dom';
import { getToken } from '../../../Helpers/helpers';
import { useState } from 'react';
import { ProfileView } from '../../../Models/ClientProfile';
import Sidebar from '../Navigations/SIdeNavBar';
import User from '../../../Service/Client/client.service';

function Client() {
    const data = {
        birth_date: "2002-05-12",
        city: "Pretoria",
        createdAt: "2023-01-25T08:17:48.750Z",
        email: "kokitinyane@gmail.com",
        firstname: "Koketso",
        id: 1,
        lastname: "Tinyane",
        phone: "079-123-9833",
        street_address: "22 mareka street",
        surbub: "Oliven",
        updatedAt: "2023-01-25T08:30:25.572Z",
        user_id: 2,
        zipcode: "0012"
    }
    const [loggedUser, setUser] = useState(data);
    const auth_token = getToken();
    
    function getClient(){
        User.getClientUser().then((response) => {
            setUser(response.data.client_id);
        }).catch((error) => {

        })
    }

    useEffect( ()=> {
        if (auth_token) {
            getClient()
        }
    },[])

    return(
        <div className="drawer drawer-mobile " > 
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <div className="drawer-content ">
                {/* <!-- Navbar--> */}
               
                {/* <!-- Page content here --> */}
                <div className="container w-full lg:xl:pl-10 lg:xl:pr-10">
                    {/* <!-- Page content here --> */}
                    <Outlet />
                    
                    {/* <!-- Logged User infor --> */}
                    <ProfileView 
                        fname={loggedUser.firstname}
                        lname={loggedUser.lastname}
                        date_of_birth={loggedUser.birth_date}
                        phone={loggedUser.phone}
                        street_address={loggedUser.street_address}
                        surbub={loggedUser.surbub}
                        city={loggedUser.city} 
                        zip={loggedUser.zipcode}
                        country={loggedUser.country}
                    />
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