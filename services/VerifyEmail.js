import axios from "axios";
import { VERIFY_OTP } from "./API_URLs/urls";

export const verificationEmail = (data) => {
  const url = VERIFY_OTP;

  return axios.post(url, data, {
    headers: { "Content-Type": "application/json" },
  });
};
