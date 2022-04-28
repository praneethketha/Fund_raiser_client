const initialState = {
  campaigns: [
    {
      name: "",
      details: "",
      category: "",
      target_amount: "",
      cover_pic: "",
      contact_number: "",
      location: {
        address: "",
      },
      state: "",
      created_by: {
        _id: "",
      },
    },
  ],
  isLoading: false,
  error: null,
};
const campaign_reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return { ...state, isLoading: false, campaigns: action.payload };
    case "CAMPAIGN_LOAD_START":
      return { ...state, isLoading: true };
    case "CAMPAIGN_LOAD_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "CREATE_CAMPAIGN":
      return {
        ...state,
        campaigns: [...state.campaigns, action.payload],
        isLoading: false,
      };
    case "UPDATE_CURRENT_CAMPAIGN":
      let new_campaigns = state.campaigns;
      new_campaigns = new_campaigns.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      return {
        ...state,
        campaigns: new_campaigns,
      };
    case "DONATE_NOW":
      let campaigns = state.campaigns;
      campaigns = campaigns.map((campaign) =>
        campaign._id === action.payload._id ? action.payload : campaign
      );
      return { ...state, campaigns };
    default:
      return state;
  }
};
export default campaign_reducer;
