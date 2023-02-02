import { Box, Typography } from "@mui/material";
import { useState } from "react";
import LoadingSpinner from "../../../Components/Loader/LoaderSpinner";
import Checkbox from "@mui/material/Checkbox";
import { margin } from "@mui/system";

function CardRequest() {
  const [loading, setLoading] = useState(false);
  const [maxAmount, setmaxAmount] = useState({ amount: "" }); 

  const handleCancel = () => {
    setmaxAmount("");
  }

  const handleSave= async (event) =>{
    setLoading(true);
    event.preventDefault();
  }
    

  const [errors, setErrors] = useState({}); 

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  


  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = validateForm(maxAmount);
    setErrors(newErrors); 
    if (Object.keys(newErrors).length === 0) {
      // form is valid, send data to server
    }


     //Validate Form
     function validateForm(maxAmount) {
        const errors = {};
        if (!maxAmount.amount) {
          errors.amount = "Please fill in the required field";
        } 
      
        return errors;

}
}

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
                    <div className="card w-96 bg-base-100 shadow-xl">
                      <div className="card-body">
                        <p>Add a free virtual card</p>
                        <p>
                          You can start transacting immediately with your
                          SkyBank virtual card.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div classname="form-group text-start pay-button col mt-10">
                    <label
                      htmlFor="my-modal-4"
                      className="rounded-none relative cursor-pointer flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Add virtual card
                    </label>

                    {/* modal to add a virtual card */}

                    <div className="models">
                      <input
                        type="checkbox"
                        id="my-modal-4"
                        className="modal-toggle"
                      />
                      <label
                        htmlFor="my-modal-4"
                        className="modal cursor-pointer"
                      >
                        <label className="modal-box relative" htmlFor="">
                          <h3 className="text-lg text-center font-bold">
                            Add Virtual Card
                          </h3>

                          <div className="form-group col mb-4">
                            <label className="label">
                              <span className="label-text">
                                Set permanent limit
                              </span>
                            </label>
                            <input
                              type="email"
                              placeholder="Online/Scan to pay/Phone(max R50 000)"
                              className="input input-bordered w-full max-w-s email "
                            />
                          </div>

                          <div className="form-group col mb-8">
                          <label
                      htmlFor="my-modal"
                      className="rounded-none relative cursor-pointer flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                     Next
                    </label>
                          </div>
                        </label>
                      </label>
                    </div>

                    {/* modal of the terms and conditions for adding virtual card */}

                    <div className="models " >
                      <input
                        type="checkbox"
                        id="my-modal"
                        className="modal-toggle"
                      />
                      <label
                        htmlFor="my-modal-4"
                        className="modal cursor-pointer"
                      >
                        <label className="modal-box relative" htmlFor="">
                          <h3 className="text-lg text-center font-bold">
                            Agreement
                          </h3>

                          <div className="form-group col mb-4">
                            <p>
                              You must read the agreement before continuing
                              because it contains important terms and conditions
                              that you need to understand and accept
                            </p>

                            <Checkbox {...label} />
                            <p>I have read and understood the nature and effect of the caluses of the Debit Mastercard Virtual Agreement marked in bold</p>

                            <Checkbox {...label} />
                            <p>i have read the Debit Mastercard Virtual Crad Terms and Conditions shown above, i understand their meaning and effect, i accept such terms and conditions and i am prepared to uphold them. i understand that they replace all Debit Mastercard Virtual Crad Termd and Conditions which i previously agreed to.</p>

                          </div>

                        
                            <div className=" grid grid-cols-2 gap-8 mb-4">
                            <label
                              htmlFor="my-modal-4"
                              onClick={handleCancel}className="rounded-none relative cursor-pointer flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                              Cancel
                            </label>

                            <label
                              htmlFor="my-modal-4"
                               className="rounded-none relative cursor-pointer flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                             Accept
                            </label>
                          </div>
                        </label>
                      </label>
                    </div>
                  </div>
                  {/* </div> */}
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
        </>
      )}
    </Box>
  );
}

export default CardRequest;
