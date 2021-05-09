import axios from "axios";
import { FORGOT_PASSWORD } from "./API_URLs/urls";

export const resendOtpFunc = (data) => {
  const url = FORGOT_PASSWORD;

  return axios.post(url, data, {
    headers: { "Content-Type": "application/json" },
  });
};
