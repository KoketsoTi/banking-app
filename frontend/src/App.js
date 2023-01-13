// import Dashboard from './components/admin/Dashboard/Dash';
import Login from './components/admin/Login/Login';
import './App.css'; 
import Confirmpassword from './components/admin/Confirmpassword/Confirmpassword';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App() {
  return (
    <Router>
    <div className="App">
      {/* <Login></Login> */}
      <Confirmpassword></Confirmpassword>
      {/* <Dashboard></Dashboard> */}
      </div>
      </Router>
  );
}

export default App;
