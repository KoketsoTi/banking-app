import { Box, Typography } from "@mui/material";
import { useState } from "react";
import LoadingSpinner from "../../../Components/Loader/LoaderSpinner";
import Card from "react-credit-cards";
import Checkbox from "@mui/material/Checkbox";
import SupportedCards from "./Cards";
import cardReq from '../../../Service/Client/client.service'
import "react-credit-cards/es/styles-compiled.css";
import { GiReceiveMoney } from "react-icons/gi";
import { useEffect } from "react";

function CardRequest() {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState("");
  const [myCard, setCard] = useState([]);
  const [checkBox, setCheck] = useState(false)
  const { formatCreditCardNumber, formatExpirationDate, formatCVC } = useState("");

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  const handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };
    function callCard() {
        cardReq.callCards().then((respone) => {
            setCard(respone.data.data)
        })
        
    }
    useEffect(() => {
        callCard();
    },[])

    console.log(myCard);
  return (
    <Box className="Box">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* HEADER */}
          <Box
            display="flex"
            mt="20px"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box className="heading">
              <Typography
                variant="h5"
                fontWeight="bold"
                style={{ color: "#141b2d" }}
              >
                Card
              </Typography>
            </Box>

            <Box className="heading">
                {myCard.length !== '' ?
                        <label htmlFor="my-modal-9"  className="rounded-none bg-base-100 shadow-xl add-savings cursor-pointer relative flex py-4 px-4 border border-transparent text-sm font-medium rounded-md text-black ">
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
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      style={{ color: "#141b2d" }}
                    >
                      Your Virtual Card
                    </Typography>
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
                              callback={handleCallback}
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
                      <div className="mb-2">Account Number</div>
                      <div className="mb-2">Account</div>
                      <div className="mb-2">Name</div>
                      <div className="mb-2">CVV Number</div>
                      <div className="mb-2">Issued Date</div>
                      <div className="mb-2">Expiry Date</div>
                      <div className="mb-2">Card Status</div>
                      <div className="mb-2">Verification Status</div>
                    </div>

                    <div>
                      <div className="mb-2">:</div>
                      <div className="mb-2">:</div>
                      <div className="mb-2">:</div>
                      <div className="mb-2">:</div>
                      <div className="mb-2">:</div>
                      <div className="mb-2">:</div>
                      <div className="mb-2">:</div>
                      <div className="mb-2">:</div>
                    </div>

                    <div>
                      <div className="mb-2">Account</div>
                      <div className="mb-2">Account</div>
                      <div className="mb-2">Account</div>
                      <div className="mb-2">Account</div>
                      <div className="mb-2">Account</div>
                      <div className="mb-2">Account</div>
                      <div className="mb-2">Account</div>
                      <div className="mb-2">Account</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
          <Box>
          <input type="checkbox" id="my-modal-9" className="modal-toggle" />
            <label htmlFor="my-modal-9" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h2 className="text-xl text-center font-bold"> Agreement Details</h2>
                    <div className="form-group col mb-4 text-start">
                        <label htmlFor="my-modal-10" className="btn normal-case text-xl w-full lg:xl:w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white" >
                        
                        </label>

                        <div className="flex ">
                            <Checkbox onChange={console.log("ertyu")} {...label}  />
                            <p>I have read and understood the nature and effect of the caluses 
                                of the Debit Mastercard Virtual Agreement marked in bold</p>
                        </div>

                        <div className="flex ">

                            <Checkbox className="item-start" {...label} />
                            <p>I have read the Debit Mastercard Virtual Crad Terms and Conditions shown above, 
                            I understand their meaning and effect, I accept such terms and conditions and 
                            I am prepared to uphold them. I understand that they replace all Debit Mastercard Virtual 
                            Crad Termd and Conditions which I previously agreed to.</p>
                        </div>
                    </div>
                    <div className=" grid grid-cols-2 gap-8 mb-4">
                        <label  htmlFor="my-modal-9"
                            className="rounded-none relative cursor-pointer flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                            Cancel
                        </label>
                    {checkBox !== true ?
                        <label 
                           className="rounded-none relative cursor-pointer flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                            Accept
                        </label>
                        :
                        null
                    }
                    </div>
                </label>
            </label>
          </Box>

          <Box>
            <input type="checkbox" id="my-modal-10" className="modal-toggle" />
            <label htmlFor="my-modal-10" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h2 className="text-xl text-center font-bold"> Agreement Details</h2>
                </label>
            </label>

          </Box>
        </>
      )}
    </Box>
  );
}


export default CardRequest;
