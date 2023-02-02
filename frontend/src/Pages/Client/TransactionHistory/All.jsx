import { Box} from "@mui/material";
import { useState, useEffect, useRef} from "react";
import { useOutletContext } from "react-router-dom";
import { getId } from "../../../Helpers/helpers";
import { CgPushDown } from "react-icons/cg";
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
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

    const general ={
        city: "Johannesburg",
        country: "South Africa",
        email: "fridah.dikobe@dadevs.co.za",
        firstname: "Fridah",
        lastname: "Dikobe",
        phone: "079-222-1123",
        street_address:  "14th street",
        surbub: "Randburg",
        zipcode: "0012"
    }

    const { setData } = useOutletContext();
    const [ statement, setStatement] = useState([]);
    const [ getUserAccount , accountDetails ] = useState(account);
    const [ transaction, setMiniStatement] = useState([]);
    const [ userInfo, setUserInfo ] = useState(general);
    const [ getFrom, setFrom ] = useState();
    const [ getTo, setTo ] = useState();
    const [getToday, setToday ] = useState(); 
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
        const today = new Date();
        setToday(today)
    }, [])

    const handleDateFrom = (e) => {
        setFrom(e.target.value);
    }

    const handleDateTo = (e) => {
        setTo(e.target.value);
    }
    //Download 
    function printDocument(){   
        const doc = new jsPDF(); 
        //get Data html
        const pdfTable = document.getElementById('divToPrint');
        //html to pdf format
        var html = htmlToPdfmake(pdfTable.innerHTML);   
        const documentDefinition = { content: html };
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(documentDefinition).open();  
    }

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

            <Box>
                <input type="checkbox" id="my-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                    <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="font-bold text-lg"></h3>
                        <div className="modal-body">
                            <div className="flex justify-center mb-4 mt-4">
                                <div className="flex">
                                    <h5 className="flex items-center mr-5">From:</h5>
                                    <input type="date" name="fromDate" onChange={handleDateFrom} className="input input-bordered w-full max-w-s email "  />
                                </div>
                            </div>
                            <div className="flex justify-center mb-4">
                                <div className="flex">
                                    <h5 className="flex items-center mr-5">TO:</h5>
                                    <input type="date" name="toDate"  onChange={handleDateTo} className="input input-bordered w-full max-w-s email " />
                                </div>
                            </div>
                        </div>
                        
                        {getTo && getFrom
                            ?
                            <button onClick={printDocument} className="btn hover:activate activate normal-case text-xl w-full lg:xl:w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" >
                                Download Statement
                            </button>
                            :
                            <button onClick={printDocument} disabled className="btn hover:activate activate normal-case text-xl w-full lg:xl:w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" >
                                Download Statement
                            </button>
                        }   
                    </div>
                </div>
            </Box>
               
                
                <div id="divToPrint" className="card p-4 lg:xl:p-0 ">
                    <div className="card-body">
                        <div className="flex justify-between">
                            <div className="text-2xl text-start">{getUserAccount.account_name}</div>  
                            <div className="text-2xl text-end">SKY BANK</div>  
                        </div>

                        <div className="flex justify-between">
                            <div className="Statement-details text-start mt-5">
                                <div className="mb-2 font-bold">{userInfo.firstname} {userInfo.lastname}</div>
                                <div className="mb-2">{userInfo.street_address}</div>
                                <div className="mb-2">{userInfo.surbub}</div>
                                <div className="mb-2">{userInfo.city}</div>
                                <div className="mb-2">{userInfo.zipcode}</div>
                            </div>

                            <div className="flex justify-between">
                                <div className="Statement-details text-start mt-5">
                                    <div className="flex justify-between mb-2" >
                                        <h5 className="font-semibold" >From Date: </h5>
                                        <h5 className="text-start">{getFrom}</h5>
                                    </div>

                                    <div className="flex justify-between mb-2" >
                                        <h5 className="font-semibold" >To Date: </h5>
                                        <h5 className="text-start" >{getTo}</h5>
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
                                            <tr key={data.id}>
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
                                                <td>{data.attributes.availableBalance.toLocaleString("en-ZA", {style:"currency", currency:"ZAR"})}</td>
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