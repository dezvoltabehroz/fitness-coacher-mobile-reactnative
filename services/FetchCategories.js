import axios from "axios";

import { FETCH_CATEGORIES } from "./API_URLs/urls";

export const fetchCategories = (token) => {
  return axios.get(FETCH_CATEGORIES, {
    headers: {
      Authorization: token,
    },
  });
};
