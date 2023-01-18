import { Box, Typography } from "@mui/material";

export const ModalOpen = ({ cardData}) => {
    return (
        <Box>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg text-center font-bold">Your Virtual Card Details</h3>
                    <Box width="100%" p="20px 30px">
                        <Box justifyContent="space-between" mt="-5px" >
                            <Box display="flex" justifyContent="space-between" mb="10px" >
                                <Typography variant="h5">Account Number</Typography>
                                <Typography variant="h5" > 111111111 </Typography>
                            </Box>

                            <Box display="flex" justifyContent="space-between" mb="10px" >
                                <Typography variant="h5">Virtual Card Number</Typography>
                                <Typography variant="h5" > 141***********444 </Typography>
                            </Box>

                            <Box display="flex" justifyContent="space-between" mb="10px" >
                                <Typography variant="h5">Name</Typography>
                                <Typography variant="h5" > Excellent Mashenegete </Typography>
                            </Box>

                            <Box display="flex" justifyContent="space-between" mb="10px" >
                                <Typography variant="h5">CVV Number</Typography>
                                <Typography variant="h5" > *** </Typography>
                            </Box>

                            <Box display="flex" justifyContent="space-between" mb="10px" >
                                <Typography variant="h5">Expiry Date</Typography>
                                <Typography variant="h5" >07/24 </Typography>
                            </Box>
                        </Box>
                    </Box>
                </label>
            </label>
        </Box>
    );
};