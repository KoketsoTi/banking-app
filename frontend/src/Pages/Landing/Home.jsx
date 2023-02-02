import { Box } from "@mui/material";
import Navbar from '../../Components/Navbar';
import'./home.css';
import { useNavigate } from 'react-router-dom';
import { SiVerizon} from 'react-icons/si';
import images from '../../Assets/images/bankcard-removebg-preview.png';

function Landing(){
    const navigate = useNavigate();
    function applicationForm(){
        navigate("/application", { replace: true });
    }
    return(
        <Box>
            <Navbar />
            <div className="hero min-h-screen  " style={{ backgroundImage: `url("https://images-ext-2.discordapp.net/external/eA0q49aHlz_8QUljjkS6HxMVZ5stUeszZHdYtKrtXxo/https/lh3.googleusercontent.com/r7Y51X6vqUQXcf7ZtwKW3-bJ6PwBZ1c1W0BJnDLQiFLfirdqEYwmeNAYLtLSxA4E9vRDCtH__7ah_D1rI6AJEwcgAbXf6td5ow%3Ds700")` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md text-white">
                        <h1 className="mb-5 text-5xl font-bold">The bank that builds better relationships</h1>
                        <p className="mb-5"> Make all the right money moves.
                            Control your entire financial life - in one place!</p>
                    </div>
                </div>
            </div>
         
            
            <div className="banking mt-8">
                <div className="hero min-h-screen bg-base-200" style={{backgroundColor: "whitesmoke"}}>
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src={images} className="max-w-sm rounded-lg shadow-2xl" />
                        <div>
                            <h1 className=" mb-5 text-5xl font-bold">4 Step banking System</h1>
                            <p className="py-6">Start banking with us. Lets introduce to you with account creation steps</p>
                            <ul className=" mb-5 menu text-start ">
                                <li ><a>{<SiVerizon style={{color:"#009DE0"}}></SiVerizon>} Fill your Personal Information </a></li>
                                <li ><a>{<SiVerizon style={{color:"#009DE0"}} ></SiVerizon>} Fill your Residential Information</a></li>
                                <li ><a>{<SiVerizon style={{color:"#009DE0"}}></SiVerizon>} Create Bank Account </a></li>
                                <li ><a>{<SiVerizon style={{color:"#009DE0"}}></SiVerizon>} Create Username and Password</a></li>
                            </ul> 

                            <div className="form-group col text-left mb-4">
                                <button onClick={applicationForm} className="btn activate normal-case text-xl flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" >
                                    Appy for Bank Account 
                                </button>
                            </div> 
                        </div>  
                    </div>
                </div> 
            </div>
        </Box>
    );
}

export default Landing;