import axios from "axios";
import { RESEND_CODE } from "./API_URLs/urls";

export const resendOtpFunc = (data) => {
  const url = RESEND_CODE;

  return axios.post(url, data, {
    headers: { "Content-Type": "application/json" },
  });
};
