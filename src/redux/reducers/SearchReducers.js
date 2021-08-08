const initialState = {
  searchProperties: {
    loading: false,
    searchPropertyData: null,
    error: false,
    message: null,
  },
};

const searchPropertyReducers = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_PROPERTY_FETCH_PENDING":
      return {
        ...state,
        searchProperties: {
          loading: true,
          searchPropertyData: null,
          error: false,
          message: null,
        },
      };
    case "SEARCH_PROPERTY_FETCH_SUCCESS":
      return {
        ...state,
        searchProperties: {
          loading: false,
          searchPropertyData: action.searchPropertyData,
          error: false,
          message: null,
        },
      };
    case "SEARCH_PROPERTY_FETCH_FAILURE":
      return {
        ...state,
        searchProperties: {
          loading: false,
          searchPropertyData: null,
          error: true,
          message: action.message,
        },
      };
    default:
      return { ...state };
  }
};

export default searchPropertyReducers;
