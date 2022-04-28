import * as api from "./../api";

const getDonations = (config) => async (dispatch) => {
  try {
    dispatch({ type: "DONATION_LOAD_START" });
    const { data } = await api.fetchDonations(config);
    dispatch({ type: "GET_DONATIONS", payload: data.data.donations });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export default getDonations;
