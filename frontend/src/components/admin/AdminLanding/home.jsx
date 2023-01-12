import './home.css';
import { Box, Typography } from "@mui/material";
import { CgCloseO } from 'react-icons/cg';
import { MdOutlineVerified } from 'react-icons/md';
import { HiOutlineUserGroup } from 'react-icons/hi';

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h4" fontWeight="bold"  style={{ color: "#4cceac" }} > {title} </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mt="2px" style={{ marginBottom: "10px" }} >
        <Typography variant="h5" style={{ color: "#4cceac" }}> {subtitle} </Typography>
        <Typography variant="h5" fontStyle="italic"  style={{ color: "#4cceac" }} > {increase} </Typography>
      </Box>
    </Box>
  );
};

const Home = () =>{
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
              title="431,225"
              subtitle="Total Customers"
              progress="0.50"
              increase="+21%"
              icon={ <HiOutlineUserGroup style={{ color: "#4cceac",  fontSize: "30px", marginBottom: "10px" }} /> }  />
          </Box>

          <Box gridColumn="span 3" style={{backgroundColor: "#141b2d"}} display="flex" alignItems="center" justifyContent="center" >
            <StatBox
              title="431,225"
              subtitle="Active Accounts"
              progress="0.50"
              increase="+21%"
              icon={
                <MdOutlineVerified style={{ color: "#4cceac",  fontSize: "30px", marginBottom: "10px" }} />
              }
            />
          </Box>

          <Box gridColumn="span 3" style={{backgroundColor: "#141b2d"}} display="flex" alignItems="center" justifyContent="center" >
            <StatBox
              title="431,225"
              subtitle="Accounts for Verification"
              progress="0.50"
              increase="+21%"
              icon={
                <MdOutlineVerified style={{ color: "#4cceac",  fontSize: "30px", marginBottom: "10px" }} />  }
            />
          </Box>

          <Box gridColumn="span 3" style={{backgroundColor: "#141b2d"}} display="flex" alignItems="center" justifyContent="center" >
            <StatBox
              title="431,225"
              subtitle="Deactive Accounts"
              progress="0.50"
              increase="+21%"
              icon={
                <CgCloseO style={{ color: "#4cceac",  fontSize: "30px", marginBottom: "10px"}} />  }
            />
          </Box>
        </Box>
       
      </Box>
    );
}

export default Home;


      