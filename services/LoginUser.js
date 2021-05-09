import axios from "axios";
import { LOGIN_URL } from "./API_URLs/urls";

export const userLoginFunc = (data) => {
  const url = LOGIN_URL;

  return axios.post(url, data, {
    headers: { "Content-Type": "application/json" },
  });
};
