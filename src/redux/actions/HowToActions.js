import axios from "axios";
import { config } from "../../common";

export const howTo = (data) => {
  return (dispatch) => {
    dispatch({ type: "HOW_TO_TEXT_PENDING" });

    axios
      .get(`${config.apiUrl}/get_how_to`, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
        },
      })
      .then((res) => {
        dispatch({ type: "HOW_TO_TEXT_SUCCESS", howToData: res.data });
      })
      .catch((error) => {
        dispatch({ type: "HOW_TO_TEXT_FAILURE", message: error.message });
      });
  };
};
