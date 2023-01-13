import './App.css';
import Login from './Components/Admin/Login/Login';
import { getToken } from "./helpers/helpers";
import { Routes,  Route, Navigate } from "react-router-dom";
import AdminRoutes from './Routes';

function App() {
  return (
    <div className='App'>
      <AdminRoutes />
    </div>
  );
}

export default App;
{/* <div className='App'>
      <main className="content contents">
        
      <AdminRoutes />
        <Routes>
         pri
          <Route path="/admin/signin" element={!getToken() ? <Login /> : <Navigate to="/admin/" /> } />
        </Routes>  
      </main>
    </div> */}