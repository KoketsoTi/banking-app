import { useState, useEffect  } from 'react';
import { UserContext } from './userContext';
import { getToken  } from "../helpers/helpers";
import AuthorService from "../Service/auth.service";

const AuthorProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const authToken = getToken();
  
    useEffect(() => {
      if(authToken){
        AuthorService.loggedInUser().then((response) => { 
          //set userData in a useContext 
          setUser(response.data.user);
        })
        .catch((error) => {  
          console.log('An error occurred:', error.response);
        });
      }
  
    }, []);

    return (
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default AuthorProvider