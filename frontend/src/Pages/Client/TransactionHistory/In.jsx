import { Box} from "@mui/material";
import { useEffect, useState } from "react";
import { getId } from "../../../Helpers/helpers";
import Account from '../../../Service/clients.service';

function In(){
    const [statement, setStatement] = useState([]);
    const id  = getId();

    function getTransactions(){
        Account.getTransaction(id).then((response) => {
            setStatement(response.data.data.attributes.trans_id.data)
        }).catch((error) => {
            console.log("Unable to fetch transaction history");
        })
    }

    useEffect( () =>{
        getTransactions();
    }, [])

    console.log(statement);

    return (
        <Box className="Box" >
            <Box className="card-request mt-2 lg:xl:mt-2">
                <div className="card lg:xl:p-0" >
                    {/*  View All Transctions */}  
                    <div className="grid grid-cols-1 lg:xl:grid-cols-2 gap-2 lg:xl:gap-5 ">                
                        <div className="card lg:xl:w-96 bg-base-100 shadow-xl" >
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

                        <div className="card lg:xl:w-96 bg-base-100 shadow-xl" >
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
                        
                        <div className="card lg:xl:w-96 bg-base-100 shadow-xl" >
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

export default In;