import { Box } from "@mui/material";
import Navbar from '../../Components/Navbar';
import { useNavigate } from "react-router-dom";
import image from "../../Assets/images/internet-banking.jpeg"
import './Home.css';


function Landing() {

    const navigate = useNavigate();
    return (

        <div>
            <div className="navbar ">
                <div className="navbar-start">
                    <a className="btn btn-accent normal-case text-xl" style={{ color: 'blue' }}>SKY BANK </a>
                </div>  
            </div>
            <div className="hero min-h-screen filter">
                <div className="filter">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        {/* <img src={image} className="rounded-lg shadow-l" alt="event"/> */}
                        <div>
                            <h1 className="text-5xl font-bold" style={{ color: 'blue' }}>THE NEXT GENERATION PAYMENT METHOD</h1>
                            <p className="py-6" style={{ color: 'blue' }}> CUSTOMER SATISFACTION IS IMPORTANT FOR US</p>
                            <button className="btn btn-accent" style={{ color: 'blue' }} onClick={() => navigate("auth/login", { replace: true })}>Signin</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Landing;