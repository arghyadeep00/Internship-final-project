import axios from "axios";

const FAST2SMS_URL = "https://www.fast2sms.com/dev/bulkV2";

const sendSmsOtp = async (phone, otp) => {
  const payload = {
    route: "otp",
    variables_values: otp,
    numbers: phone, 
  };

  const headers = {
    authorization: process.env.FAST2SMS_API_KEY,
    "Content-Type": "application/json",
  };

  const response = await axios.post(FAST2SMS_URL, payload, { headers });

  if (!response.data?.return) {
    throw new Error("Fast2SMS failed");
  }

  return response.data;
};

export default sendSmsOtp;
