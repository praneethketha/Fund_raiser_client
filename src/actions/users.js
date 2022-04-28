import * as api from "./../api";

//Action Creators
export const fetchUsers = (config) => async (dispatch) => {
  try {
    dispatch({ type: "USERS_LOAD_START" });
    const { data } = await api.getUsers(config);
    dispatch({ type: "FETCH_USERS", payload: data.data.users });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const update_user = (id, user, config) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, user, config);
    dispatch({ type: "MODIFY_USER", payload: data.data.user });
  } catch (err) {
    console.log(err.response.data.message);
  }
};
