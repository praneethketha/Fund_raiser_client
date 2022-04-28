const initialState = {
  users: [],
  isLoading: false,
};

const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return { ...state, isLoading: false, users: action.payload };
    case "USERS_LOAD_START":
      return { ...state, isLoading: true };
    case "MODIFY_USER":
      var users = state.users;
      users = users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      return { ...state, isLoading: false, users };
    default:
      return state;
  }
};

export default user_reducer;
