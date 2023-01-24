import { Box, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home(){

    const navigate = useNavigate()

    const viewAccount  = (params) => {
        navigate('/client/viewAccount', {state:{params} })
    }

    return (
        <Box className="Box" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box className="heading">
                    <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} ></Typography>
                </Box>
            </Box>

            <Box className="card-request mt-10 lg:xl:mt-20">
                <div className="card p-4 lg:xl:p-0" >
                    <Box className="text-start mb-5">
                        <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >My Accounts</Typography>
                    </Box>

                    {/*  View all Accounts */}  
                    <div className="grid grid-cols-1 lg:xl:grid-cols-2 gap-2 ">                
                        <div className="card lg:xl:w-96 bg-base-100 shadow-xl cursor-pointer"  onClick={() => viewAccount()} >
                            <div className="card-body" >
                                <div className="flex justify-between">
                                    <div className="text-sm lg:xl:text-lg">Savings Account</div> 
                                    <div className="text-sm lg:xl:text-lg">Bal R 5000 </div>
                                </div>    
                            </div>
                        </div>

                        <div className="card lg:xl:w-96 bg-base-100 shadow-xl cursor-pointer" >
                            <div className="card-body" >
                                <div className="flex justify-between">
                                    <div className="text-sm lg:xl:text-lg">Savings Account</div> 
                                    <div className="text-sm lg:xl:text-lg">Bal R 5000 </div>
                                </div>    
                            </div>
                        </div>

                        <div className="card lg:xl:w-96 bg-base-100 shadow-xl cursor-pointer" >
                            <div className="card-body" >
                                <div className="flex justify-between">
                                    <div className="text-sm lg:xl:text-lg">Savings Account</div> 
                                    <div className="text-sm lg:xl:text-lg">Bal R 5000 </div>
                                </div>    
                            </div>
                        </div>

                        <div className="card lg:xl:w-96 bg-base-100 shadow-xl cursor-pointer" >
                            <div className="card-body" >
                                <div className="flex justify-between">
                                    <div className="text-sm lg:xl:text-lg">Savings Account</div> 
                                    <div className="text-sm lg:xl:text-lg">Bal R 5000 </div>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    );
}

export default Home;