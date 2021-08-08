const initialState = {
  howTod: { loading: false, howToData: null, error: false, message: null },
};

const howToReducers = (state = initialState, action) => {
  switch (action.type) {
    case "HOW_TO_TEXT_PENDING":
      return {
        ...state,
        howTod: { loading: true, howToData: null, error: false, message: null },
      };
    case "HOW_TO_TEXT_SUCCESS":
      return {
        ...state,
        howTod: {
          loading: false,
          howToData: action.howToData,
          error: false,
          message: action.message,
        },
      };
    case "HOW_TO_TEXT_FAILURE":
      return {
        ...state,
        howTod: {
          loading: false,
          howToData: null,
          error: true,
          message: action.message,
        },
      };
    default:
      return { ...state };
  }
};

export default howToReducers;
