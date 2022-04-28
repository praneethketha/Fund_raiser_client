import * as api from "./../api";

//Action Creators
export const getCampaigns = () => async (dispatch) => {
  try {
    dispatch({ type: "CAMPAIGN_LOAD_START" });
    const { data } = await api.fetchCampaigns();
    dispatch({ type: "FETCH_ALL", payload: data.data.campaigns });
  } catch (err) {
    dispatch({
      type: "CAMPAIGN_LOAD_ERROR",
      payload: err.response.data.message,
    });
  }
};

export const getCampaign = (id) => async (dispatch) => {
  try {
    dispatch({ type: "CAMPAIGN_LOAD_START" });
    const { data } = await api.getCampaign(id);
    dispatch({ type: "GET_CAMPAIGN", payload: data.data.campaign });
  } catch (err) {
    dispatch({
      type: "CAMPAIGN_LOAD_ERROR",
      payload: err.response.data.message,
    });
  }
};
