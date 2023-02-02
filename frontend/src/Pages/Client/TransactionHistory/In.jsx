import { Box} from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getId } from "../../../Helpers/helpers";
import Account from '../../../Service/clients.service';
import User from '../../../Service/Client/client.service';

function In(){
    const { setData } = useOutletContext();
    const [statement, setStatement] = useState([]);
    const id  = getId();

    function getAccount() {
        User.getAccountDetails().then((response) => {
            setData(response.data.data.attributes)
        })
    }

    function getTransactions(){
        Account.getTransaction(id).then((response) => {
           
            setStatement(response.data.data.attributes.trans_ids.data)
        }).catch((error) => {
            console.log("Unable to fetch transaction history");
        })
    }

    useEffect( () =>{
        getAccount();
        getTransactions();
    }, [])

    let credit = statement.filter((res) => res.attributes.debit_credit == 'cr');
   
    return (
        <Box className="Box" >
            <Box className="card-request mt-2 lg:xl:mt-2">
                <div className="card p-4 lg:xl:p-0" >
                    {/*  View All Transctions */}  
                    <div className="grid grid-cols-1 lg:xl:grid-cols-2 gap-2 lg:xl:gap-5 ">  
                        {credit.map((results) =>               
                            <div className="card bg-base-100 shadow-xl" key={results.id} >
                                <div className="card-body" >
                                    <div className="flex justify-between">
                                        <div>
                                            <div className="text-sm lg:xl:text-lg">{results.attributes.name} {results.attributes.type_Transaction}</div>  
                                            <div className="text-sm lg:xl:text-lg text-start">{(new Date(results.attributes.createdAt).toLocaleDateString())   }</div> 
                                        </div>
                                        <div className="text-sm lg:xl:text-lg self-center">R {results.attributes.amount }</div>
                                    </div>  
                                </div>
                            </div>
                        )}
                    </div>  
                </div>
            </Box>
        </Box>
    );
}

export default In;