import axios from "axios";

import { CREATE_CATEGORIES } from "./API_URLs/urls";

export const fetchCategories = (token) => {
  return axios.get(CREATE_CATEGORIES, {
    headers: {
      Authorization: token,
    },
  });
};
