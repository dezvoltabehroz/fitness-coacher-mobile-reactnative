import axios from "axios";
import { REGISTER_URL } from "./API_URLs/urls";

export const coachRegisterService = (data) => {
  const url = REGISTER_URL;

  return axios.post(url, data, {
    headers: { "Content-Type": "application/json" },
  });
};
