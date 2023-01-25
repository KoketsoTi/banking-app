import { Box, Typography} from "@mui/material";
import Modal from "..//..//Client/PayBills/modal";


function Bills(){

    return (
        <Box>
            <div className=" mt-2 lg:xl:mt-2">          
                {/*  View Bills */}  
                <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  gap-2 lg:xl:gap-4">  

                    <div className="card  h-28 bg-base-100 shadow-xl cursor-pointer">
                        <div className="card-body" >
                            <div className="text-center">TELKOM</div>  
                        </div>
                    </div>

                    <div className="card h-28 bg-base-100 shadow-xl cursor-pointer">
                        <div className="card-body" >
                            <div className="text-center">CELL C</div>  
                        </div>
                    </div>

                    <div className="card h-28 bg-base-100 shadow-xl cursor-pointer">
                        <div className="card-body" >
                     
                            <div className="text-center">DSTV</div>  
                        </div>
                    </div>


                    <div className="card h-28 bg-base-100 shadow-xl cursor-pointer">
                        <div className="card-body" >
                            <div className="text-center">MTN SERVICE PROVIDER</div>  
                        </div>
                    </div>


                    <div className="card h-28 bg-base-100 shadow-xl cursor-pointer">
                        <div className="card-body" >
                            <div className="text-center">CITY OF TSHWANE METRO</div>  
                        </div>
                    </div>

                    <div className="card h-28 bg-base-100 shadow-xl cursor-pointer">
                        <div className="card-body" >
                            <div className="text-center">MRP</div>  
                        </div>
                    </div>

                    <div className="card h-28 bg-base-100 shadow-xl cursor-pointer">
                        <div className="card-body" >
                            <div className="text-center">CITY OF CAPE TOWN</div>  
                        </div>
                    </div>
                </div>
            </div>  
        </Box>
    );
}

export default Bills;