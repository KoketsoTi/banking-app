import { Box, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import { getToken } from "../../../Helpers/helpers";
import UserService from "../../../Service/clients.service";

function LoanApp(){
    const [users, setUser] = useState([]);
    const token = getToken();

    function getUser() {
        UserService.getLoanApplication().then((response) => {
            setUser(response.data.data);
        }).catch((error) => {

        })
    }

    useEffect(() => {
        if(token){
            getUser();
        }
    },[])

    console.log(users);

    return (
        <Box m="20px" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                    <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}>Verify Loan Applications</Typography>
                </Box>
            </Box>

            <Box justifyContent="center" className='w-full' style={{ height: 650 }}>
                <table className="table w-full z-0">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Account Number</th>
                            <th>Full Name</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => 
                            <tr key={user.id}>
                                <td>
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-14">
                                            <span className="text-3xl">
                                                e
                                               
                                            </span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        
                        )} 
                    </tbody>
                </table>
            </Box>
        </Box>
    );
}

export default LoanApp;