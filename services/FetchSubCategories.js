import axios from "axios";

import { FETCH_SUBCATEGORIES } from "./API_URLs/urls";

export const fetchSubCategories = (token, Id) => {
  return axios.get(FETCH_SUBCATEGORIES + "/" + Id, {
    headers: {
      Authorization: token,
    },
  });
};
