import '../Customers/customerData.css';
import { Box, Typography, Grid } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import { Balances, AccountDetails, GeneraInfo, Loan, EditProfile } from '../../../Components/RenderUserProfile';
import { FaUserEdit, FaRegUserCircle } from 'react-icons/fa'
import { GiReceiveMoney } from 'react-icons/gi';
import { AiOutlineBank } from 'react-icons/ai';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../../../Service/clients.service";
import LoadingSpinner from '../../../Components/Loader/LoaderSpinner';

function UserProfile() {
  const general ={
    attributes:{
      birth_date: "2002-01-09",
      city: "Johannesburg",
      country: "South Africa",
      createdAt: "2023-01-25T13:42:36.280Z",
      email: "fridah.dikobe@dadevs.co.za",
      firstname: "Fridah",
      lastname: "Dikobe",
      phone: "079-222-1123",
      street_address:  "14th street",
      surbub: "Randburg",
      zipcode: "0012"
    }
  }

  const account = {
    attributes:{
      account_name:"Check Account",
      account_status: "Suspended",
      account_type: "Cheque",
      accountno:  "1414535733",
      balance: 7000,
      createdAt: "2023-01-25T18:25:51.391Z",
      updatedAt :  "2023-01-26T17:28:21.352Z",
    } 
  }
  
  const loans ={
    attributes:{ 
      amount:15000,
      interest : 10,
      loan_status: "Inactive",
      loan_type: "Short-term",
      monthly_pay: 1375,
      term: 12,
      total_repay: 16500,
      unpaid_interest: 1500
    },
    id:1
  }
  
  const {state} = useLocation();
  const [userInfo, setUserInfo] = useState(general);
  const [getUserAccount, setUserAccount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getUserLoan, setUserLoan] = useState([loans]);

  const pic = "https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png";
  
  function getAllUsers(){
    setLoading(true);
    UserService.getUser(state.id).then((response) => {
      setUserInfo(response.data.data);
      setUserAccount(response.data.data.attributes.acc_id.data)
      setUserLoan(response.data.data.attributes.loans_ids.data)
    }).catch((error) => {
      console.log("An error occurred:", error.response);
    }).finally(() => {
        setLoading(false);
    });
  }
  useEffect(() => {
    getAllUsers();
  },[])

  console.log(getUserLoan);
  return (
    <Box m="20px">
      {loading ? <LoadingSpinner /> :
        (
          <>
            <ToastContainer />
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box mb="30px">
                <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}>Client Profile </Typography>
              </Box>
            </Box>
            
            <Box>
              <div className="grid grid-cols-5 gap-2">
                <div className="card w-48">
                  <div className="profile_card">
                    <figure>
                      <img className='picture_card' src={pic} alt="Shoes" />
                    </figure>

                    <div className="card-body text-center ">
                      <h5>{userInfo.attributes.firstname} {userInfo.attributes.lastname}</h5>
                      <Box className="card-actions justify-center text-center ">
                        <label htmlFor="my-modal-4" className="rounded-none relative cursor-pointer flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                          <FaUserEdit style={{ marginRight: "5px", fontSize: "20px" }} />Edit Profile
                        </label>
                      </Box>
                    </div>
                  </div>
                </div> 

                <div className="card col-span-4 gap-5">
                  <div className="grid grid-cols-2  gap-5">
                    {/* your Total  Balance */}
                    {getUserAccount.map((element) => {
                      return(
                        <div className="card profile_card rounded-none bg-base-100 shadow-xl" key={element.id}>
                          <div className="card-body">
                            <Balances
                              title="Your Total Balance"
                              subtitle={element?.attributes.account_name}
                              balance={element?.attributes.balance.toLocaleString()}
                            />
                          </div>
                        </div>
                      );
                    })} 
                  </div>

                  <div className="grid grid-cols-4 gap-5">
                    <div className="card col-span-2 gap-5">
                      <div className="card profile_card rounded-none bg-base-100 shadow-xl" >
                        <div className="card-body">
                          <GeneraInfo
                            subtitle="General Info"
                            firstname={userInfo.attributes.firstname}
                            lastname={userInfo.attributes.lastname}
                            email={userInfo.attributes.email}
                            birth_date={userInfo.attributes.birth_date}
                            phone={userInfo.attributes.phone}
                            address={userInfo.attributes.street_address}
                            surbub={userInfo.attributes.surbub}
                            city={userInfo.attributes.city}
                            zip={userInfo.attributes.zipcode}
                            country={userInfo.attributes.country}
                            icon={ <FaRegUserCircle style={{fontSize: "20px" }}  />  } 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="card col-span-2 gap-5">
                      {/* your Account Details  */}
                      {getUserAccount.map((element) => {
                        return(
                          <div className="card profile_card rounded-none bg-base-100 shadow-xl" key={element.id}>
                            <div className="card-body">
                              <AccountDetails
                                subtitle="Account Details"
                                accnumber={element?.attributes.accountno}
                                acctype={element?.attributes.account_type}
                                accstatus={element?.attributes.account_status}
                                virtualcard="inactive"
                                icon={<AiOutlineBank style={{ fontSize: "20px" }} />}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div> 
                  </div>

                  <div className="grid grid-cols-4 gap-5">
                    {getUserLoan.map((element) => 
                      <div className="card col-span-2 gap-5 " >
                        <div className="card profile_card rounded-none bg-base-100 shadow-xl" >
                          <div className="card-body">
                            <Loan
                              subtitle="Loan Details"
                              shortloan={element.attributes.loan_type}
                              amount={element.attributes.amount}
                              shortstatus={element.attributes.loan_status}
                              term={element.attributes.term}
                              rate={element.attributes.interest}
                              month={element.attributes.monthly_pay}
                              totalInterest={element.attributes.unpaid_interest}
                              totalDue={element.attributes.total_repay}
                              icon={
                                <GiReceiveMoney style={{fontSize: "20px" }}/>
                              }
                            />
                          </div>
                        </div>
                      </div> 
                    )}
                  </div>
                </div>
              </div>

              <Box  style={{ backgroundColor: "#141b2d" }} alignItems="center" justifyContent="center" >
                <EditProfile 
                  subtitle="Update profile"
                  id={userInfo.id}
                  firstname={userInfo.attributes.firstname}
                  lastname={userInfo.attributes.lastname}
                  email={userInfo.attributes.email}
                  birth_date={userInfo.attributes.birth_date}
                  phone={userInfo.attributes.phone}
                  address={userInfo.attributes.street_address}
                  surbub={userInfo.attributes.surbub}
                  city={userInfo.attributes.city}
                  zip={userInfo.attributes.zipcode}
                />
              </Box>
            </Box>
          </>
        )
      }
    </Box>
  );
}

export default UserProfile;
