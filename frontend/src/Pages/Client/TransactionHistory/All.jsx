import { Box} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getId } from "../../../Helpers/helpers"
import User from '../../../Service/Client/client.service';
import Account from '../../../Service/clients.service';


function All(){
    const account = {
        account_name:"Check Account",
        account_status: "Suspended",
        account_type: "Cheque",
        accountno:  "1414535733",
        balance: 7000,
        createdAt: "2023-01-25T18:25:51.391Z",
        updatedAt :  "2023-01-26T17:28:21.352Z",
    }


    const { setData } = useOutletContext();
    const [ statement, setStatement] = useState([]);
    const [ getUserAccount , accountDetails ] = useState(account);
    const [ transaction, setMiniStatement] = useState([]);
    const id  = getId();

    function getAccount() {
        User.getAccountDetails().then((response) => {
            setData(response.data.data.attributes)
        })
    }

    function getTransactions(){
        Account.getTransaction(id).then((response) => {
            setStatement(response.data.data.attributes.trans_ids.data);
            accountDetails(response.data.data.attributes);
            setMiniStatement(response.data.data.attributes.trans_ids.data);           
        }).catch((error) => {
            console.log("Unable to fetch transaction history");
        })
    }

    useEffect( () =>{
        getAccount();
        getTransactions();
    }, [])


    console.log(statement);

    return (
        <Box className="Box" >
            <Box className="card-request mt-2 lg:xl:mt-2">
                <div className="card p-4 lg:xl:p-0" >
                    {/*  View All Transctions */}  
                    <div className="grid grid-cols-1 lg:xl:grid-cols-2 gap-2 lg:xl:gap-5 ">  
                        {[...transaction].reverse().map((data) =>               
                            <div className="card bg-base-100 shadow-xl" key={data.id}>
                                <div className="card-body" >
                                    <div className="flex justify-between">
                                        <div>
                                            <div className="text-sm lg:xl:text-lg">{data.attributes.name} {data.attributes.type_Transaction}</div>  
                                            <div className="text-sm lg:xl:text-lg text-start">{(new Date(data.attributes.createdAt).toLocaleDateString())}</div> 
                                        </div>
                                        <div className="text-sm lg:xl:text-lg self-center">{data.attributes.amount.toLocaleString("en-ZA", {style:"currency", currency:"ZAR"}) } {data.attributes.debit_credit}</div>
                                    </div>  
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="card p-4 lg:xl:p-0 hidden">
                    <div className="card-body">
                        <div className="flex justify-between">
                            <div className="text-2xl text-start">{getUserAccount.account_name}</div>  
                            <div className="text-2xl text-end">SKY BANK</div>  
                        </div>

                        <div className="flex justify-between">
                            <div className="Statement-details text-start mt-5">
                                <div className="mb-2 font-bold">Excellent Mashengete</div>
                                <div className="mb-2">Street Address</div>
                                <div className="mb-2">Surburb</div>
                                <div className="mb-2">City</div>
                                <div className="mb-2">Zip</div>
                            </div>

                            <div className="flex justify-between">
                                <div className="Statement-details text-start mt-5">
                                    <div className="flex justify-between mb-2" >
                                        <h5 className="font-semibold" >From Date: </h5>
                                        <h5 className="text-start"> From </h5>
                                    </div>

                                    <div className="flex justify-between mb-2" >
                                        <h5 className="font-semibold" >To Date: </h5>
                                        <h5 className="text-start" > To </h5>
                                    </div>

                                    <div className="flex justify-between mb-2" >
                                        <h5 className="font-semibold" >Print Date: </h5>
                                        <h5 className="text-start" > Today </h5>
                                    </div>
                                    
                                    <div className="flex justify-between mb-4 mt-16" >
                                        <h5 className="font-bold" > Opening Balance: </h5>
                                        <h5 className="text-start" > {0}</h5>
                                    </div>
                                    <div className="flex justify-between mb-4" >
                                        <h5 className="font-bold" > Account Number: </h5>
                                        <h5 className="text-start" > {getUserAccount.accountno} </h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="Statement-description mt-10">
                            <table className="table w-full z-0">
                                <thead>
                                    <tr>
                                        <th>Transaction Date</th>
                                        <th>Description</th>
                                        <th>Money In (R)</th>
                                        <th>Money Out (R)</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statement.map((data) => {
                                        return (
                                            <tr>
                                                <td>{(new Date(data.attributes.createdAt).toLocaleDateString())}</td>
                                                <td>{data.attributes.name} {data.attributes.type_Transaction}</td>
                                                {data.attributes.debit_credit == 'Cr' ?
                                                    <td>{data.attributes.amount.toLocaleString("en-ZA", {style:"currency", currency:"ZAR"})}</td>
                                                :
                                                    <td></td>
                                                }
                                                {data.attributes.debit_credit == 'Dr' ?
                                                    <td>{data.attributes.amount.toLocaleString("en-ZA", {style:"currency", currency:"ZAR"})}</td>
                                                :
                                                    <td></td>
                                                }
                                                <td>{data.attributes.availableBalance}</td>
                                            </tr>
                                        );                                     
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="Statement-End">
                            <div className="flex justify-between">
                                <div className="font-bold">Closing Balance:</div>
                                <div className="font-bold">{getUserAccount.balance.toLocaleString("en-ZA", {style:"currency", currency:"ZAR"})}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    );
}

export default All;