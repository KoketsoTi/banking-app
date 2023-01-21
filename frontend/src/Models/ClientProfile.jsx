import { Box, Typography } from "@mui/material";

export const ProfileView = ({fname, lname, age, phone, street_address, surbub, city, zip, country}) => {
    return (
        <Box>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute text-slate-900 hover:text-gray-50 right-2 top-2">✕</label>
                    <h1 variant="h4" className="text-lg text-center font-bold">User Profile Details</h1>
                    <Box width="100%" p="20px 30px">
                        <Box justifyContent="space-between" mt="-5px" >
                            <div className="grid grid-cols-2 gap-8">
                                <Box justifyContent="space-between" mb="10px" >
                                    <h4 >First Name</h4>
                                    <h4  >{fname}</h4>
                                </Box>

                                <Box justifyContent="space-between" mb="10px" >
                                    <h4 >Last Name</h4>
                                    <h4 >{lname}</h4>
                                </Box>

                                <Box justifyContent="space-between" mb="10px" >
                                    <h4 >Age</h4>
                                    <h4 >{age}</h4>
                                </Box>

                                <Box justifyContent="space-between" mb="10px" >
                                    <h4 >Contact</h4>
                                    <h4 >{phone}</h4>
                                </Box>
                            </div> 
                            <Box justifyContent="space-between" mb="10px" >
                                <h4 >Address</h4>
                                <h4 >{street_address}</h4>
                                <h4 >{surbub}</h4>
                                <h4 >{city}</h4>
                                <h4 >{zip}</h4>
                            </Box>

                            <Box justifyContent="space-between" mb="10px" >
                                <h4 >Nationality</h4>
                                <h4 >{country}</h4>
                            </Box>
                        </Box>
                    </Box>
                </label>
            </label>
        </Box>
    );
};