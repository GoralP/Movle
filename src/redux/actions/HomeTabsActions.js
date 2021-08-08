import axios from "axios";
import { config } from "../../common";

export const guides = () => {
  return (dispatch) => {
    dispatch({ type: "GUIDE_FETCH_PENDING" });

    axios
      .get(`${config.apiUrl}/get_guides`, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
        },
      })
      .then((res) => {
        dispatch({ type: "GUIDE_FETCH_SUCCESS", guideData: res.data.Result });
      })
      .catch((error) => {
        dispatch({ type: "GUIDE_FETCH_FAILURE", message: error.message });
      });
  };
};

export const faqs = () => {
  return (dispatch) => {
    dispatch({ type: "FAQS_FETCH_PENDING" });

    axios
      .get(`${config.apiUrl}/get_faqs`, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
        },
      })
      .then((res) => {
        dispatch({ type: "FAQS_FETCH_SUCCESS", faqsData: res.data.Result });
      })
      .catch((error) => {
        dispatch({ type: "FAQS_FETCH_FAILURE", message: error.message });
      });
  };
};

export const otherServices = () => {
  return (dispatch) => {
    dispatch({ type: "OTHER_SERVICES_FETCH_PENDING" });

    axios
      .get(`${config.apiUrl}/get_other_services`, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
        },
      })
      .then((res) => {
        dispatch({
          type: "OTHER_SERVICES_FETCH_SUCCESS",
          otherServicesData: res.data.Result,
        });
      })
      .catch((error) => {
        dispatch({
          type: "OTHER_SERVICES_FETCH_FAILURE",
          message: error.message,
        });
      });
  };
};

export const latestBlog = () => {
  return (dispatch) => {
    dispatch({ type: "LATEST_BLOG_FETCH_PENDING" });

    axios
      .get(`${config.apiUrl}/latest_blog`, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
        },
      })
      .then((res) => {
        dispatch({
          type: "LATEST_BLOG_FETCH_SUCCESS",
          blogData: res.data.Result,
        });
      })
      .catch((error) => {
        dispatch({
          type: "LATEST_BLOG_FETCH_FAILURE",
          message: error.message,
        });
      });
  };
};
