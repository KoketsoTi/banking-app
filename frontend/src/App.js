import './App.css';
import { useState, useEffect,  } from 'react';
import { UserContext } from './Authorization/userContext';
import { getToken  } from "./helpers/helpers";
import AdminRoutes from './Routes';
import AuthorService from "./Service/auth.service";

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
