const initialState = {
  favorites: [
    {
      campaign: "",
      user: "",
      createdAt: "",
    },
  ],
  isLoading: false,
};
const favorites = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FAVORITES":
      return { ...state, favorites: action.payload, isLoading: false };
    case "FAVORITE_LOAD_START":
      return { ...state, isLoading: true };
    case "CREATE_FAVORITE":
      return {
        ...state,
        isLoading: false,
        favorites: [...state.favorites, action.payload],
      };
    case "DELETE_FAVORITE":
      let favorites = state.favorites;
      favorites = favorites.filter((item) => item._id !== action.payload);
      return {
        ...state,
        isLoading: false,
        favorites,
      };
    default:
      return state;
  }
};
export default favorites;
