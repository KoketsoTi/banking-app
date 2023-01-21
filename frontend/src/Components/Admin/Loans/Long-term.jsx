import { useEffect, useRef, useState } from 'react';
import './Loans.css';
import { Box, Typography, Button} from "@mui/material";
import { BsPencilSquare } from 'react-icons/bs';
import { dataLoans } from '../../../Data/mockedData';
// import { AiOutlineEye, AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
// import { DataTables } from '../../../Models/DataTables';
import { getToken } from '../../../helpers/helpers';
import UserService from "../../../Service/clients.service";
import { Error, Success } from '../../../helpers/toasters';

function LongTerm(){
  const navigate = useNavigate();

  //For loans
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [unpaidInterest, setunpaidInterest] = useState(0);
  const [paymentmonthly, setupmonpayment] = useState(0);


   const [deactive, setDeactive] = useState([])
   const [name, setName]=useState();
   const [id, setId]=useState();
   const [users, setActive] = useState([])
   const token = getToken() 
   const accStatus = useRef();

   const [mydata, setMydata] = useState(dataLoans)
   function handleDelete(id){
   const newdata = mydata.filter(li=>li.id!==id)
   setMydata(newdata);
   }
 
  useEffect( () => {
    if(token){
      UserService.getAllUsers(token).then((response) => {
        setDeactive(response.data.data);
        console.log(response.data.data)
      }).catch((error) => {
          console.log("An error occurred:", error.response);
      });
    }
  }, [])


  function getAllUsers(){
    UserService.getAllUsers().then((response) => {
      setActive(response.data.data);
      console.log(response.data.data)
    }).catch((error) => {
      console.log("An error occurred:", error.response);
    });
  }

  const activateUser = (params) => {
    const id = params.id
    accStatus.current = params.attributes.account_status;
    console.log(params.attributes.account_status)
    let value ="";
    if(params.attributes.account_status === 'Suspended'){
      value = "Active";
    }else if(params.attributes.account_status === 'Active'){
      value = "Suspended";
    }

    const data = {
      data:{account_status: value}
    }
  
    console.log(token , id, data)

    UserService.updateStatus(token, id, data).then((data) => {
      if(value === "Suspended"){
        Success("Successfully Activated")
      }else {
        Success("Successfully Suspended")
      }
    }).catch((error) => {
      Error("Unable to update")
    }).finally( () => {
      getAllUsers();
    })
  }

  useEffect( () => {
    if(token){
      getAllUsers()
    }
  }, [])

  const Activate = (params) => {
    setName(params.attributes.customer_id.data.attributes.firstname)
    setId(params.id)
  }
  return (
    <Box m="20px" >
    {/* HEADER */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box mb="30px">
        <Typography variant="h2" fontWeight="bold" style={{color: "#141b2d"}} sx={{ m: "0 0 5px 0" }}> Long term loan
        </Typography>
      </Box>
    </Box>

    {/* Data in a table using Datagrid for creating a table  */}
    <Box justifyContent="center" className='w-full' style={{ height: 650 }}>
      <table className="table w-full z-0">
        <thead>
          <tr>
            <th></th>
            <th>Account Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>email</th>
            <th>age</th>
            <th>phone</th>
            <th>status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {deactive.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-14">
                      <span className="text-3xl">
                      {user?.attributes.customer_id.data.attributes.firstname?.slice(0, 1)?.toUpperCase()}
                      </span>
                    </div>
                    </div>
                </td>
                <td>
                  {user?.attributes.accountnumber}
                </td>
                <td>
                  {user?.attributes.customer_id.data.attributes.firstname}
                </td>
                <td>
                  {user?.attributes.customer_id.data.attributes.lastname}
                </td>
                <td>
                  {user?.attributes.customer_id.data.attributes.email}
                </td>
                <td>
                  {user?.attributes.customer_id.data.attributes.phone}
                </td>
                <td>
                  {user?.attributes.account_status}
                </td>
                <td>
                  <label htmlFor="my-modal-4" onClick={()=>Activate(user)} className="rounded-none relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" style={{background: "#4cceac", color:"#141b2d"}} ><BsPencilSquare style={{marginTop: "3px", marginRight:"5px"}}/>Activate</label>  
                </td>
                <td >
                    <button  className={
                      user.attributes.account_status ==='Suspended'
                      ? "rounded-none suspend relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white "
                      : "rounded-none activate relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white"
                    } onClick={() => activateUser(user)} >{user.attributes.account_status ==='Suspended' ? "Suspended": "Activate"}</button>
                  </td>
                  {/* <td>
                    <button className="rounded-none suspend relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white " style={{background: "#4cceac", color:"#141b2d"}} ><AiOutlineEye style={{fontSize:"15px", marginRight:"5px"}}/>Delete</button>
                  </td> */}
                  <td>
                   <button className="rounded-none suspend relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white " style={{background: "#FF5823", color:"#F9F9F9"}}>Delete</button>
                  </td>

              </tr>
            );
          })}
          </tbody>
      </table>
      {/* <DeleteUser subtitle={`Are you sure you want to Activate this client ${name}`} user={{id,name}} /> */}
    </Box> 
  </Box>
    );
}

export default LongTerm;