import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../../common";

export const contactUs = (data, history) => {
  const getToken = localStorage.getItem("token");
  return (dispatch) => {
    dispatch({ type: "CONTACT_US_FETCH_PENDING" });

    axios
      .post(`${config.apiUrl}/contact_us`, data, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
          token: `${getToken}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "CONTACT_US_FETCH_SUCCESS",
        });
        toast.success(res.data.ResponseMessage);
        history.push("/");
      })
      .catch((error) => {
        dispatch({
          type: "CONTACT_US_FETCH_FAILURE",
          message: error.message,
        });
        toast.error(error.res.data.ResponseMessage);
        // toast.error("Something went wrong");
      });
  };
};
