import './App.css';
import Login from './Components/Admin/Login/Login';
import { getToken } from "./helpers/helpers";
import { Routes,  Route, Navigate } from "react-router-dom";
import AdminRoutes from './Components/Admin/Routes';

function App() {
  return (
    <div className='App'>
      <main className="content contents">
        
      <AdminRoutes />
        <Routes>
         pri
          <Route path="/admin/signin" element={!getToken() ? <Login /> : <Navigate to="/admin/" /> } />
        </Routes>  
      </main>
    </div>
  );
}

export default App;
