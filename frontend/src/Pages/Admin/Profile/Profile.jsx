import './Profile.css';
import {useContext, useState} from 'react';
import { Box, Typography, Grid } from "@mui/material";
import { getToken } from '../../../Helpers/helpers';
import { Success, Warning } from '../../../Helpers/toasters';
import { ToastContainer } from 'react-toastify';
import { UserContext } from "../../../Authorization/userContext";
import AuthorService from "../../../Service/auth.service";

function Profile(){  
  const [formInfo, setForm] = useState({ firstname: "", lastname: "" , email: "", phone:""});
  const {user, setUser } = useContext(UserContext);
  const authToken = getToken();

  const pic = "https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png";
  
  function handleChange(event) {
    const { name, value } = event.target;
    setForm(prevData => ({ ...prevData, [name]: value }));
  }
  
  const data  = {
    firstname: formInfo.firstname,
    lastname: formInfo.lastname,
    phone: formInfo.phone
  }

  //Update user infor of current loggein user
  async function handleSubmit(event) {
    event.preventDefault();
    AuthorService.UpdateUser(data, authToken).then((response) => { 
      Success('Update was successfull')
      setUser(response.data);
    }).catch(error => {  
      Warning('Unable to update')
    });
  }

  return (
    <Box m="20px">
      <ToastContainer />
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
                  <input type="text" name="firstname" placeholder="First Name"  value={formInfo.firstname || user.firstname} onChange={handleChange}
                    className="input shadow-m input-bordered w-full max-w-s email "  /> 
                </Box>

                <Box className="profile">
                  <label className="label"><span className="label-text">Last Name</span></label>
                  <input type="text" name="lastname" placeholder="Last Name"  value={formInfo.lastname || user.lastname} onChange={handleChange}
                    className="input shadow-m input-bordered w-full max-w-s email "  /> 
                </Box>
    
                <Box className="profile">
                  <label className="label"><span className="label-text">Email</span></label>
                  <input type="email" name="email" disabled placeholder="Email" value={user.email} onChange={handleChange}
                    className="input shadow-m input-bordered w-full max-w-s email "  /> 
                </Box>

                <Box className="profile">
                  <label className="label"><span className="label-text">Phone Number</span></label>
                  <input type="text" name="phone" placeholder="Phone" value={user.contact} onChange={handleChange}
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