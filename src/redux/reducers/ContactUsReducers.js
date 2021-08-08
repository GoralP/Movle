const initialState = {
  contactUs: { loading: false, error: false, message: null },
};

const contactUsReducers = (state = initialState, action) => {
  switch (action.type) {
    case "CONTACT_US_FETCH_PENDING":
      return {
        ...state,
        contactUs: { loading: true, error: false, message: null },
      };
    case "CONTACT_US_FETCH_SUCCESS":
      return {
        ...state,
        contactUs: {
          loading: false,
          error: false,
          message: action.message,
        },
      };
    case "CONTACT_US_FETCH_FAILURE":
      return {
        ...state,
        contactUs: {
          loading: false,
          error: true,
          message: action.message,
        },
      };
    default:
      return { ...state };
  }
};

export default contactUsReducers;
