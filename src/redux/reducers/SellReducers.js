const initialState = {
  addProperty: { loading: false, error: false, message: null },
  getSingleProperty: {
    loading: false,
    singleData: [],
    error: false,
    message: null,
  },
  deleteProperty: { loading: false, error: false, message: null },
  updateProperty: { loading: false, error: false, message: null },
  allProperties: {
    loading: false,
    propertyData: [],
    error: false,
    message: null,
  },
};

const propertyReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PROPERTY_FETCH_PENDING":
      return {
        ...state,
        addProperty: { loading: true, error: false, message: null },
      };
    case "ADD_PROPERTY_FETCH_SUCCESS":
      return {
        ...state,
        addProperty: {
          loading: false,
          error: false,
          message: action.message,
        },
      };
    case "ADD_PROPERTY_FETCH_FAILURE":
      return {
        ...state,
        addProperty: {
          loading: false,
          error: true,
          message: action.message,
        },
      };

    case "GET_SINGLE_PROPERTY_PENDING":
      return {
        ...state,
        getSingleProperty: {
          loading: true,
          singleData: null,
          error: false,
          message: null,
        },
      };
    case "GET_SINGLE_PROPERTY_SUCCESS":
      return {
        ...state,
        getSingleProperty: {
          loading: false,
          singleData: action.singleData,
          error: false,
          message: null,
        },
      };
    case "GET_SINGLE_PROPERTY_FAILURE":
      return {
        ...state,
        getSingleProperty: {
          loading: false,
          singleData: null,
          error: true,
          message: action.message,
        },
      };
    case "DELETE_PROPERTY_PENDING":
      return {
        ...state,
        deleteProperty: { loading: true, error: false, message: null },
      };
    case "DELETE_PROPERTY_SUCCESS":
      return {
        ...state,
        deleteProperty: { loading: false, error: false, message: null },
      };
    case "DELETE_PROPERTY_FAILURE":
      return {
        ...state,
        deleteProperty: {
          loading: false,
          error: true,
          message: action.message,
        },
      };
    case "UPDATE_PROPERTY_PENDING":
      return {
        ...state,
        updateProperty: { loading: true, error: false, message: null },
      };
    case "UPDATE_PROPERTY_SUCCESS":
      return {
        ...state,
        updateProperty: { loading: false, error: false, message: null },
      };
    case "UPDATE_PROPERTY_FAILURE":
      return {
        ...state,
        updateProperty: {
          loading: false,
          error: true,
          message: action.message,
        },
      };
    case "ALL_PROPERTY_FETCH_PENDING":
      return {
        ...state,
        allProperties: {
          loading: true,
          propertyData: null,
          error: false,
          message: null,
        },
      };
    case "ALL_PROPERTY_FETCH_SUCCESS":
      return {
        ...state,
        allProperties: {
          loading: false,
          propertyData: action.propertyData,
          error: false,
          message: null,
        },
      };
    case "ALL_PROPERTY_FETCH_FAILURE":
      return {
        ...state,
        allProperties: {
          loading: false,
          propertyData: null,
          error: true,
          message: action.message,
        },
      };

    default:
      return { ...state };
  }
};

export default propertyReducers;
