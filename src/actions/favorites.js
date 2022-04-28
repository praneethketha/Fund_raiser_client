import * as api from "./../api";

export const getFavorites = (id) => async (dispatch) => {
  try {
    dispatch({ type: "FAVORITE_LOAD_START" });
    //fetching the data
    const { data } = await api.fetchFavoritesByUser(id);

    //dispatching the data to redux store.
    dispatch({ type: "GET_FAVORITES", payload: data.data.favorites });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const addToFavotie = (info, config) => async (dispatch) => {
  try {
    const { data } = await api.addToFavorites(info, config);
    dispatch({ type: "CREATE_FAVORITE", payload: data.data.favorite });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const deleteFavorite = (id, config) => async (dispatch) => {
  try {
    await api.deletedFromFavorites(id, config);
    dispatch({ type: "DELETE_FAVORITE", payload: id });
  } catch (err) {
    console.log(err.response.data.message);
  }
};
