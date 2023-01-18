import "./UserProfile.css";
import { Box, Typography, Grid, Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { BsCurrencyDollar } from "react-icons/bs";
import {
  Balances,
  AccountDetails,
  GeneraInfo,
  Loan,
  EditProfile
} from "./RenderUserProfile";
import { FaUserEdit } from "react-icons/fa";



function UserProfile() {
  const pic =
    "https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png";

  return (
    <Box m="20px">
      <ToastContainer />
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb="30px">
          <Typography
            variant="h2"
            fontWeight="bold"
            style={{ color: "#141b2d" }}
            sx={{ m: "0 0 5px 0" }}
          >
            Client Profile{" "}
          </Typography>
        </Box>
      </Box>

      <Box justifyContent="space-between" alignItems="center">
        {/* GRID */}
        {/* Row 1 */}
        <Grid container spacing={2}>
          {/* Column 1 */}
          <Grid item md={3}>
            {/* For Pictuire Upload */}
            <Box
              className="card bg-base-100 shadow-xl"
              style={{ backgroundColor: "#141b2d", color: "#F9F9F9" }}
            >
              <figure>
                <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
              </figure>
              <Box className="card-body text-center ">
                <Typography variant="h4">Excellent Mashengete</Typography>
                <Typography>
                  If a dog chews shoes whose shoes does he choose?
                </Typography>
                <Box class="card-actions justify-center text-center ">
           
                <label htmlFor="my-modal-4" className="btn"
                    style={{
                        background: "#F9F9F9",
                        color: "#141b2d",
                        borderColor: "#141b2d",
                    }}
                    >
              <FaUserEdit
                style={{ marginRight: "5px", fontSize: "20px" }}
              />

              Edit Profile
            </label>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Column 2 */}
          <Grid item md={4.5}>
            {/* your Total  Balance */}
            <Box
              style={{ backgroundColor: "#141b2d" }}
              alignItems="center"
              justifyContent="center"
            >
              <Balances
                title="Your Total Balance"
                subtitle="Balance"
                balance="2000"
                icon={
                  <BsCurrencyDollar
                    style={{
                      color: "#4cceac",
                      fontSize: "25px",
                      marginTop: "3px",
                      marginLeft: "-10px ",
                    }}
                  />
                }
              />
            </Box>

            {/* Bank Account Details */}
            <Box
              style={{ backgroundColor: "#141b2d" }}
              alignItems="center"
              justifyContent="center"
            >
              <GeneraInfo
                subtitle="General Info"
                firstname="Excellent"
                lastname="Mashengete"
                email="mashengete@live.com"
                age="40"
                phone="079-551-7898"
                address="25 Mareka Street"
                surbub="Auckland Park"
                city="Johannesburg"
                zip="0125"
                icon={
                  <BsCurrencyDollar
                    style={{ color: "#4cceac", fontSize: "20px" }}
                  />
                }
              />
            </Box>
          </Grid>

          {/* Column 3 */}
          <Grid item md={4.5}>
            {/* your Total Savings Balance */}
            <Box style={{ backgroundColor: "#141b2d" }}>
              <Balances
                title="Your Total Savings Balance"
                subtitle="Savings Balance"
                balance="2000"
                icon={
                  <BsCurrencyDollar
                    style={{
                      color: "#4cceac",
                      fontSize: "25px",
                      marginTop: "3px",
                      marginLeft: "-10px ",
                    }}
                  />
                }
              />
            </Box>

            {/* your Account Details */}
            <Box
              style={{ backgroundColor: "#141b2d" }}
              alignItems="center"
              justifyContent="center"
            >
              <AccountDetails
                subtitle="Account Details"
                accnumber="1455535789"
                acctype="Savings"
                accstatus="Active"
                virtualcard="inactive"
                icon={
                  <BsCurrencyDollar
                    style={{ color: "#4cceac", fontSize: "20px" }}
                  />
                }
              />
            </Box>

            {/* your Loan Details */}
            <Box
              style={{ backgroundColor: "#141b2d" }}
              alignItems="center"
              justifyContent="center"
            >
              <Loan
                subtitle="Loan Details"
                shortloan="Short-Term Loan"
                amount="80 000"
                shortstatus="Active"
                term="60"
                rate="11%"
                icon={
                  <BsCurrencyDollar
                    style={{ color: "#4cceac", fontSize: "20px" }}
                  />
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box  style={{ backgroundColor: "#141b2d" }} alignItems="center" justifyContent="center" >
        <EditProfile 
            subtitle="Update profile"
            firstname={"Excellent"}
            lastname="Mashengete"
            email="mashengete@live.com"
            age="40"
            phone="079-551-7898"
            address="25 Mareka Street"
            surbub="Auckland Park"
            city="Johannesburg"
            zip="0125" />
      </Box>
    </Box>
  );
}

export default UserProfile;


/*


 <input type="checkbox" id="my-modal" className="modal-toggle" />
 <div className="modal">
   <div className="modal-box">
     <h3 className="font-bold text-lg">Update profile</h3>
     <label className="label">
       <span className="label-text">First Name</span>{" "}
     </label>
     <input
       type="text"
       name="identifier"
       placeholder="First Name"
       className="input input-bordered w-full max-w-s email "
     />

     <label className="label">
       <span className="label-text">Last Name</span>{" "}
     </label>
     <input
       type="text"
       name="identifier"
       placeholder="Last Name"
       className="input input-bordered w-full max-w-s email "
     />

     <label className="label">
       <span className="label-text">Email</span>{" "}
     </label>
     <input
       type="text"
       name="identifier"
       placeholder="Email"
       className="input input-bordered w-full max-w-s email "
     />

     <label className="label">
       <span className="label-text">Age</span>{" "}
     </label>
     <input
       type="text"
       name="identifier"
       placeholder="Age"
       className="input input-bordered w-full max-w-s email "
     />

     <label className="label">
       <span className="label-text">Phone</span>{" "}
     </label>
     <input
       type="text"
       name="identifier"
       placeholder="Phone"
       className="input input-bordered w-full max-w-s email "
     />

     <label className="label">
       <span className="label-text">Street Address</span>{" "}
     </label>
     <input
       type="text"
       name="identifier"
       placeholder="Address"
       className="input input-bordered w-full max-w-s email "
     />
     <label className="label">
       <span className="label-text">Suburb</span>{" "}
     </label>
     <input
       type="text"
       name="identifier"
       placeholder="Suburb"
       className="input input-bordered w-full max-w-s email "
     />

     <label className="label">
       <span className="label-text">City</span>{" "}
     </label>
     <input
       type="text"
       name="identifier"
       placeholder="City"
       className="input input-bordered w-full max-w-s email "
     />
     <label className="label">
       <span className="label-text">Zip Code</span>{" "}
     </label>
     <input
       type="text"
       name="identifier"
       placeholder="Code"
       className="input input-bordered w-full max-w-s email "
     />

     <div className="modal-action">
       <label htmlFor="my-modal" className="btn">
         Save Changes
       </label>
     </div>
   </div>
 </div>

 */