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
