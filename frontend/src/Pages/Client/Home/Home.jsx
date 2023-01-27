import { Box, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken } from "../../../Helpers/helpers";
import User from '../../../Service/Client/client.service';

function Home(){
    const navigate = useNavigate()
    const [getId, setId] = useState([]);
    const [useAccount, setAccount] = useState([]);
    const auth_token = getToken();

    const viewAccount  = (params) => {
        localStorage.setItem("id", params.id)
        navigate('/client/viewAccount/all',)
    }

    function getUserAccounts(){
        //Fetch client id
        User.getClientUser().then((response) => {
            setId(response.data.client_id.id)

            //fetch client accounts using the id returned by the request above
            User.getBeneficiaries(response.data.client_id.id).then((response) => {
                setAccount(response.data.data.attributes.acc_id.data);
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

    return (
        <Box className="Box" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box className="heading">
                    <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} ></Typography>
                </Box>
            </Box>

            <Box className="card-request mt-10 lg:xl:mt-5">
                <div className="card p-4 lg:xl:p-0" >
                    <Box className="text-start mb-5">
                        <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >My Accounts</Typography>
                    </Box>

                    {/*  View all Accounts */}  
                    <div className="grid grid-cols-1 lg:xl:grid-cols-2 gap-2 ">  
                    {useAccount.map((account) => {    
                        return (               
                            <div className="card  bg-base-100 shadow-xl cursor-pointer" key={account.id} onClick={() => viewAccount(account)} >
                                <div className="card-body" >
                                    <div className="flex justify-between">
                                        <div className="text-sm lg:xl:text-lg">{account?.attributes.account_name}</div> 
                                        <div className="text-sm lg:xl:text-lg">Bal R {account?.attributes.balance.toLocaleString() || 77} </div>
                                    </div>    
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </Box>
        </Box>
    );
}

export default Home;