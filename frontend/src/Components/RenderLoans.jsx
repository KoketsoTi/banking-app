import { Box, Typography } from "@mui/material";

//Your account Details
export const AccountDetails = ({ accnumber, acctype, accstatus, virtualcard, subtitle, icon  }) => {
    return (
        <Box width="100%" mt="20px" p="20px 30px">
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" style={{ color: "#4cceac" }}>{subtitle} </Typography>
                <Typography variant="h5" style={{ color: "#4cceac" }}> {icon} </Typography>
            </Box>

            <Box style={{ color: "#4cceac" }} className="divider"></Box>
            
            <Box justifyContent="space-between" mt="-5px" >
                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Account Number</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {accnumber} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Account Type</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {acctype} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Account Status</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {accstatus} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Virtual Card</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {virtualcard} </Typography>
                </Box>
            </Box>
        </Box>
    );
};


//User Information
export const GeneraInfo  = ({ firstname, lastname, email, birth_date, phone, address, surbub, city, zip, country, subtitle, icon  }) => {
    return (
        <div className="-mt-3">
            <div className="flex justify-between" >
                <h5>{subtitle} </h5>
                <h5> {icon} </h5>
            </div>

            <hr className="divider"></hr>
            
            <div className="justify-between -mt-2" >
                <div className="flex justify-between mb-2" >
                    <h5 >First Name</h5>
                    <h5 > {firstname} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Last Name</h5>
                    <h5 > {lastname} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5>Email</h5>
                    <h5 > {email} </h5>
                </div>

                <div className="flex justify-between mb-2">
                    <h5 >Date of birth</h5>
                    <h5 > {birth_date} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Phone</h5>
                    <h5 > {phone} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Address</h5>
                    <h5 > {address} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >Surbub</h5>
                    <h5 > {surbub} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5 >City</h5>
                    <h5> {city} </h5>
                </div>

                <div className="flex justify-between mb-2" >
                    <h5>Zip Code</h5>
                    <h5> {zip} </h5>
                </div>
                <div className="flex justify-between mb-2" >
                    <h5>Nationality</h5>
                    <h5> {country} </h5>
                </div>
            </div>
        </div>
    );
};


//Your account Details
export const Loan  = ({ shortloan, shortstatus, amount, term, rate, unpaid_interest, repayment, totaldue,  subtitle, edit, icon  }) => {
    return (
        <Box width="100%" p="20px 30px">
            <Box display="flex" justifyContent="space-between" >
                <Typography variant="h5" style={{ color: "#4cceac" }}>{subtitle} </Typography>
                <Typography variant="h5" style={{ color: "#4cceac" }}> {edit} </Typography>
                <Typography variant="h5" style={{ color: "#4cceac" }}> {icon} </Typography>
            </Box>

            <Box style={{ color: "#4cceac" }} className="divider"></Box>
            
            <Box justifyContent="space-between" mt="-5px" >
                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}> Loan</Typography>
                    <Typography variant="h5" className="second" style={{ color: "#4cceac" }}> {shortloan} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Amount</Typography>
                    <Typography variant="h5" className="second" style={{ color: "#4cceac" }}> {amount} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Term</Typography>
                    <Typography variant="h5" className="second" style={{ color: "#4cceac" }}> {term} months </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Interest </Typography>
                    <Typography variant="h5" className="second" style={{ color: "#4cceac" }}> {rate}% p/a </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Unpaid Interest </Typography>
                    <Typography variant="h5" className="second" style={{ color: "#4cceac" }}>R {unpaid_interest} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Monthly Pay </Typography>
                    <Typography variant="h5" className="second" style={{ color: "#4cceac" }}> R {repayment} p/m </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px">
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Loan Status</Typography>
                    <Typography variant="h5" className="second" style={{ color: "#4cceac" }}>  {shortstatus} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Total Amount</Typography>
                    <Typography variant="h5" className="second" style={{ color: "#4cceac" }}>R {totaldue} </Typography>
                </Box>
            </Box>
        </Box>
    );
};

