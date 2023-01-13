import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { API, BEARER } from "../../../Environment/constant";
import { useEffect } from "react";
import { getToken } from "../../../helpers/helpers";
import axios from "axios";

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState();

    const authToken = getToken();
    
    useEffect(() => {
        if (authToken) {
            axios.get(`${API}users/me`, {
                headers: { 
                    Authorization: `${BEARER} ${authToken}`
                }
            }).then((response) => { 
                const data = response.json();
                console.log(data);
                setUserData(response.data.data)
            }).catch(error => {  
                console.log('An error occurred:', error);
            });
        }

    }, []);
    
    const handleUser = (user) => {
        setUserData(user);
    };

    return (
        <AuthContext.Provider value={{ user: userData, setUser: handleUser }} >
          {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;