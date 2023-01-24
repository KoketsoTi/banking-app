import './home.css';
import { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from "@mui/material";
import { CgCloseO } from 'react-icons/cg';
import { MdOutlineVerified } from 'react-icons/md';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { CgPushDown } from 'react-icons/cg';
import { getToken } from '../../../Helpers/helpers';
import UserService from "../../../Service/clients.service";

function Home(){
  const token = getToken();
  const [clients, setAllClients] = useState([])
  const [pending, setPending] = useState([])

  function getAllUsers(){
    UserService.getAllUsers().then((response) => {
      setAllClients(response.data.data)
    }).catch((error) => {
      console.log("An error occurred:", error.response);
    });
  }

  function getAllApplicants(){
    UserService.getNewUsers(token).then((response) => {
      setPending(response.data.data);
    }).catch((error) => {
        console.log("An error occurred:", error.response);
    });
  }

  useEffect(() => {
    if(token){
      getAllUsers();
      getAllApplicants();
    }
  }, []);

  const active = clients.filter((list) => list.attributes.account_status === "Active")
  const deactive = clients.filter((list) => list.attributes.account_status === "Suspended") 
  
  const StatBox = ({ title, subtitle, icon, progress, increase }) => {
    return (
      <Box width="100%" m="0 30px">
        <Box display="flex" justifyContent="space-between">
          <Box>
            {icon}
            <Typography variant="h4" fontWeight="bold"  style={{ color: "#F9F9F9" }} > {title} </Typography>
          </Box>
        </Box>
  
        <Box display="flex" justifyContent="space-between" mt="2px" style={{ marginBottom: "10px" }} >
          <Typography variant="h5" style={{ color: "#F9F9F9" }}> {subtitle} </Typography>
          <Typography variant="h5" fontStyle="italic"  style={{ color: "#F9F9F9" }} >  </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb="30px">
          <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> DASHBOARD </Typography>
          <Typography variant="h5" style={{color: "#141b2d"}}> Welcome to your dashboard</Typography>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)"  gridAutoRows="140px" gap="10px" >
        {/* ROW 1 */}
        <Box gridColumn="span 3" style={{backgroundColor: "#141b2d"}} display="flex" alignItems="center" justifyContent="center" >
          <StatBox
            title= {clients.length}
            subtitle="Total Customers"
            progress="0.50"
            increase="+21%"
            icon={ <HiOutlineUserGroup style={{ color: "#F9F9F9",  fontSize: "30px", marginBottom: "10px" }} /> }  />
        </Box>

        <Box gridColumn="span 3" style={{backgroundColor: "#141b2d"}} display="flex" alignItems="center" justifyContent="center" >
          <StatBox
            title={active.length}
            subtitle="Active Accounts"
            progress="0.50"
            increase="+21%"
            icon={
              <MdOutlineVerified style={{ color: "#F9F9F9",  fontSize: "30px", marginBottom: "10px" }} />
            }
          />
        </Box>

        <Box gridColumn="span 3" style={{backgroundColor: "#141b2d"}} display="flex" alignItems="center" justifyContent="center" >
          <StatBox
            title={pending.length}
            subtitle="pending Verification"
            progress="0.50"
            increase="+21%"
            icon={
              <MdOutlineVerified style={{ color: "#F9F9F9",  fontSize: "30px", marginBottom: "10px" }} />  }
          />
        </Box>

        <Box gridColumn="span 3" style={{backgroundColor: "#141b2d"}} display="flex" alignItems="center" justifyContent="center" >
          <StatBox
            title={deactive.length}
            subtitle="Suspendend Accounts"
            progress="0.50"
            increase="+21%"
            icon={
              <CgCloseO style={{ color: "#F9F9F9",  fontSize: "30px", marginBottom: "10px"}} />  }
          />
        </Box>

        {/* ROW 2 */}
        <Box gridColumn="span 8" gridRow="span 2" style={{backgroundColor: "#141b2d"}} >
          <Box mt="25px" p="0 30px" display="flex " justifyContent="space-between" alignItems="center" >
            <Box>
              <Typography variant="h5" fontWeight="600" style={{color: "#a3a3a3"}}>Revenue Generated</Typography>
              <Typography variant="h3" fontWeight="bold" style={{color: "#F9F9F9"}}> $59,342.32 </Typography>
            </Box>

            <Box>
              <IconButton>
                <CgPushDown style={{color: "#4cceac"}}/>
              </IconButton>
            </Box>
          </Box>

          <Box height="250px" m="-20px 0 0 0"></Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;