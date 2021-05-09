import axios from "axios";

import { GET_BOOKINGS } from "./API_URLs/urls";

export const fetchBookingsFunc = (token, CoachId) => {
  return axios.get(GET_BOOKINGS + "?" + CoachId, {
    headers: {
      Authorization: token,
    },
  });
};
