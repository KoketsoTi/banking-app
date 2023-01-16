import './Profile.css';
import {useState} from 'react';
import { Box, Typography, Grid } from "@mui/material";
import { useEffect } from 'react';
import { API, BEARER } from "../../../Environment/constant";
import { getToken } from "../../../helpers/helpers";
import { Success, Warning } from '../../../helpers/toasters';
import axios from "axios";
import jwt_decode from "jwt-decode";

function Profile(){  
  const [formInfo, setForm] = useState({ firstname: "", lastname: "" , email: "", phone:""});
  const [userData, setUserData] = useState();
  const pic = "https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png";
  const authToken = getToken();

  const token = localStorage.getItem('authToken')
  const decoded_token = jwt_decode(token)
  const id = decoded_token.id

  //Get user infor according to current loggein user
  useEffect(() => {
    axios.get(`${API}users/${id}`, {
      headers: { 
        Authorization: `${BEARER} ${authToken}`
    }
    }).then((response) => { 
      console.log(response.data)
      setUserData(response.data)
    }).catch(error => {  
      console.log('An error occurred:', error);
    });
  }, []);
  

  function handleChange(event) {
    const { name, value } = event.target;
    setForm(prevData => ({ ...prevData, [name]: value }));
  }

  //Update user infor of current loggein user
  function handleSubmit(event) {
    event.preventDefault();
    const id = 1;
    axios.put(`${API}users/${id}`, {data:{
      FirstName: formInfo.firstname,
      FirstName: formInfo.lastname,
      Phone: formInfo.phone
    }}, {
      headers: { 
        Authorization: `${BEARER} ${authToken}`
    }
    }).then((response) => { 
      setUserData(response.data)
      Success('Update was successfull')
    }).catch(error => {  
      console.log('An error occurred:', error);
      Warning('Unable to update')
    });
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mb="30px">
          <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> Profile </Typography>
        </Box>
      </Box>
      <Box justifyContent="space-between" alignItems="center">
          {/* GRID & CHARTS */}
        <Grid container spacing={2}>
           {/* ROW 1 */}
          <Grid item xs={6} md={4}>
            <Box className="card-body picture rounded-md flex justify-center">
              <Box className="flex card-profile-image justify-center">
                <img className="img w-36" src={pic} alt="" />   
              </Box>
  
              <Box className="body text-center">
                <Typography variant='h5' className="body-name" ></Typography>
                <Typography variant='h5' className="body-name" ></Typography>
              </Box>  
            </Box>
          </Grid>
            
          {/* ROW 2 */}
          <Grid item xs={6} md={8}>
            <Box className="card-body picture rounded-md  justify-center">
              <form>
                <Box className="profile">
                  <label className="label"><span className="label-text">First Name</span></label>
                  <input type="text" name="firstname" placeholder="First Name"  value={formInfo.firstname} onChange={handleChange}
                    className="input shadow-m input-bordered w-full max-w-s email "  /> 
                </Box>

                <Box className="profile">
                  <label className="label"><span className="label-text">Last Name</span></label>
                  <input type="text" name="lastname" placeholder="Last Name"  value={formInfo.lastname} onChange={handleChange}
                    className="input shadow-m input-bordered w-full max-w-s email "  /> 
                </Box>
    
                <Box className="profile">
                  <label className="label"><span className="label-text">Email</span></label>
                  <input type="email" name="email" disabled placeholder="Email" value={formInfo.email} onChange={handleChange}
                    className="input shadow-m input-bordered w-full max-w-s email "  /> 
                </Box>

                <Box className="profile">
                  <label className="label"><span className="label-text">Phone Number</span></label>
                  <input type="text" name="phone" placeholder="Phone Number" value={formInfo.phone} onChange={handleChange}
                    className="input shadow-m input-bordered w-full max-w-s email "  /> 
                </Box>
                

                <Box className="flex mt-5">
                  <div className="buttons " >
                    <button type="submit" onClick={handleSubmit} className="save justify-center py-2 px-4 font-medium rounded">Save</button>
                  </div>
                  
                  <div className="buttons">
                    <button className=" cancel  ml-4  justify-center py-2 px-4 font-medium rounded">Cancel</button>
                  </div>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Profile;
