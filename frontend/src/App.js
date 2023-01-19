import './App.css';
import AdminRoutes from './Routes';
import { useState, useEffect,  } from 'react';
import { UserContext } from './Authorization/userContext';
import AuthorService from "./Service/auth.service";
import { getToken  } from "./helpers/helpers";

function App() {
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
    <UserContext.Provider value={{user, setUser}} >
      <div className='App'>
        <AdminRoutes />
      </div>
    </UserContext.Provider>
  );
}
export default App;
