import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { GiReceiveMoney } from "react-icons/gi";
import { useEffect } from "react";
import LoadingSpinner from "../../../Components/Loader/LoaderSpinner";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import User from '../../../Service/Client/client.service';
import Acc from "../../../Service/clients.service";
import { Error, Info, Success } from "../../../Helpers/toasters";
import { getToken } from "../../../Helpers/helpers";
import { ToastContainer } from "react-toastify";

function CardRequest() { 
  const userCard = {
    id: 5
  }
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState("");
  const [myCard, setCard] = useState([]);
  const [checkBox, setCheck] = useState("");
  const [card, setCardDetails] = useState();
  const [useAccount, setUseAccount] = useState(userCard)
  const [userAcc, setUser] = useState();
  const handleCheck =  () => setCheck("checked");
  const token = getToken()


  const { formatCreditCardNumber, formatExpirationDate, formatCVC } = useState("");

  async function getUserAccounts(){
    setLoading(true);
    //Fetch client id
    await User.getClientUser().then((response) => {
      //fetch client accounts using the id returned by the request above
      getBeneData(response.data.client_id.id)
    })
  }

  async function getBeneData(id) {
    await User.getBeneficiaries(id).then((response) => {
      setUser(response.data.data.attributes);
      setUseAccount(response.data.data.attributes.acc_id.data[0])
      setLoading(false);
    }).catch((error) => {
     console.log(error);
     console.log("unable to get user accounts");
    })
  }
  

  async function getCardDetails(){
    setLoading(true);
    //Fetch client id
    await Acc.getTransaction(useAccount.id).then((response) => {
      console.log(response.data.data.attributes.card_id.data.attributes);
      setCardDetails(response.data.data.attributes.card_id.data.attributes); 
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      console.log("unable to get user accounts");
    })
  }
  useEffect(() => {
    getUserAccounts();
    getCardDetails();
  },[])


  function onSubmit(data, event) {
    if(!checkBox){
      setMessage("Accept Ts & Cs is required");
    }else{
      setMessage("");
      let randomDigits = 0;
      let cvvNum = 0;
      //code here 
      for (let i = 0; i < 14; i++) {
        let randomNum = parseInt(10000000 + Math.random() * (90000000000000 - 10000000000000))
        randomDigits = randomNum;
      }

      for (let i = 0; i < 3; i++) {
        let randomNum = parseInt(100 + Math.random() * (900 - 100))
        cvvNum = randomNum;
      }

      const todayTimestamp = Date.now();
      const today = new Date(todayTimestamp);
      const future = new Date(today.getFullYear() + 5, today.getMonth(), today.getDate());
      const futureTimestamp = future.getTime();

      let userDetails={
        data:{ 
          number: "51" + randomDigits,
          issue: todayTimestamp,
          expiry: futureTimestamp,
          cvv: cvvNum,
          card_status: "active"
        }
      }

      if(!card){
        User.applyCard(userDetails).then((response) => {
          let account = {
            data:{
              card_id: response.data.data.id
            }
          }

          Acc.updateStatus(token, userAcc?.acc_id.data[0].id, account).then((response) => {
            Success("Your card has been applied successfully");
          }).catch((error) => {
            Error("Unable to apply card");
          })
        })
      }else{
        return Info("You cannot apply for a card when you already have")
      }
    }
  }


  
  return (
    <Box className="Box">
      {loading ? (
        <LoadingSpinner /> ) 
        : (
        <>
          {/* HEADER */}
          <ToastContainer />
          <Box display="flex" mt="20px" justifyContent="space-between" alignItems="center">
            <Box className="heading">
              <Typography variant="h5" fontWeight="bold" style={{ color: "#141b2d" }} > Card </Typography>
            </Box>

            <Box className="heading">
              {myCard.length !== '' 
                ?
                  <label htmlFor="my-modal-12"  className="rounded-none bg-base-100 shadow-xl add-savings cursor-pointer relative flex py-4 px-4 border border-transparent text-sm font-medium rounded-md text-black ">
                    <GiReceiveMoney style={{ color: "#009DE0", marginTop: "1px" }} className="mr-2.5 text-2xl" />
                    <h1 className="text-xl" >Add Virtual Card</h1>
                  </label>
                :
                  <></>
              }
            </Box>
          </Box>
        
          <Box className="card-request mt-10 lg:xl:mt-20">
            <div className="grid grid-cols-1 lg:xl:grid-cols-2 gap-10">
              <div className="card bg-base-100 rounded-none shadow-xl">
                <div className="card-body">
                  <div className="mb-4">
                    <Typography variant="h5" fontWeight="bold" style={{ color: "#141b2d" }} > Your Virtual Card </Typography>
                  </div>

                  <div className="flex justify-center">
                    <div key="Payment">
                      <div className="App-payment">
                        <Card
                          number={number}
                          name={name}
                          expiry={expiry}
                          cvc={cvc}
                          focused={focused}
                        />
                      </div>
                    </div>
                  </div>            
                </div>
              </div>

              <div className="card bg-base-100 rounded-none shadow-xl">
                <div className="card-body">
                  <div className="mb-4">
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      style={{ color: "#141b2d" }}
                    >
                      Your Virtual Card Details
                    </Typography>
                  </div>
                  <div className="grid grid-cols-3 lg:xl:grid-cols-3 gap-5">
                    <div className="card-description">
                      <div className="mb-2">Card Number</div>
                      <div className="mb-2">Account Number</div>
                      <div className="mb-2">Name</div>
                      <div className="mb-2">CVV Number</div>
                      <div className="mb-2">Issued Date</div>
                      <div className="mb-2">Expiry Date</div>
                      <div className="mb-2">Card Status</div>
                    </div>

                    <div>
                      <div className="mb-2">:</div>
                      <div className="mb-2">:</div>
                      <div className="mb-2">:</div>
                      <div className="mb-2">:</div>
                      <div className="mb-2">:</div>
                      <div className="mb-2">:</div>
                      <div className="mb-2">:</div>
                    </div>

                    <div>
                      <div className="mb-2">{card?.number}</div>
                      <div className="mb-2">{userAcc?.acc_id.data[0].attributes.accountno}</div>
                      <div className="mb-2">{userAcc?.firstname} {userAcc?.lastname}</div>
                      <div className="mb-2">{card?.cvv}</div>
                      <div className="mb-2">{(new Date(card?.issue).toLocaleDateString())}</div>
                      <div className="mb-2">{(new Date(card?.expiry).toLocaleDateString('en-US', {month: 'short',year: 'numeric',}))}</div>
                      <div className="mb-2">{card?.card_status}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
          <Box>
          <input type="checkbox" id="my-modal-12" className="modal-toggle" />
            <label htmlFor="my-modal-12" className="modal cursor-pointer">
              <label className="modal-box relative" htmlFor="">
                <h2 className="text-xl text-center font-bold mb-3"> Agreement Details</h2>
                <h6>You must read the agreement before continuing because it contains important terms and conditions that you need to understand and accept.</h6>
                
                <div className="form-group col mb-4 text-start">
                  <div className="viewagreement mt-5">
                    <div className="form-group col mb-4 text-start">
                      <label htmlFor="my-modal-10" className="rounded-none relative w-auto cursor-pointer flex justify-center py-2 px-4 border text-sm font-medium rounded-md text-black" >
                        View agreement details
                      </label>
                    </div>
                    
                  </div>
                    <div className="divider"></div>
                    <div>
                      <div className="flex">
                        <div className="checkBox">
                          <input className="form-check-input" type="checkbox" onClick={handleCheck} id={checkBox} />
                        </div>
                        <label className="form-check-label ml-5" htmlFor={checkBox}>
                          I have read the Debit Mastercard Virtual Crad Terms and Conditions shown above, 
                          I understand their meaning and effect, I accept such terms and conditions and 
                          I am prepared to uphold them. I understand that they replace all Debit Mastercard Virtual 
                          Crad Termd and Conditions which I previously agreed to.
                        </label>
                      </div>
                      <div className="invalid-feedback text-start text-rose-600">{message}</div>
                    </div>
                  
                  </div>
                    
                  <div className=" grid grid-cols-1 md:grid-cols-2 lg:xl:grid-cols-2 gap-5">
                    <button onClick={onSubmit} 
                      className="rounded-none relative w-auto cursor-pointer flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                      Accept
                    </button>

                    <label  htmlFor="my-modal-12" 
                      className="rounded-none relative cursor-pointer flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                      Cancel
                    </label>
                  </div>
              </label>
            </label>
          </Box>

          <Box>
            <input type="checkbox" id="my-modal-10" className="modal-toggle" />
            <label htmlFor="my-modal-10"  className="modal cursor-pointer">
              <label className="modal-box relative" htmlFor="">
                <label htmlFor="my-modal-10"className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h2 className="text-xl text-center font-bold"> Terms and Condition</h2>

                <p className="py-4 font-bold">
                 by cliking ok you agree with the terms and condition of this agreement
                </p>

                <div className="modal-action">
                  <label htmlFor={checkBox} onClick={handleCheck} className="btn">OK</label>
                </div>

              </label>
            </label>

          </Box>
        </>
      )}
    </Box>
  );
}


export default CardRequest;



//htmlFor="check"