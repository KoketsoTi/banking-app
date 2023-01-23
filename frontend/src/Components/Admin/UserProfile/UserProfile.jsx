import "./UserProfile.css";
import { Box, Typography, Grid } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import { Balances, AccountDetails, GeneraInfo, Loan, EditProfile } from '../../../Models/RenderUserProfile';
import { FaUserEdit, FaRegUserCircle } from 'react-icons/fa'
import { GiReceiveMoney } from 'react-icons/gi';
import { AiOutlineBank } from 'react-icons/ai';
import { useLocation } from "react-router-dom";

function UserProfile() {
  const {state} = useLocation();
  console.log(state)
  return (
    <Box m="20px">
      <ToastContainer />
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb="30px">
          <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}>Client Profile </Typography>
        </Box>
      </Box>

      <Box justifyContent="space-between" alignItems="center">
        {/* GRID */}
        {/* Row 1 */}
        <Grid container spacing={2}>
          {/* Column 1 */}
          <Grid item md={3}>
            {/* For Pictuire Upload */}
            <Box className="card bg-base-100 shadow-xl" style={{ backgroundColor: "#141b2d", color: "#F9F9F9" }}>
              <figure>
                <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
              </figure>

              <Box className="card-body text-center ">
                <Typography variant="h4">
                  {state.params.attributes.customer_id.data.attributes.firstname}  {state.params.attributes.customer_id.data.attributes.lastname}
                </Typography>
                <Typography>If a dog chews shoes whose shoes does he choose?</Typography>
                <Box className="card-actions justify-center text-center ">
                  <label htmlFor="my-modal-4" className="rounded-none relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    <FaUserEdit style={{ marginRight: "5px", fontSize: "20px" }} />Edit Profile
                  </label>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Column 2 */}
          <Grid item md={4.5}>
            {/* your Total  Balance */}
            <Box style={{ backgroundColor: "#141b2d" }} alignItems="center" justifyContent="center" >
              <Balances
                title="Your Total Balance"
                subtitle="Balance"
                balance={state.params.attributes.Balance}
              />
            </Box>

            {/* Bank Account Details */}
            <Box style={{ backgroundColor: "#141b2d" }} alignItems="center" justifyContent="center">
              <GeneraInfo
                subtitle="General Info"
                firstname={state.params.attributes.customer_id.data.attributes.firstname}
                lastname={state.params.attributes.customer_id.data.attributes.lastname}
                email={state.params.attributes.customer_id.data.attributes.email}
                age={state.params.attributes.customer_id.data.attributes.age}
                phone={state.params.attributes.customer_id.data.attributes.phone}
                address={state.params.attributes.customer_id.data.attributes.street_address}
                surbub={state.params.attributes.customer_id.data.attributes.surbub}
                city={state.params.attributes.customer_id.data.attributes.city}
                zip={state.params.attributes.customer_id.data.attributes.zipcode}
                icon={ <FaRegUserCircle style={{ color: "#4cceac", fontSize: "20px" }}  />  } 
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
                balance="2000"/>
            </Box>

            {/* your Account Details */}
            <Box
              style={{ backgroundColor: "#141b2d" }}
              alignItems="center"
              justifyContent="center"
            >
              <AccountDetails
                subtitle="Account Details"
                accnumber={state.params.attributes.accountnumber}
                acctype={state.params.attributes.account_type}
                accstatus={state.params.attributes.account_status}
                virtualcard="inactive"
                icon={
                  <AiOutlineBank
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
                  <GiReceiveMoney
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
            id={state.params.attributes.customer_id.data.id}
            firstname={state.params.attributes.customer_id.data.attributes.firstname}
            lastname={state.params.attributes.customer_id.data.attributes.lastname}
            email={state.params.attributes.customer_id.data.attributes.email}
            age={state.params.attributes.customer_id.data.attributes.age}
            phone={state.params.attributes.customer_id.data.attributes.phone}
            address={state.params.attributes.customer_id.data.attributes.street_address}
            surbub={state.params.attributes.customer_id.data.attributes.surbub}
            city={state.params.attributes.customer_id.data.attributes.city}
            zip={state.params.attributes.customer_id.data.attributes.zipcode}
          />
      </Box>
    </Box>
  );
}

export default UserProfile;

