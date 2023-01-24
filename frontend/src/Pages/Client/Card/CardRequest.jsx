import { Box, Typography} from "@mui/material";

function CardRequest(){
    return (
        <Box className="Box" >
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box className="heading">
                    <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >Card</Typography>
                </Box>
            </Box>
            
            <Box className="card-request mt-10 lg:xl:mt-20">
                <div className="grid grid-cols-1 lg:xl:grid-cols-2 gap-10" >
                    <div className="card bg-base-100 rounded-none shadow-xl">
                        <div className="card-body">
                            <div className="mb-4">
                                <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >Your Virtual Card</Typography>
                            </div>
                            
                            <div className="flex justify-center">
                                <div className="card w-96 bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <p>We are using cookies for no reason.</p>
                                    </div>
                                </div> 
                            </div>       
                        </div>
                    </div> 
                    
                    <div className="card bg-base-100 rounded-none shadow-xl">
                        <div className="card-body">
                            <div className="mb-4">
                                <Typography variant="h5" fontWeight="bold" style={{color: "#141b2d"}} >Your Virtual Card Details</Typography>
                            </div>
                            <div className="grid grid-cols-3 lg:xl:grid-cols-3 gap-5">
                                <div className="card-description">
                                    <div className="mb-2">Account Number</div>
                                    <div className="mb-2">Account</div>
                                    <div className="mb-2">Name</div>
                                    <div className="mb-2">CVV Number</div>
                                    <div className="mb-2">Issued Date</div>
                                    <div className="mb-2">Expiry Date</div>
                                    <div className="mb-2">Card Status</div>
                                    <div className="mb-2">Verification Status</div>
                                </div>

                                <div>
                                    <div className="mb-2">:</div>
                                    <div className="mb-2">:</div>
                                    <div className="mb-2">:</div>
                                    <div className="mb-2">:</div>
                                    <div className="mb-2">:</div>
                                    <div className="mb-2">:</div>
                                    <div className="mb-2">:</div>
                                    <div className="mb-2">:</div>
                                </div>

                                <div>
                                    <div className="mb-2">Account</div>
                                    <div className="mb-2">Account</div>
                                    <div className="mb-2">Account</div>
                                    <div className="mb-2">Account</div>
                                    <div className="mb-2">Account</div>
                                    <div className="mb-2">Account</div>
                                    <div className="mb-2">Account</div>
                                    <div className="mb-2">Account</div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </Box>
        </Box>
    );
}

export default CardRequest;