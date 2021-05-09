import axios from "axios";
import { RESET_PASSWORD } from "./API_URLs/urls";

export const resetPasswordFunc = (data) => {
  const url = RESET_PASSWORD;

  return axios.post(url, data, {
    headers: { "Content-Type": "application/json" },
  });
};
