import { Box, Typography, Grid, SliderValueLabel } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import { BsCurrencyDollar } from 'react-icons/bs';
import { AccountDetails, GeneraInfo, Loan } from '../../../Models/RenderLoans';
import { FaUserEdit, FaRegUserCircle } from 'react-icons/fa'
import { MdOutlineVerified } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GiReceiveMoney } from 'react-icons/gi';
import { useEffect, useState } from "react";
import { getToken } from "../../../helpers/helpers";
import Calculations from '../../../Models/CalculateLoans';
import Loans from "../../../Service/loan.service";


function ApproveLoan(){ 
    const card = {
        card_status: "2323",
        cvv: 122,
        virtual_card: "2323",
        expiry_date: "232323"
    }
    const account = {
        account_status: "2323",
        account_type: "23323",
        accountnumber: "233223"
    }

    const general = {
        firstname:"456789",
        lastname:"ertyuio",
        email:"345678",
        age:"{useClient.age}",
        phone:"{useClient.phone}",
        address:"{useClient.street_address}",
        surbub:"{useClient.surbub}",
        city:"{useClient.city}",
        zip:"{useClient.zipcode}",
    }

    const loan = {
        shortloan:"useDataloan_type",
        amount:"useDataamount",
        shortstatus:"useDataloan_status",
        term:"useDaterm",
        rate:"useDatainterest",
        unpaid_interest:"interetsUnpaid",
        repayment:"monthly",
        totaldue:"totalAmoutn"
    }

    const [totalAmoutn, setTotalAmt] = useState(0);
    const [interetsUnpaid, setInterest] = useState(0);
    const [monthly, setMonthly] = useState(0);
    const [useData, setData ] = useState();
    const [useAccount, setAccount ] = useState(account);
    const [useClient, setClient ] = useState(general);
    const [useLoans, setLoans ] = useState([]);
    const [useCard, setCard ] = useState(card);

    const auth_token = getToken()
    const calculate = async() => {
       const value1 = Calculations.calcShortTerm(useData.amount, useData.interest, useData.term);
       const value2 = Calculations.interestpaid(useData.amount, value1);
       const value3 = Calculations.monthly(value1, useData.term)
       setTotalAmt(value1)
       setInterest(value2)
       setMonthly(value3)
    }

    const separateData = async() => {
        setClient(useData.client.data.attributes)
        console.log(useData)


         setAccount(useAccount)
        console.log(useAccount)

         setCard(useData.card.data.attributes)
        console.log(useCard)

         setLoans(useLoans.loans.data)
        console.log(useLoans.loans.data)
    }
 

    useEffect(()=>{
        if(auth_token){
            Loans.getLoan(auth_token).then((response) => {
                console.log(response.data.data[0].attributes)
                setData(response.data.data[0].attributes);
                // setInterest(response.data.data[0].attributes)

            }).catch((error) => {
                console.log("There is an error", error)
            })
            calculate();
            separateData();
        }
    },[auth_token])

   

    return (
        <Box m="20px">
            <ToastContainer />
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                    <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}>Approve Loan </Typography>
                </Box>
            </Box>
        
            <Box justifyContent="space-between" alignItems="center">
                {/* GRID */}
                {/* Row 1 */}
                <Grid container spacing={2} >
                    {/* Column 1 */}
                    <Grid item  md={4}>
                        {/* User Details */}
                       
                        <Box style={{backgroundColor: "#141b2d"}} alignItems="center" justifyContent="center">
                            <GeneraInfo
                                subtitle="General Info"
                                firstname={useClient.firstname}
                                lastname={useClient.lastname}
                                email={useClient.email}
                                age={useClient.age}
                                phone={useClient.phone}
                                address={useClient.street_address}
                                surbub={useClient.surbub}
                                city={useClient.city}
                                zip={useClient.zipcode}
                                icon={ <FaRegUserCircle style={{ color: "#4cceac",  fontSize: "20px" }} /> } />
                        </Box>
                   
                    </Grid>
                    
                    {/* Column 2 */}
                    <Grid item md={4}>
                        {/* your Loan Details */}
                        {useLoans.map((element) => {
                            <Box style={{backgroundColor: "#141b2d"}} alignItems="center" justifyContent="center" >
                                <Loan
                                    subtitle="Loan Details"
                                    shortloan = {element.attributes.loan_type}
                                    amount={element.attributes.amount}
                                    shortstatus={element.attributes.loan_status}
                                    term={element.attributes.term}
                                    rate={element.attributes.interest}
                                    unpaid_interest={interetsUnpaid}
                                    repayment={monthly}
                                    totaldue={totalAmoutn}
                                    edit={ <FaUserEdit style={{ color: "#4cceac",  fontSize: "20px" }} /> }
                                    icon={ <GiReceiveMoney style={{ color: "#4cceac",  fontSize: "20px" }} /> } />
                            </Box>
                        })}
                    </Grid>
                
                    {/* Column 3 */}
                    <Grid item md={4}>
                        <Box  alignItems="center" justifyContent="center">
                            <Box width="100%"   p="0px">
                                <Box display="flex" justifyContent={"end"} style={{ marginBottom: "10px" }} >
                                    <Typography variant="h5" mr="15px" >
                                        <button style={{ color: "#141b2d", background:"#4cceac" }} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white"><MdOutlineVerified  style={{  marginRight: "10px", fontSize: "20px" }} /> Approve </button>
                                    </Typography>
                                    <Typography variant="h5">
                                        <button style={{ color: "#F9F9F9", background:"#FF5823" }} className="rounded-none w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white"><AiOutlineCloseCircle  style={{ fontSize: "20px", marginRight:"10px" }} />Decline </button>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* your Account Details */}
                        <Box style={{backgroundColor: "#141b2d"}} alignItems="center" justifyContent="center">
                            <AccountDetails
                                subtitle="Account Details"
                                accnumber={useAccount.accountnumber}
                                acctype={useAccount.account_type}
                                accstatus = {useAccount.account_status}
                                virtualcard={useCard.card_status}
                                icon={ <BsCurrencyDollar style={{ color: "#4cceac",  fontSize: "20px" }} /> } />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default ApproveLoan;