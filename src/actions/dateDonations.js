import * as api from "./../api";

const getDonationsByDate = () => async (dispatch) => {
  try {
    dispatch({ type: "DATE_DONATION_LOAD_START" });
    const { data } = await api.fetchDonationsByDate();
    dispatch({ type: "GET_DONATIONS_DATE", payload: data.data.stats });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export default getDonationsByDate;
