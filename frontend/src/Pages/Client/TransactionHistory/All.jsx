import { Box} from "@mui/material";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import User from '../../../Service/Client/client.service';

function All(){
    const { setData } = useOutletContext();
    
    function getAccount() {
        User.getAccountDetails().then((response) => {
            setData(response.data.data.attributes)
        })
    }
    useEffect( () =>{
        getAccount()
    }, [])

    return (
        <Box className="Box" >
           
            <Box className="card-request mt-2 lg:xl:mt-2">
                <div className="card lg:xl:p-0" >
                    {/*  View All Transctions */}  
                    <div className="grid grid-cols-1 lg:xl:grid-cols-2 gap-2 lg:xl:gap-5 ">                
                        <div className="card bg-base-100 shadow-xl" >
                            <div className="card-body" >
                                <div className="flex justify-between">
                                    <div>
                                        <div className="text-sm lg:xl:text-lg">Beneficiary/Transfer</div>  
                                        <div className="text-sm lg:xl:text-lg text-start">Date</div> 
                                    </div>
                                    <div className="text-sm lg:xl:text-lg self-center">R Amount</div>
                                </div>  
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body" >
                                <div className="flex justify-between">
                                    <div>
                                        <div className="text-sm lg:xl:text-lg">Beneficiary/Transfer</div>  
                                        <div className="text-sm lg:xl:text-lg text-start">Date</div> 
                                    </div>
                                    <div className="text-sm lg:xl:text-lg self-center">R Amount</div>
                                </div>  
                            </div>
                        </div>
                        
                        <div className="card bg-base-100 shadow-xl" >
                            <div className="card-body" >
                                <div className="flex justify-between">
                                    <div>
                                        <div className="text-sm lg:xl:text-lg">Beneficiary/Transfer</div>  
                                        <div className="text-sm lg:xl:text-lg text-start">Date</div> 
                                    </div>
                                    <div className="text-sm lg:xl:text-lg self-center">R Amount</div>
                                </div>  
                            </div>
                        </div> 
                    </div>
                </div>
            </Box>
        </Box>
    );
}

export default All;