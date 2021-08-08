const initialState = {
  guide: { loading: false, guideData: [], error: false, message: null },
  faqs: { loading: false, faqsData: [], error: false, message: null },
  otherServices: {
    loading: false,
    otherServicesData: [],
    error: false,
    message: null,
  },
  blog: { loading: false, blogData: [], error: false, message: null },
};

const homeTabsReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GUIDE_FETCH_PENDING":
      return {
        ...state,
        guide: { loading: true, guideData: null, error: false, message: null },
      };
    case "GUIDE_FETCH_SUCCESS":
      return {
        ...state,
        guide: {
          loading: false,
          guideData: action.guideData,
          error: false,
          message: action.message,
        },
      };
    case "GUIDE_FETCH_FAILURE":
      return {
        ...state,
        guide: {
          loading: false,
          guideData: null,
          error: true,
          message: action.message,
        },
      };
    case "FAQS_FETCH_PENDING":
      return {
        ...state,
        faqs: {
          loading: true,
          faqsData: null,
          error: false,
          message: null,
        },
      };
    case "FAQS_FETCH_SUCCESS":
      return {
        ...state,
        faqs: {
          loading: false,
          faqsData: action.faqsData,
          error: false,
          message: action.message,
        },
      };
    case "FAQS_FETCH_FAILURE":
      return {
        ...state,
        faqs: {
          loading: false,
          faqsData: null,
          error: true,
          message: action.message,
        },
      };
    case "OTHER_SERVICES_FETCH_PENDING":
      return {
        ...state,
        otherServices: {
          loading: true,
          otherServicesData: null,
          error: false,
          message: null,
        },
      };
    case "OTHER_SERVICES_FETCH_SUCCESS":
      return {
        ...state,
        otherServices: {
          loading: false,
          otherServicesData: action.otherServicesData,
          error: false,
          message: action.message,
        },
      };
    case "OTHER_SERVICES_FETCH_FAILURE":
      return {
        ...state,
        otherServices: {
          loading: false,
          otherServicesData: null,
          error: true,
          message: action.message,
        },
      };
    case "LATEST_BLOG_FETCH_PENDING":
      return {
        ...state,
        blog: { loading: true, blogData: null, error: false, message: null },
      };
    case "LATEST_BLOG_FETCH_SUCCESS":
      return {
        ...state,
        blog: {
          loading: false,
          blogData: action.blogData,
          error: false,
          message: action.message,
        },
      };
    case "LATEST_BLOG_FETCH_FAILURE":
      return {
        ...state,
        blog: {
          loading: false,
          blogData: null,
          error: true,
          message: action.message,
        },
      };
    default:
      return { ...state };
  }
};

export default homeTabsReducers;
