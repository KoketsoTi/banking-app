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
export const GeneraInfo  = ({ firstname, lastname, email, age, phone, address, surbub, city, zip, subtitle, icon  }) => {
    return (
        <Box width="100%" p="20px 30px">
            <Box display="flex" justifyContent="space-between" >
                <Typography variant="h5" style={{ color: "#4cceac" }}>{subtitle} </Typography>
                <Typography variant="h5" style={{ color: "#4cceac" }}> {icon} </Typography>
            </Box>

            <Box style={{ color: "#4cceac" }} className="divider"></Box>
            
            <Box justifyContent="space-between" mt="-5px" >
                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>First Name</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {firstname} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Last Name</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {lastname} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Email</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {email} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Age</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {age} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Phone</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {phone} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Address</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {address} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Surbub</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {surbub} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>City</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {city} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Zip Code</Typography>
                    <Typography variant="h5" style={{ color: "#4cceac" }}> {zip} </Typography>
                </Box>
            </Box>
        </Box>
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
                    <Typography variant="h5" className="second" style={{ color: "#4cceac" }}> {rate} p/a </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Unpaid Interest </Typography>
                    <Typography variant="h5" className="second" style={{ color: "#4cceac" }}> {unpaid_interest} %</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px" >
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Monthly Pay </Typography>
                    <Typography variant="h5" className="second" style={{ color: "#4cceac" }}> {repayment} p/a </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb="10px">
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Loan Status</Typography>
                    <Typography variant="h5" className="second" style={{ color: "#4cceac" }}> {shortstatus} </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5" style={{ color: "#4cceac" }}>Total Amount</Typography>
                    <Typography variant="h5" className="second" style={{ color: "#4cceac" }}> {totaldue} </Typography>
                </Box>
            </Box>
        </Box>
    );
};

