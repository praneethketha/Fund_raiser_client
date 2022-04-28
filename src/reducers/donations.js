const initialState = {
  donations: [
    {
      campaign: "",
      user: "",
      donated_amount: "",
      createdAt: "",
    },
  ],
  isLoading: false,
};
const donations = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DONATIONS":
      return { ...state, donations: action.payload, isLoading: false };
    case "DONATION_LOAD_START":
      return { ...state, isLoading: true };
    default:
      return state;
  }
};
export default donations;
