import { Box, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import { getToken } from "../../../Helpers/helpers";
import User from '../../../Service/Client/client.service';

function Messages(){
    const [getNortifications, setNortifications] = useState([]);
    const [getId, setId] = useState([]);
    const auth_token = getToken();

    function getUserAccounts(){
        //Fetch client id
        
        User.getClientUser().then((response) => {
            setId(response.data.client_id.id)
            console.log(response.data.client_id.id);
            //fetch client accounts using the id returned by the request above
            User.getBeneficiaries(response.data.client_id.id).then((response) => {
                setNortifications(response.data.data.attributes.nortifications.data);
            }).catch((error) => {
                console.log(error);
                console.log("unable to get user accounts");
            })
        })
    }

    useEffect(() => {
        if(auth_token){
            getUserAccounts(); 
        }
    },[])

    console.log(getNortifications);
    
    return (
        <Box m="20px" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box className="heading">
                    <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}>Messages</Typography>
                </Box>
            </Box>

            <Box className="Box" >
                <Box className="card-request mt-2 lg:xl:mt-2">
                    <div className="card lg:xl:p-0" >
                        {/*  View All Transctions */}  
                        <div className="grid grid-cols-1 lg:xl:grid-cols-2 gap-2 lg:xl:gap-5 ">  
                            {getNortifications.map((data) =>           
                                <div className="card bg-base-100 shadow-xl" >
                                    <div className="card-body" >
                                        <p className="text-sm lg:xl:text-lg text-start">
                                            Bank: {data.attributes.type_Transaction} R{data.attributes.amount} from {data.attributes.sender} into  {data.attributes.receipient};  
                                            Ref {data.attributes.type_Transaction}; Avail R{data.attributes.balance}; <br /> {(new Date(data.attributes.createdAt).toLocaleDateString())}</p>          
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Box>
            </Box>
        </Box>
    );
}

export default Messages;

