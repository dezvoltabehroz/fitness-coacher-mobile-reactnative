import axios from "axios";

import { FETCH_SKILLS } from "./API_URLs/urls";

export const fetchSkills = (token, Id) => {
  return axios.get(FETCH_SKILLS + "/" + Id, {
    headers: {
      Authorization: token,
    },
  });
};
