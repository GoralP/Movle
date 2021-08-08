const initialState = {
  loading: false,
  data: null,
  error: false,
  message: null,
  changePassword: { loading: false, error: false, message: null },
  forgotPassword: { loading: false, error: false, message: null },
  updateProfile: { loading: false, error: false, message: null },
  registration: { loading: false, error: false, message: null },
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_FETCH_PENDING":
      return {
        ...state,
        loading: true,
        data: null,
        error: false,
        message: null,
      };
    case "LOGIN_FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.data,
        error: false,
        message: null,
      };
    case "LOGIN_FETCH_FAILURE":
      return {
        ...state,
        loading: false,
        data: null,
        error: true,
        message: action.message,
      };
    case "CHANGE_PASSWORD_FETCH_PENDING":
      return {
        ...state,
        changePassword: { loading: true, error: false, message: null },
      };
    case "CHANGE_PASSWORD_FETCH_SUCCESS":
      return {
        ...state,
        changePassword: {
          loading: false,
          error: false,
          message: action.message,
        },
      };
    case "CHANGE_PASSWORD_FETCH_FAILURE":
      return {
        ...state,
        changePassword: {
          loading: false,
          error: true,
          message: action.message,
        },
      };
    case "FORGOT_PASSWORD_FETCH_PENDING":
      return {
        ...state,
        forgotPassword: { loading: true, error: false, message: null },
      };
    case "FORGOT_PASSWORD_FETCH_SUCCESS":
      return {
        ...state,
        forgotPassword: {
          loading: false,
          error: false,
          message: action.message,
        },
      };
    case "FORGOT_PASSWORD_FETCH_FAILURE":
      return {
        ...state,
        forgotPassword: {
          loading: false,
          error: true,
          message: action.message,
        },
      };
    case "UPDATE_PROFILE_FETCH_PENDING":
      return {
        ...state,
        updateProfile: { loading: true, error: false, message: null },
      };
    case "UPDATE_PROFILE_FETCH_SUCCESS":
      return {
        ...state,
        updateProfile: {
          loading: false,
          error: false,
          message: action.message,
        },
      };
    case "UPDATE_PROFILE_FETCH_FAILURE":
      return {
        ...state,
        updateProfile: {
          loading: false,
          error: true,
          message: action.message,
        },
      };
    case "REGISTRATION_PENDING":
      return {
        ...state,
        registration: { loading: true, error: false, message: null },
      };
    case "REGISTRATION_SUCCESS":
      return {
        ...state,
        registration: {
          loading: false,
          error: false,
          message: action.message,
        },
      };
    case "REGISTRATION_FAILURE":
      return {
        ...state,
        registration: { loading: false, error: true, message: action.message },
      };
    default:
      return { ...state };
  }
};

export default authReducers;
