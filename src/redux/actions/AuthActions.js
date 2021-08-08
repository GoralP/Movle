import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../../common";

export const login = (data, history, setModalLogin) => {
  return (dispatch) => {
    dispatch({ type: "LOGIN_FETCH_PENDING" });

    axios
      .post(`${config.apiUrl}/login`, data, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.Result.generate_token);
        localStorage.setItem("profilePicture", res.data.Result.profile_image);
        localStorage.setItem("id", res.data.Result.id);
        localStorage.setItem("email", res.data.Result.email);
        localStorage.setItem("name", res.data.Result.name);
        localStorage.setItem("location", res.data.Result.location);
        localStorage.setItem("user_type", res.data.Result.user_type);

        dispatch({
          type: "LOGIN_FETCH_SUCCESS",
        });
        toast.success(res.data.ResponseMessage);
        history.push("/");
        setModalLogin(false);
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FETCH_FAILURE", message: error.message });
        toast.error("Credentials do not match.");
        // toast.error(error.data.message);
      });
  };
};

export const changePassword = (data, history) => {
  const getToken = localStorage.getItem("token");

  return (dispatch) => {
    dispatch({ type: "CHANGE_PASSWORD_FETCH_PENDING" });
    if (data.new_pwd === data.confirm_password) {
      axios
        .post(`${config.apiUrl}/change_pwd`, data, {
          headers: {
            key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
            token: `${getToken}`,
          },
        })
        .then((res) => {
          dispatch({
            type: "CHANGE_PASSWORD_FETCH_SUCCESS",
          });
          toast.success(res.data.ResponseMessage);
          history.push("/");
        })
        .catch((error) => {
          dispatch({
            type: "CHANGE_PASSWORD_FETCH_FAILURE",
            message: error.message,
          });
          toast.error("Something went wrong!!.");
        });
    }
  };
};

export const forgotPassword = (data, history) => {
  return (dispatch) => {
    dispatch({ type: "FORGOT_PASSWORD_FETCH_PENDING" });

    axios
      .post(`${config.apiUrl}/forgot_pwd`, data, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
        },
      })
      .then((res) => {
        dispatch({
          type: "FORGOT_PASSWORD_FETCH_SUCCESS",
        });
        toast.success(res.data.ResponseMessage);
        history.push("/");
      })
      .catch((error) => {
        dispatch({
          type: "FORGOT_PASSWORD_FETCH_FAILURE",
          message: error.message,
        });
        toast.error("Something went wrong");
      });
  };
};

export const updateProfile = (data, history) => {
  const getToken = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  var formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  formData.append("user_id", `${id}`);

  return (dispatch) => {
    dispatch({ type: "UPDATE_PROFILE_FETCH_PENDING" });

    axios
      .post(`${config.apiUrl}/update_profile`, formData, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
          token: `${getToken}`,
        },
      })
      .then((res) => {
        localStorage.setItem("profilePicture", res.data.Result.profile_image);
        localStorage.setItem("id", res.data.Result.id);
        localStorage.setItem("email", res.data.Result.email);
        localStorage.setItem("name", res.data.Result.name);
        localStorage.setItem("location", res.data.Result.location);
        dispatch({
          type: "UPDATE_PROFILE_FETCH_SUCCESS",
        });
        toast.success(res.data.ResponseMessage);
        history.push("/");
      })
      .catch((error) => {
        dispatch({
          type: "UPDATE_PROFILE_FETCH_FAILURE",
          message: error.message,
        });
        toast.error("Something went wrong");
      });
  };
};

export const registration = (data, history, setModal) => {
  return (dispatch) => {
    dispatch({ type: "REGISTRATION_PENDING" });
    axios
      .post(`${config.apiUrl}/sign_up`, data, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
        },
      })

      .then((res) => {
        // localStorage.setItem("token", res.data.Result.generate_token);
        // localStorage.setItem("profilePicture", res.data.Result.profile_image);
        // localStorage.setItem("id", res.data.Result.id);
        // localStorage.setItem("email", res.data.Result.email);
        // localStorage.setItem("name", res.data.Result.name);
        // localStorage.setItem("location", res.data.Result.location);
        // localStorage.setItem("user_type", res.data.Result.user_type);
        // console.log("aaa", res.data.Result.user_type);
        dispatch({
          type: "REGISTRATION_SUCCESS",
        });

        if (res.data.ResponseCode == 1) {
          toast.success(res.data.ResponseMessage);
        } else {
          toast.error(res.data.ResponseMessage);
        }

        if (res.data.Result.user_type == "seller") {
          history.push("/sell");
        } else {
          history.push("/search");
        }

        setModal(false);
      })
      .catch((error) => {
        dispatch({ type: "REGISTRATION_FAILURE", message: error.message });
        // toast.error(error.message);
        // console.log("er", error);
      });
  };
};
