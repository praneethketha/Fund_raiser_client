const initial_state = {
  currentUser: {
    _id: "",
    name: "",
    email: "",
    contact_number: "",
    photo: "",
    address: "",
    donations: [],
  },
  isLoading: false,
  error: null,
};
const current_user = (state = initial_state, action) => {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, currentUser: action.payload, isLoading: false };
    case "GET_USER":
      return { ...state, currentUser: action.payload, isLoading: false };
    case "UPDATE_USER":
      return { ...state, currentUser: action.payload, isLoading: false };
    case "CREATE_USER":
      return { ...state, currentUser: action.payload, isLoading: false };
    case "VERIFY_OTP":
      return { ...state, currentUser: action.payload, isLoading: false };
    case "LOG_OUT":
      return { ...state, currentUser: null, isLoading: false };
    case "USER_LOAD_START":
      return { ...state, isLoading: true };
    case "USER_LOAD_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "FORGOT_PASSWORD":
      return { ...state, currentUser: action.payload, isLoading: false };
    case "RESET_PASSWORD":
      return { ...state, currentUser: action.payload, isLoading: false };
    default:
      return state;
  }
};

export default current_user;
