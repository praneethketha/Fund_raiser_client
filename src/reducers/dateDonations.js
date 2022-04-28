const initialState = {
  donations_stats: [
    {
      campaign: "",
      user: "",
      donated_amount: "",
      createdAt: "",
    },
  ],
  isLoading: false,
};
const donations_stats = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DONATIONS_DATE":
      return { ...state, donations_stats: action.payload, isLoading: false };
    case "DATE_DONATION_LOAD_START":
      return { ...state, isLoading: true };
    default:
      return state;
  }
};
export default donations_stats;
